import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDb1720078111259 implements MigrationInterface {
    name = 'InitDb1720078111259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event_location_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "country" character varying NOT NULL, "description" character varying, "county" character varying, "postcode" character varying, "housenumber" character varying, "city" character varying NOT NULL, "address" character varying NOT NULL, "geometry" geometry NOT NULL, CONSTRAINT "PK_de24b38a7e75841c176e7862a51" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contact_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "phone" character varying NOT NULL, CONSTRAINT "PK_586d1ef7e202a40435ea451b3fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event_organizer_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "website" character varying, CONSTRAINT "PK_29163f1d3c9f12a68b32a79ffe0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "calendar_event_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "prices" json, "services" json, "event_location_id" uuid, "organizer_id" uuid, CONSTRAINT "PK_ab7dcf66f341b604388b221ed1c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trace_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "utagawa_id" integer, "link" character varying, "distance" integer NOT NULL, "positive_elevation" integer, "trace_color" character varying, "calendar_event_id" uuid, CONSTRAINT "PK_c75d3f23a9975745d0f90b78125" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "organizer_contact" ("contact_id" uuid NOT NULL, "organizer_id" uuid NOT NULL, CONSTRAINT "PK_5e27312543b9a47d3f79353708a" PRIMARY KEY ("contact_id", "organizer_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f62bc0cdd56fa25e033ffa455a" ON "organizer_contact" ("contact_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_8e472902e82b50206fc966914f" ON "organizer_contact" ("organizer_id") `);
        await queryRunner.query(`ALTER TABLE "calendar_event_entity" ADD CONSTRAINT "FK_f50f229dcc9011495da4aaee717" FOREIGN KEY ("event_location_id") REFERENCES "event_location_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "calendar_event_entity" ADD CONSTRAINT "FK_fcc0dfd3d9d3b9eafb6862a6308" FOREIGN KEY ("organizer_id") REFERENCES "event_organizer_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trace_entity" ADD CONSTRAINT "FK_0e826c4b54a87733e139c129908" FOREIGN KEY ("calendar_event_id") REFERENCES "calendar_event_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "organizer_contact" ADD CONSTRAINT "FK_f62bc0cdd56fa25e033ffa455a6" FOREIGN KEY ("contact_id") REFERENCES "contact_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "organizer_contact" ADD CONSTRAINT "FK_8e472902e82b50206fc966914f2" FOREIGN KEY ("organizer_id") REFERENCES "event_organizer_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organizer_contact" DROP CONSTRAINT "FK_8e472902e82b50206fc966914f2"`);
        await queryRunner.query(`ALTER TABLE "organizer_contact" DROP CONSTRAINT "FK_f62bc0cdd56fa25e033ffa455a6"`);
        await queryRunner.query(`ALTER TABLE "trace_entity" DROP CONSTRAINT "FK_0e826c4b54a87733e139c129908"`);
        await queryRunner.query(`ALTER TABLE "calendar_event_entity" DROP CONSTRAINT "FK_fcc0dfd3d9d3b9eafb6862a6308"`);
        await queryRunner.query(`ALTER TABLE "calendar_event_entity" DROP CONSTRAINT "FK_f50f229dcc9011495da4aaee717"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8e472902e82b50206fc966914f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f62bc0cdd56fa25e033ffa455a"`);
        await queryRunner.query(`DROP TABLE "organizer_contact"`);
        await queryRunner.query(`DROP TABLE "trace_entity"`);
        await queryRunner.query(`DROP TABLE "calendar_event_entity"`);
        await queryRunner.query(`DROP TABLE "event_organizer_entity"`);
        await queryRunner.query(`DROP TABLE "contact_entity"`);
        await queryRunner.query(`DROP TABLE "event_location_entity"`);
    }

}
