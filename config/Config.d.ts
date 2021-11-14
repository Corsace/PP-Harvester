declare module "node-config-ts" {
    interface IWebServiceConfig {
        host: string;
        port: number;
        publicUrl: string;
    }

    interface IRankRoles {
        dig1: string;
        dig2: string;
        dig3: string;
        dig4: string;
        dig5: string;
    }

    interface IConfig {
        database: {
            host: string;
            port: number;
            database: string;
            username: string;
            password: string;
        };

        discord: {
            roles: {
                pp: string;
                onion: string;
                verified: string;
                modes: {
                    osu: IRankRoles;
                    taiko: IRankRoles;
                    catch: IRankRoles;
                    mania: IRankRoles;
                }
            };
            token: string;
            guild: string;
            clientId: string;
            clientSecret: string;
            invite: string;
            logChannel: string;
            verificationChannel: string;
        };

        osu: {
            v1: {
                apiKey: string;
            };
            v2: {
                clientId: string;
                clientSecret: string;
            };
        };

        koaKeys: string[];
        cookiesDomain: string;

        api: IWebServiceConfig;
    }

    export const config: Config;
    export type Config = IConfig;
}
