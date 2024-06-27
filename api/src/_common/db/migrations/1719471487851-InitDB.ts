import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitDB1719471487851 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE calendar_event (
                                            id uuid PRIMARY KEY NOT NULL,
                                            name VARCHAR not null 
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE calendar_event`)
    }
}
