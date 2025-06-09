import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePostTable1749509107615 implements MigrationInterface {
    name = 'UpdatePostTable1749509107615'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clasification" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "available" boolean NOT NULL DEFAULT true, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_6d01fb578a83d5d1cd827cb670c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "brand" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "available" boolean NOT NULL DEFAULT true, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "model" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "available" boolean NOT NULL DEFAULT true, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "brandId" integer, CONSTRAINT "PK_d6df271bba301d5cc79462912a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "resource" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "available" boolean NOT NULL DEFAULT true, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "serialNumer" character varying NOT NULL, "especifications" character varying NOT NULL, "clasificationId" integer, "modelId" integer, CONSTRAINT "PK_e2894a5867e06ae2e8889f1173f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "model" ADD CONSTRAINT "FK_7996700d600159cdf20dc0d0816" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "resource" ADD CONSTRAINT "FK_134652f862452c1caf7206be1bc" FOREIGN KEY ("clasificationId") REFERENCES "clasification"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "resource" ADD CONSTRAINT "FK_8f8b5ddc1f92b35c31881713a15" FOREIGN KEY ("modelId") REFERENCES "model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resource" DROP CONSTRAINT "FK_8f8b5ddc1f92b35c31881713a15"`);
        await queryRunner.query(`ALTER TABLE "resource" DROP CONSTRAINT "FK_134652f862452c1caf7206be1bc"`);
        await queryRunner.query(`ALTER TABLE "model" DROP CONSTRAINT "FK_7996700d600159cdf20dc0d0816"`);
        await queryRunner.query(`DROP TABLE "resource"`);
        await queryRunner.query(`DROP TABLE "model"`);
        await queryRunner.query(`DROP TABLE "brand"`);
        await queryRunner.query(`DROP TABLE "clasification"`);
    }

}
