module.exports = class Data1691489466382 {
    name = 'Data1691489466382'

    async up(db) {
        await db.query(`CREATE TABLE "transfer" ("id" character varying NOT NULL, "block_number" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "extrinsic_hash" text, "currency" text NOT NULL, "amount" numeric NOT NULL, "from_id" character varying, "to_id" character varying, CONSTRAINT "PK_fd9ddbdd49a17afcbe014401295" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_d6624eacc30144ea97915fe846" ON "transfer" ("block_number") `)
        await db.query(`CREATE INDEX "IDX_70ff8b624c3118ac3a4862d22c" ON "transfer" ("timestamp") `)
        await db.query(`CREATE INDEX "IDX_070c555a86b0b41a534a55a659" ON "transfer" ("extrinsic_hash") `)
        await db.query(`CREATE INDEX "IDX_76bdfed1a7eb27c6d8ecbb7349" ON "transfer" ("from_id") `)
        await db.query(`CREATE INDEX "IDX_0751309c66e97eac9ef1149362" ON "transfer" ("to_id") `)
        await db.query(`CREATE INDEX "IDX_a2149e84ca1fc59b73f2ed05fa" ON "transfer" ("currency") `)
        await db.query(`CREATE INDEX "IDX_f4007436c1b546ede08a4fd7ab" ON "transfer" ("amount") `)
        await db.query(`CREATE TABLE "account" ("id" character varying NOT NULL, "sent_gmgn" numeric NOT NULL, "received_gmgn" numeric NOT NULL, "burned_for_nothing" numeric NOT NULL, "burned_total" numeric NOT NULL, "display" text, "discord" text, "twitter" text, "judgement" text, "verified" boolean, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_0ca81241671198a22f6a7c82e9" ON "account" ("sent_gmgn") `)
        await db.query(`CREATE INDEX "IDX_d968a7a21a77238f085cafa308" ON "account" ("received_gmgn") `)
        await db.query(`CREATE INDEX "IDX_356a72856f45d9e9e404edef53" ON "account" ("burned_for_nothing") `)
        await db.query(`CREATE INDEX "IDX_d78314347f488a61193f509434" ON "account" ("burned_total") `)
        await db.query(`ALTER TABLE "transfer" ADD CONSTRAINT "FK_76bdfed1a7eb27c6d8ecbb73496" FOREIGN KEY ("from_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "transfer" ADD CONSTRAINT "FK_0751309c66e97eac9ef11493623" FOREIGN KEY ("to_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "transfer"`)
        await db.query(`DROP INDEX "public"."IDX_d6624eacc30144ea97915fe846"`)
        await db.query(`DROP INDEX "public"."IDX_70ff8b624c3118ac3a4862d22c"`)
        await db.query(`DROP INDEX "public"."IDX_070c555a86b0b41a534a55a659"`)
        await db.query(`DROP INDEX "public"."IDX_76bdfed1a7eb27c6d8ecbb7349"`)
        await db.query(`DROP INDEX "public"."IDX_0751309c66e97eac9ef1149362"`)
        await db.query(`DROP INDEX "public"."IDX_a2149e84ca1fc59b73f2ed05fa"`)
        await db.query(`DROP INDEX "public"."IDX_f4007436c1b546ede08a4fd7ab"`)
        await db.query(`DROP TABLE "account"`)
        await db.query(`DROP INDEX "public"."IDX_0ca81241671198a22f6a7c82e9"`)
        await db.query(`DROP INDEX "public"."IDX_d968a7a21a77238f085cafa308"`)
        await db.query(`DROP INDEX "public"."IDX_356a72856f45d9e9e404edef53"`)
        await db.query(`DROP INDEX "public"."IDX_d78314347f488a61193f509434"`)
        await db.query(`ALTER TABLE "transfer" DROP CONSTRAINT "FK_76bdfed1a7eb27c6d8ecbb73496"`)
        await db.query(`ALTER TABLE "transfer" DROP CONSTRAINT "FK_0751309c66e97eac9ef11493623"`)
    }
}
