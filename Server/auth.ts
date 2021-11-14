import Router from "@koa/router";
import passport from "koa-passport";
import { config } from "node-config-ts";
import { ParameterizedContext } from "koa";
import { discordGuild } from "./discord";

const authRouter = new Router();

authRouter.get("/", async (ctx: ParameterizedContext<any>) => {
    if (ctx.state.user) {
        ctx.body = `You are already logged in and/or authenticated!\nVerified: ${ctx.state.user.verified}\nOnion: ${ctx.state.user.onion}`;
        return;
    }
    ctx.redirect("/osu");
});

authRouter.get("/osu", passport.authenticate("oauth2", { scope: ["identify"] }));

authRouter.get("/osu/callback", async (ctx: ParameterizedContext<any>, next) => {
    return await passport.authenticate("oauth2", { scope: ["identify"], failureRedirect: "/" }, async (err, user) => {
        if (user) {
            await user.save();
            ctx.login(user);
            ctx.redirect("/discord");
        } else {
            ctx.status = 400;
            ctx.body = { error: err };
        }
    })(ctx, next);
});

authRouter.get("/discord", passport.authenticate("discord", { scope: ["identify", "guilds.join"] }));

authRouter.get("/discord/callback", async (ctx: ParameterizedContext, next) => {
    return await passport.authenticate("discord", { scope: ["identify", "guilds.join"], failureRedirect: "/" }, async (err, user) => {
        if (user) {
            if (ctx.state.user) {
                ctx.state.user.discord = user.discord;
                user = ctx.state.user;
            } else if (!user.osu)
            {
                ctx.body = { error: "There is no osu! account linked to this discord account! Please register via osu! first." };
                return;
            }

            await user.save();

            if (user.verified)
                try {
                    // Add user to server if they aren't there yet
                    const guild = await discordGuild();
                    try {
                        const discordUser = await guild.members.fetch(user.discord.userID);
                        await Promise.all([
                            discordUser.setNickname(user.osu.username),
                            discordUser.roles.add(config.discord.roles.verified),
                        ]);
                    } catch (e) {
                        await guild.members.add(user.discord.userID, {
                            accessToken: user.discord.accessToken,
                            nick: user.osu.username,
                            roles: [ config.discord.roles.verified ],
                        });
                    }
                } catch (err) {
                    console.log("An error occurred in adding a user to the server / changing their nickname: " + err);
                }

            ctx.login(user);
            ctx.body = "Success! If you are in the PP Discord server, you should now be verified!";
        } else {
            ctx.status = 400;
            ctx.body = { error: err.message };
        }
    })(ctx, next);
});

export default authRouter;