import { MigrationInterface, QueryRunner } from "typeorm";

export class createSchedule1661799823991 implements MigrationInterface {
    name = 'createSchedule1661799823991'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "propertyId" uuid`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_19c54f24597b318be3892114c75" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_98e2e6f75b2022d80c3eb4e4525" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_98e2e6f75b2022d80c3eb4e4525"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_19c54f24597b318be3892114c75"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "propertyId"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "userId"`);
    }

}
