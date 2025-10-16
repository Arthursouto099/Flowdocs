import { Prisma } from "../../generated/prisma"
import { prisma } from "../lib/prisma"
import { Pagination } from "../types/Paginations"
import { createSkip } from "../utils/creeatePagination"
import bcrypt from 'bcrypt'


class UserError extends Error  {}

const usersServices = {

createUser: async ({data}: {data: Prisma.usersCreateInput}) => {
    try {
        const {password, ...safeUser} = await prisma.users.create({data: {
            ...data,
            password: await bcrypt.hash(data.password, 8) ,
            role: "ADMIN"
        }})

        return safeUser

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


findUsers: async (pagination: Pagination, admin = false) => {
    try{
        const skip = createSkip(pagination)
        const users =  await prisma.users.findMany({skip, take: pagination.limit, include: {activity_log: true, files: true, processes: true}})
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