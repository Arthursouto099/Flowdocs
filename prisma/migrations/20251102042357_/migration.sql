/*
  Warnings:

  - A unique constraint covering the columns `[identifier_code]` on the table `Org` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Org_identifier_code_key" ON "Org"("identifier_code");
