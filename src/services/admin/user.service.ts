import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";
import bcrypt from "bcrypt";
const saltRounds = 10;

const getAllUsers = async () => {
    const users = await prisma.user.findMany();
    return users;
};

const getAllRoles = async () => {
    const roles = await prisma.role.findMany();
    return roles;
};

const hashPassword = async (plainText: string) => {
    const hashPassword = await bcrypt.hash(plainText, saltRounds);
    return hashPassword;
}

type TAvatar = string | null;
const handleCreateUser = async (
    fullName: string,
    email: string,
    address: string,
    phone: string,
    avatar: TAvatar,
    role: string
) => {
    const defaultPassword = await hashPassword("123456");
    await prisma.user.create({
        data: {
            fullName,
            username: email,
            address: address,
            password: defaultPassword,
            accountType: ACCOUNT_TYPE.SYSTEM,
            avatar,
            phone,
            roleId: Number(role)
        }
    });
};

const handleDeleteUser = async (id: string) => {
    await prisma.user.delete({
        where: {
            id: Number(id)
        }
    });
}

const handleViewUser = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: Number(id)
        }
    });
    return user;
};

const handleUpdateUser = async (
    id: string, 
    fullName: string,
    phone: string,  
    role: string, 
    address: string, 
    avatar: TAvatar
) => {
    await prisma.user.update({
        where: {
            id: Number(id)
        },
        data: {
            fullName,
            address: address,
            accountType: ACCOUNT_TYPE.SYSTEM,
            ...(avatar && { avatar }),
            phone,
            roleId: Number(role)
        }
    });
};

export { handleCreateUser, getAllUsers, handleDeleteUser, handleViewUser, handleUpdateUser, getAllRoles, hashPassword };