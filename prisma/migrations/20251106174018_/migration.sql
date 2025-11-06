/*
  Warnings:

  - You are about to drop the column `identifier_code` on the `module` table. All the data in the column will be lost.
  - You are about to drop the `_Collaborators_org` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Module_Collaborators` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `uploaded_at` on table `files` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `org_id` to the `module` table without a default value. This is not possible if the table is not empty.
  - Made the column `created_at` on table `processes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `processes` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."_Collaborators_org" DROP CONSTRAINT "_Collaborators_org_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_Collaborators_org" DROP CONSTRAINT "_Collaborators_org_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_Module_Collaborators" DROP CONSTRAINT "_Module_Collaborators_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_Module_Collaborators" DROP CONSTRAINT "_Module_Collaborators_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."module" DROP CONSTRAINT "module_identifier_code_fkey";

-- AlterTable
ALTER TABLE "files" ALTER COLUMN "uploaded_at" SET NOT NULL,
ALTER COLUMN "uploaded_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "module" DROP COLUMN "identifier_code",
ADD COLUMN     "org_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "processes" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL,
ALTER COLUMN "updated_at" DROP DEFAULT;

-- DropTable
DROP TABLE "public"."_Collaborators_org";

-- DropTable
DROP TABLE "public"."_Module_Collaborators";

-- CreateTable
CREATE TABLE "OrgUser" (
    "id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role" "roleUser" NOT NULL DEFAULT 'VIEWER',
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrgUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ModuleCollaborators" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ModuleCollaborators_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ModuleCollaborators_B_index" ON "_ModuleCollaborators"("B");

-- AddForeignKey
ALTER TABLE "module" ADD CONSTRAINT "module_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "Org"("identifier_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrgUser" ADD CONSTRAINT "OrgUser_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrgUser" ADD CONSTRAINT "OrgUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModuleCollaborators" ADD CONSTRAINT "_ModuleCollaborators_A_fkey" FOREIGN KEY ("A") REFERENCES "module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModuleCollaborators" ADD CONSTRAINT "_ModuleCollaborators_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
