import { Prisma } from "../../generated/prisma"
import { prisma } from "../lib/prisma"
import { Pagination } from "../types/Paginations"
import { createSkip } from "../utils/creeatePagination"
import bcrypt from 'bcrypt'


class UserError extends Error  {}

const usersServices = {

createUser: async ({data, dataOrg}: {data: Prisma.usersCreateInput, dataOrg: {orgName: string, identifier_code: string}}) => {
    try {
        
        const initializeOrg = await prisma.$transaction(async (tx) => {
            const createdUser = await tx.users.create({data: {
            ...data,
            password: await bcrypt.hash(data.password, 8) ,
            role: "ADMIN"
        }})

        const org = await tx.org.create({
            data: {
                name: dataOrg.orgName ?? `${createdUser.name} Organization`,
                identifier_code: dataOrg.identifier_code,
                owner: {connect: {id: createdUser.id}}
            }
        })

        const {password, ...safeUser} = createdUser
        return {user: safeUser, org}

        })


        return initializeOrg.user

    }

    catch(e: unknown) {
        throw new UserError((e as Error).message)
    }
},

findUser: async (id: Prisma.usersWhereUniqueInput) => {
    try{
        if(!id) throw new UserError("id não fornecido")
        return await prisma.users.findUnique({where: id})
    }
    catch(e: unknown) {
        throw new UserError((e as Error).message)
    }
},


findUsers: async (pagination: Pagination, admin = false, orgId: string) => {
    try{
        const skip = createSkip(pagination)
        const users =  await prisma.users.findMany({skip, take: pagination.limit, include: {activity_log: true, files: true, processes: true}, where: {collaboratorInOrgs: {some: {id: orgId}}}})
        return admin ? users : users.map(({password,...user}) => user ) 
    }
    catch(e: unknown) {
        throw new UserError((e as Error).message)
    }
},


update: async (id: Prisma.usersWhereUniqueInput, data: Prisma.usersUpdateInput) => {
    try {
        return await prisma.users.update({where: id, data})
        
    }

    catch(e: unknown) {
        throw new UserError((e as Error).message)
    }
},

delete: async (id: Prisma.usersWhereUniqueInput) => {
    try {
        return await prisma.users.delete({where: id})
    }
    catch(e: unknown) {
        throw new UserError((e as Error).message)
    }
}




}


export default usersServices