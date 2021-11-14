import "reflect-metadata";
import { config } from "node-config-ts";
import { createConnection } from "typeorm";
import ormConnectionOptions from "../ormconfig";

import Koa from "koa";
import Mount from "koa-mount";
import passport from "koa-passport";
import Session from "koa-session";

import auth from "./auth";
import { setupPassport } from "./passport";

const koa = new Koa;

koa.keys = config.koaKeys;
koa.proxy = true;
koa.use(Session({
    domain: config.cookiesDomain,
    secure: process.env.NODE_ENV !== "development",
    httpOnly: true,
}, koa));
koa.use(passport.initialize());
koa.use(passport.session());

// Error handler
koa.use(async (ctx, next) => {
    try {
        if (ctx.originalUrl !== "/favicon.ico" && process.env.NODE_ENV === "development") {
            console.log("\x1b[33m%s\x1b[0m", ctx.originalUrl);
        }

        await next();
    } catch (err: any) {
        console.log(err);
        
        ctx.status = err.status || 500;
        ctx.body = { error: "Something went wrong!" };
    }
});

// Auth routes
koa.use(Mount("/", auth.routes()));

// Initialize everything
createConnection(ormConnectionOptions)
    .then((connection) => {
        console.log(`Connected to the ${connection.options.database} (${connection.options.name}) database!`);
        setupPassport();
        koa.listen(config.api.port);
        console.log(`koa listening on port ${config.api.port}`);
    })
    .catch((error) => console.log("An error has occurred in connecting.", error));
