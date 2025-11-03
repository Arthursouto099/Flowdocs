/*
  Warnings:

  - You are about to drop the column `indentifier_code` on the `module` table. All the data in the column will be lost.
  - Added the required column `identifier_code` to the `module` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."module" DROP CONSTRAINT "module_indentifier_code_fkey";

-- AlterTable
ALTER TABLE "module" DROP COLUMN "indentifier_code",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "identifier_code" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "module" ADD CONSTRAINT "module_identifier_code_fkey" FOREIGN KEY ("identifier_code") REFERENCES "Org"("identifier_code") ON DELETE RESTRICT ON UPDATE CASCADE;
