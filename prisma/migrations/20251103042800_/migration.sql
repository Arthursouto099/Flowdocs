-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('CONCLUIDA', 'EM_ANDAMENTO', 'PENDENTE');

-- CreateTable
CREATE TABLE "task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'EM_ANDAMENTO',
    "id_module" TEXT NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_id_module_fkey" FOREIGN KEY ("id_module") REFERENCES "module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
