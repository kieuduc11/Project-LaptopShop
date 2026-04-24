import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";
import { comparePassword, hashPassword } from "services/admin/user.service";

const getRoleIdByName = async (roleName: string) => {
    try {
        const role = await prisma.role.findUnique({
            where: { name: roleName },
        });
        return role?.id;
    } catch (error) {
        console.error("Error fetching role ID:", error);
        throw error;
    }
};

const isExistingUser = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { username: email },
        });
        return user ? true : false;
    } catch (error) {
        console.error("Error checking existing user:", error);
        throw error;
    }
};

const createUser = async (fullName: string, email: string, password: string) => {
    const hashedPassword = await hashPassword(password);
    const roleId = await getRoleIdByName("User");
    try {
        const newUser = await prisma.user.create({
            data: {
                fullName,
                username: email,
                password: hashedPassword,
                accountType: ACCOUNT_TYPE.SYSTEM,
                roleId: Number(roleId),
            }
        });
        return newUser;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

const getUserAndRoleById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            role: true
        },
        omit: {
            password: true
        }
    })
    return user;
};

const getUserSumCart = async (id: string) => {
    const user = await prisma.cart.findUnique({
        where: {userId: Number(id)}
    });

    return user?.sum ?? 0;
};

export { createUser, isExistingUser, getUserAndRoleById, getUserSumCart };