import { prisma } from "config/client";
import { hashPassword } from "services/user.service";
import { ACCOUNT_TYPE } from "./constant";

const initDatabase = async () => {
    const countUser = await prisma.user.count();
    const countRole = await prisma.role.count();

    if (countRole === 0) {
        await prisma.role.createMany({
            data: [
                {
                    name: "ADMIN",
                    description: "Administrator"
                },
                {
                    name: "USER",
                    description: "Regular User"
                }
            ]
        });
    }
    if (countUser === 0) {
        const defaultPassword = await hashPassword("123456");
        const adminRole = await prisma.role.findFirst({
            where: {
                name: "ADMIN"
            }
        });

        if (adminRole) {
            await prisma.user.createMany({
                data: [
                    {
                        fullName: "Kieu Duc",
                        username: "kieuduc223@gmail.com",
                        password: defaultPassword,
                        accountType: ACCOUNT_TYPE.SYSTEM,
                        roleId: adminRole.id
                    },
                    {
                        fullName: "Admin",
                        username: "admin",
                        password: defaultPassword,
                        accountType: ACCOUNT_TYPE.SYSTEM,
                        roleId: adminRole.id
                    }
                ]
            });
        }
    }

};

export default initDatabase;