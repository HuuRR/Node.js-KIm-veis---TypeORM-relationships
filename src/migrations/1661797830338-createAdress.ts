import { MigrationInterface, QueryRunner } from "typeorm";

export class createAdress1661797830338 implements MigrationInterface {
    name = 'createAdress1661797830338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "adress" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "district" character varying NOT NULL, "zipCode" character varying(8) NOT NULL, "city" character varying NOT NULL, "state" character varying(2) NOT NULL, CONSTRAINT "PK_f108093ea9cd9f59d72c2f1a057" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "adress"`);
    }

}
