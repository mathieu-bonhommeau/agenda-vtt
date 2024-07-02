import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDb1719943102572 implements MigrationInterface {
    name = 'InitDb1719943102572'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organizer_contact" DROP CONSTRAINT "FK_f62bc0cdd56fa25e033ffa455a6"`);
        await queryRunner.query(`ALTER TABLE "organizer_contact" DROP CONSTRAINT "FK_8e472902e82b50206fc966914f2"`);
        await queryRunner.query(`ALTER TABLE "event_location_entity" ALTER COLUMN "geometry" TYPE geometry`);
        await queryRunner.query(`ALTER TABLE "organizer_contact" ADD CONSTRAINT "FK_f62bc0cdd56fa25e033ffa455a6" FOREIGN KEY ("contact_id") REFERENCES "contact_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "organizer_contact" ADD CONSTRAINT "FK_8e472902e82b50206fc966914f2" FOREIGN KEY ("organizer_id") REFERENCES "event_organizer_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organizer_contact" DROP CONSTRAINT "FK_8e472902e82b50206fc966914f2"`);
        await queryRunner.query(`ALTER TABLE "organizer_contact" DROP CONSTRAINT "FK_f62bc0cdd56fa25e033ffa455a6"`);
        await queryRunner.query(`ALTER TABLE "event_location_entity" ALTER COLUMN "geometry" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`ALTER TABLE "organizer_contact" ADD CONSTRAINT "FK_8e472902e82b50206fc966914f2" FOREIGN KEY ("organizer_id") REFERENCES "event_organizer_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "organizer_contact" ADD CONSTRAINT "FK_f62bc0cdd56fa25e033ffa455a6" FOREIGN KEY ("contact_id") REFERENCES "contact_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
