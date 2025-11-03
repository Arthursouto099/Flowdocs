/*
  Warnings:

  - You are about to drop the column `id_module` on the `task` table. All the data in the column will be lost.
  - Added the required column `id_process` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."task" DROP CONSTRAINT "task_id_module_fkey";

-- AlterTable
ALTER TABLE "task" DROP COLUMN "id_module",
ADD COLUMN     "id_process" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_id_process_fkey" FOREIGN KEY ("id_process") REFERENCES "processes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
