import { MigrationInterface, QueryRunner } from "typeorm";

export class createSchedule1661799623541 implements MigrationInterface {
    name = 'createSchedule1661799623541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "schedules" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "hour" TIME NOT NULL, CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "schedules"`);
    }

}
