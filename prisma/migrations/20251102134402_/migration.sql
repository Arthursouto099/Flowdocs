/*
  Warnings:

  - Added the required column `indetifier_code` to the `module` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "module" ADD COLUMN     "indetifier_code" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "module" ADD CONSTRAINT "module_indetifier_code_fkey" FOREIGN KEY ("indetifier_code") REFERENCES "Org"("identifier_code") ON DELETE RESTRICT ON UPDATE CASCADE;
