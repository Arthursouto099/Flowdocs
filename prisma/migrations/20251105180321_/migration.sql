/*
  Warnings:

  - You are about to drop the `_Collaborators` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_Collaborators" DROP CONSTRAINT "_Collaborators_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_Collaborators" DROP CONSTRAINT "_Collaborators_B_fkey";

-- DropTable
DROP TABLE "public"."_Collaborators";

-- CreateTable
CREATE TABLE "_Module_Collaborators" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_Module_Collaborators_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_Module_Collaborators_B_index" ON "_Module_Collaborators"("B");

-- AddForeignKey
ALTER TABLE "_Module_Collaborators" ADD CONSTRAINT "_Module_Collaborators_A_fkey" FOREIGN KEY ("A") REFERENCES "module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Module_Collaborators" ADD CONSTRAINT "_Module_Collaborators_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
