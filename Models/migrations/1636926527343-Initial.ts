import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1636926527343 implements MigrationInterface {
    name = 'Initial1636926527343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`ID\` int NOT NULL AUTO_INCREMENT, \`onion\` tinyint NOT NULL DEFAULT 0, \`verified\` tinyint NOT NULL DEFAULT 1, \`discordUserid\` varchar(255) NULL, \`discordUsername\` varchar(255) NOT NULL DEFAULT '', \`discordAccesstoken\` longtext NULL, \`discordRefreshtoken\` longtext NULL, \`discordDateadded\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`osuUserid\` varchar(255) NULL, \`osuUsername\` varchar(255) NOT NULL DEFAULT '', \`osuAccesstoken\` longtext NULL, \`osuRefreshtoken\` longtext NULL, \`osuDateadded\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX \`IDX_7a5b3c277aa5128bffa27de7f9\` (\`discordUsername\`), INDEX \`IDX_79bbe1a6932e41f230596a3875\` (\`osuUsername\`), PRIMARY KEY (\`ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`query-result-cache\` (\`id\` int NOT NULL AUTO_INCREMENT, \`identifier\` varchar(255) NULL, \`time\` bigint NOT NULL, \`duration\` int NOT NULL, \`query\` text NOT NULL, \`result\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`query-result-cache\``);
        await queryRunner.query(`DROP INDEX \`IDX_79bbe1a6932e41f230596a3875\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_7a5b3c277aa5128bffa27de7f9\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
