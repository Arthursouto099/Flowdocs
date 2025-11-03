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


            const isEx = await prisma.users.findUnique({ where: { email: data.email }, include: { orgs: { select: { id: true } }, collaboratorInOrgs: { select: { id: true } } } })
            if (!isEx) throw new AuthError("email não existe")

            if (! await bcrypt.compare(data.password, isEx.password)) throw new AuthError("Senha incorreta")



            const token = sign({
                email: isEx.email,
                id: isEx.id,
                role: isEx.role,
                orgId: isOrg.id,
                identifier_code: isOrg.identifier_code,
                name: isEx.name
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