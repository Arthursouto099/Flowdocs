/*
  Warnings:

  - The required column `identifier_code` was added to the `Org` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `id_module` to the `processes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Org" ADD COLUMN     "identifier_code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "processes" ADD COLUMN     "id_module" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "module" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "background_image_url" TEXT,

    CONSTRAINT "module_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "processes" ADD CONSTRAINT "processes_id_module_fkey" FOREIGN KEY ("id_module") REFERENCES "module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
