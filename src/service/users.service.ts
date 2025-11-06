import { PrismaClient } from "@prisma/client"
import { Prisma } from "../../generated/prisma"
import { prisma } from "../lib/prisma"
import { Pagination } from "../types/Paginations"
import { createSkip } from "../utils/creeatePagination"
import bcrypt from 'bcrypt'
import { users } from "../../generated/prisma"



type Collaborator = users & {joined_at: string}

class UserError extends Error { }

const usersServices = {




    createOrg: async ({ prisma, data }: {
        prisma: PrismaClient, data: {
            orgName: string,
            userName: string,
            identifier_code: string
            id_user: string
        }
    }) => {
        const org = await prisma.org.create({
            data: {
                name: data.orgName ?? `${data.userName} Organization`,
                identifier_code: data.identifier_code,
                owner: { connect: { id: data.id_user } }
            }
        })

        return org
    },


    createUser: async ({ data, dataOrg }: { data: Prisma.usersCreateInput, dataOrg: { orgName: string, identifier_code: string } }) => {
        try {

            const initializeOrg = await prisma.$transaction(async (tx) => {
                const user = await tx.users.create({
                    data: {
                        ...data,
                        password: await bcrypt.hash(data.password, 8),
                        role: "ADMIN"
                    }
                })

                const org = await usersServices.createOrg({
                    prisma: tx, data: {
                        id_user: user.id,
                        identifier_code: dataOrg.identifier_code,
                        orgName: dataOrg.orgName,
                        userName: user.name
                    }
                })

                const { password, ...safeUser } = user
                return { user: safeUser, org }

            })


            return initializeOrg.user

        }

        catch (e: unknown) {
            throw new UserError((e as Error).message)
        }
    },


    findUser: async (id: Prisma.usersWhereUniqueInput) => {
        try {
            if (!id) throw new UserError("id não fornecido")
            return await prisma.users.findUnique({ where: id })
        }
        catch (e: unknown) {
            throw new UserError((e as Error).message)
        }
    },


    findUsers: async (pagination: Pagination, admin = false, orgId: string) => {
        try {
            const skip = createSkip(pagination)
            const users = await prisma.users.findMany({
                skip, take: pagination.limit, include: { activity_log: true, files: true, processes: true }, where: {
                    orgMemberships: { some: { org_id: orgId } }
                }
            })
            return admin ? users : users.map(({ password, ...user }) => user)
        }
        catch (e: unknown) {
            throw new UserError((e as Error).message)
        }
    },


    update: async (id: Prisma.usersWhereUniqueInput, data: Prisma.usersUpdateInput) => {
        try {
            return await prisma.users.update({ where: id, data })

        }

        catch (e: unknown) {
            throw new UserError((e as Error).message)
        }
    },

    delete: async (id: Prisma.usersWhereUniqueInput) => {
        try {
            return await prisma.users.delete({ where: id })
        }
        catch (e: unknown) {
            throw new UserError((e as Error).message)
        }
    },


    // Colaboradores


    createUserOrgRelation: async ({ tx, data }: { tx: PrismaClient, data: { user_id: string, org_id: string } }) => {
        return await tx.orgUser.create({
            data: {
                user_id: data.user_id,
                org_id: data.org_id
            }
        })
    },

    addCollaborator: async ({ data, orgIdentifier }: { data: Prisma.usersCreateInput, orgIdentifier: string }) => {
        try {

            const result = await prisma.$transaction(async (tx) => {
                const createdUser = await tx.users.create({
                    data: {
                        ...data,
                        password: await bcrypt.hash(data.password, 8)
                    }
                })


                const org = await tx.org.findFirst({
                    where: {
                        OR: [
                            { id: orgIdentifier },
                            { identifier_code: orgIdentifier }
                        ]
                    }, select: { id: true }
                })

                if (!org) throw new UserError("Org não existe")


                // criação da tabela relacional
                const userOrg = await tx.orgUser.create({
                    data: {
                        user_id: createdUser.id,
                        org_id: org.id
                    }
                })


                const { password, ...safeUser } = createdUser
                return { user: safeUser, userOrg }

            })


            return result

        }

        catch (e: unknown) {
            throw new UserError((e as Error).message)
        }
    },


    findCollaboratorsByOrg: async ({ }: {}) => {
        try {
            const collaborators: Collaborator[]
             = await prisma.$queryRaw`
            SELECT u."name", u.email, u.created_at, u.profile_image,
            u."role", u.updated_at, u.id, o.joined_at FROM public."OrgUser" o
            join users u on o.user_id = u.id 
            join public."Org" og on og.id = o.org_id;
        `
        }
        catch (e: unknown) {
            throw new UserError((e as Error).message)
        }
    }









}


export default usersServices