import { Prisma } from "../../generated/prisma";
import { prisma } from "../lib/prisma";
import { IdentifierOrg } from "../types/IdentifierOrg";
import { Pagination } from "../types/Paginations";
import { createSkip } from "../utils/creeatePagination";




class ProccessError extends Error { }

const processService = {




    create: async ({ data }: { data: Prisma.processesCreateInput }) => {
        try {
            const createProccess = await prisma.$transaction(async (tx) => {
                const create = await tx.processes.create({ data })
                const userName = await tx.users.findFirst({ where: { id: create.created_by! }, select: { name: true } })
                const createLog = await tx.activity_log.create({
                    data: {
                        action: "CREATE_PROCCESS",
                        message: `${userName?.name} criou o processo ${create.name}`,
                        user_id: create.created_by
                    }
                })

                return { create, createLog }
            })

            return createProccess
        }
        catch (e: unknown) {
            throw new ProccessError((e as Error).message)
        }
    },


    createTask: async ({ data }: { data: Prisma.taskCreateInput }) => {
        try {
            const result = await prisma.$transaction(async (tx) => {
                const create = await tx.task.create({ data })
                const process = await tx.processes.findFirst({ where: {  id: create.id_process}, select:{name: true}  })
                const createLog = await tx.activity_log.create({
                    data: {
                        action: "CREATE_TASK",
                        message: `No modulo ${process?.name} foi criado a task ${create.title}`
                    }
                })

                return { create, createLog }
            })

            return result
        }
        catch (e: unknown) {
            throw new ProccessError((e as Error).message)
        }
    },

     findTaskByProcess: async ({ pagination,id_process}: { pagination: Pagination, id_process: string }) => {
        const skip = createSkip(pagination)

        return await prisma.task.findMany({
            skip: skip,
            take: pagination.limit,
            where: {id_process}
        }) ?? []

    },



    findProcessByModule: async ({ pagination, id_module }: { pagination: Pagination, id_module: string }) => {
        const skip = createSkip(pagination)

        return await prisma.processes.findMany({
            skip: skip,
            take: pagination.limit,
            where: { id_module },
            include: {
                user: { omit: { password: true } },
                files: true,
                collaborators: { omit: { password: true } }
            }
        }) ?? []

    }
}

export default processService