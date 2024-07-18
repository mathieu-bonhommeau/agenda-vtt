import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitDb1721285890770 implements MigrationInterface {
    name = 'InitDb1721285890770'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "event_location_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "country" character varying NOT NULL, "region" character varying, "county" character varying, "postcode" character varying, "housenumber" character varying, "city" character varying NOT NULL, "address" character varying NOT NULL, "geometry" geometry NOT NULL, CONSTRAINT "PK_de24b38a7e75841c176e7862a51" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "trace_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "utagawa_id" integer, "link" character varying, "distance" integer NOT NULL, "positive_elevation" integer, "trace_color" character varying, "calendar_event_id" uuid, CONSTRAINT "PK_c75d3f23a9975745d0f90b78125" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "event_organizer_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "website" character varying, "contacts" json, CONSTRAINT "PK_29163f1d3c9f12a68b32a79ffe0" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "calendar_event_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "start_date" TIMESTAMP WITH TIME ZONE NOT NULL, "end_date" TIMESTAMP WITH TIME ZONE NOT NULL, "prices" json, "services" json, "event_location_id" uuid, "organizer_id" uuid, CONSTRAINT "PK_ab7dcf66f341b604388b221ed1c" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `ALTER TABLE "trace_entity" ADD CONSTRAINT "FK_0e826c4b54a87733e139c129908" FOREIGN KEY ("calendar_event_id") REFERENCES "calendar_event_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "calendar_event_entity" ADD CONSTRAINT "FK_f50f229dcc9011495da4aaee717" FOREIGN KEY ("event_location_id") REFERENCES "event_location_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE "calendar_event_entity" ADD CONSTRAINT "FK_fcc0dfd3d9d3b9eafb6862a6308" FOREIGN KEY ("organizer_id") REFERENCES "event_organizer_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calendar_event_entity" DROP CONSTRAINT "FK_fcc0dfd3d9d3b9eafb6862a6308"`)
        await queryRunner.query(`ALTER TABLE "calendar_event_entity" DROP CONSTRAINT "FK_f50f229dcc9011495da4aaee717"`)
        await queryRunner.query(`ALTER TABLE "trace_entity" DROP CONSTRAINT "FK_0e826c4b54a87733e139c129908"`)
        await queryRunner.query(`DROP TABLE "calendar_event_entity"`)
        await queryRunner.query(`DROP TABLE "event_organizer_entity"`)
        await queryRunner.query(`DROP TABLE "trace_entity"`)
        await queryRunner.query(`DROP TABLE "event_location_entity"`)
    }
}
