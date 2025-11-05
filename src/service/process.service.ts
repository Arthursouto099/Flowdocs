import { Prisma } from "../../generated/prisma";
import { prisma } from "../lib/prisma";
import { IdentifierOrg } from "../types/IdentifierOrg";
import { Pagination } from "../types/Paginations";
import { createSkip } from "../utils/creeatePagination";




class ProccessError extends Error { }

const processService = {


    // Processos

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


    findProcessByModule: async ({ pagination, id_module }: { pagination: Pagination, id_module: string }) => {
        const skip = createSkip(pagination)

        return await prisma.processes.findMany({
            skip: skip,
            take: pagination.limit,
            where: { id_module },
            include: {
                user: { omit: { password: true } },
                files: true,
                tasks: {include: {user: {select: {name: true, id: true, email: true, profile_image: true}}}}

            }
        }) ?? []

    },

    // Tasks

    createTask: async ({ data }: { data: Prisma.taskCreateInput }) => {
        try {
            const result = await prisma.$transaction(async (tx) => {
                const create = await tx.task.create({ data })
                const process = await tx.processes.findFirst({ where: { id: create.id_process }, select: { name: true } })
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

    findTasksByProcess: async ({ pagination, id_process }: { pagination: Pagination, id_process: string }) => {
        const skip = createSkip(pagination)

        return await prisma.task.findMany({
            skip: skip,
            take: pagination.limit,
            where: { id_process },
            include: {user: true}
        }) ?? []

    }, 
    changeTaskState: async ({id_task, oldState}: {id_task: string, oldState: string}) => {
        try{
            const newStatus = oldState === "PENDENTE" ? "CONCLUIDA" : "PENDENTE";
            const result =  await prisma.$transaction( async (tx) => {
                const updated = await tx.task.update({
                    where: {id: id_task},
                    data: {status: newStatus}
                })
                const user = await tx.users.findUnique({where: {id: updated.created_by}, select: {name: true}})
                const log = await tx.activity_log.create({data: {message: `${user?.name} alterou o estado da task ${updated.title} para ${newStatus} `, action: "CREATE_TASK"}})
                
                return {updated, log}
            })

            return result
        }
        catch(e: unknown){
            throw new ProccessError((e as Error).message)
        }
    }
}

export default processService