import { PrismaClient } from "../../generated/prisma";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;


export async function connectPrisma() {
  try {
    await prisma.$connect();
    console.log("Prisma conectado com sucesso!");

    const tables: {table_name: string}[] = await prisma.$queryRaw`
    SELECT table_name FROM information_schema.tables 
    WHERE table_schema = 'public' ORDER BY table_name`

    tables.forEach(t => console.log(" ->", t.table_name))
    
  } catch (err) {
    console.error(" Erro ao conectar ao Prisma:", err);
  }
}