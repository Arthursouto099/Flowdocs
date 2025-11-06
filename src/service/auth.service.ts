import { prisma } from "../lib/prisma"
import bcrypt from "bcrypt"
import { sign } from "jsonwebtoken"
import "dotenv/config"

export class AuthError extends Error { }

const authService = {

    login: async ({ data }: { data: { email: string, password: string,  identifier_code: string } }) => {
        try {
            const isOrg = await prisma.org.findFirst({ where: {
               identifier_code: data.identifier_code
            } })
            if (!isOrg) throw new AuthError("Organização não existe")


            const user = await prisma.users.findFirst({
                where : {
                    OR: [
                        {orgMemberships: {some: {org_id: isOrg.id}}},
                        {orgs: {some: {identifier_code: data.identifier_code}}}
                    ]
                }
            })
            if (!user) throw new AuthError("email não existe")

            if (! await bcrypt.compare(data.password, user.password)) throw new AuthError("Senha incorreta")



            const token = sign({
                email: user.email,
                id: user.id,
                role: user.role,
                orgId: isOrg.id,
                identifier_code: isOrg.identifier_code,
                name: user.name
                
            } as { email: string, id: string, role?: string, orgId: string, name: string },
                process.env.JWT_SECRET!,
                { expiresIn: "7d" })

            return { message: "Login feito com sucesso", success: true, token }
        }
        catch (e: unknown) {
            throw new AuthError((e as Error).message)
        }
    }


}


export default authService