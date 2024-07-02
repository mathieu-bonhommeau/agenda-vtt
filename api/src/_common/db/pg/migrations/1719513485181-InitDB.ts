import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitDB1719513485181 implements MigrationInterface {
    name = 'InitDB1719513485181'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "calendar_event_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_ab7dcf66f341b604388b221ed1c" PRIMARY KEY ("id"))`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "calendar_event_entity"`)
    }
}
