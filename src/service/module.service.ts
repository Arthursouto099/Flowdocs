
import { Prisma } from "../../generated/prisma";
import { prisma } from "../lib/prisma";
import { Pagination } from "../types/Paginations";
import { createSkip } from "../utils/creeatePagination";
import { type IdentifierOrg } from "../types/IdentifierOrg"



class ModuleError extends Error { }

const moduleService = {

    createModule: async ({ data }: { data: Prisma.moduleCreateInput }) => {
        try {
            return await prisma.module.create({ data })
        }
        catch (e) {
            throw new ModuleError((e as Error).message)
        }
    },

    findModulesByOwner: async ({ pagination, identifierOrg }: { pagination: Pagination, identifierOrg: IdentifierOrg }) => {
        const skip = createSkip(pagination)

        try {
            return await prisma.module.findMany({
                where: {
                    AND: [
                        { org_id: identifierOrg.identifier_code },
                        { created_by: identifierOrg.id }
                    ]
                }, skip: skip, take: pagination.limit,
                include: { processes: true, user: true, org: true, 
                    module_collaborators: {omit: {password: true}}
                 }
            })
        }
        catch (e) {
            throw new ModuleError((e as Error).message)
        }
    }
}

export default moduleService