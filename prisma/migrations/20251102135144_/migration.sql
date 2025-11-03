/*
  Warnings:

  - You are about to drop the column `indetifier_code` on the `module` table. All the data in the column will be lost.
  - Added the required column `indentifier_code` to the `module` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."module" DROP CONSTRAINT "module_indetifier_code_fkey";

-- AlterTable
ALTER TABLE "module" DROP COLUMN "indetifier_code",
ADD COLUMN     "indentifier_code" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "module" ADD CONSTRAINT "module_indentifier_code_fkey" FOREIGN KEY ("indentifier_code") REFERENCES "Org"("identifier_code") ON DELETE RESTRICT ON UPDATE CASCADE;
