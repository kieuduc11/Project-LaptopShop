import { prisma } from "config/client";
import { ACCOUNT_TYPE, ITEM_PER_PAGE } from "config/constant";
import bcrypt from "bcrypt";
const saltRounds = 10;

const getAllUsers = async (pageNumber: number) => {
    const take: number = ITEM_PER_PAGE;
    const users = await prisma.user.findMany({
        skip: (pageNumber - 1) * take,
        take: take
    });
    return users;
};

const countTotalUserPages = async () => {
    const totalUser = await prisma.user.count();
    return Math.ceil(totalUser / ITEM_PER_PAGE);
};

const getAllRoles = async () => {
    const roles = await prisma.role.findMany();
    return roles;
};

const hashPassword = async (plainText: string) => {
    const hashPassword = await bcrypt.hash(plainText, saltRounds);
    return hashPassword;
};

const comparePassword = async (plainText: string, hash: string) => {
    const isMatch = await bcrypt.compare(plainText, hash);
    return isMatch;
};

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
};

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

export {
    handleCreateUser,
    getAllUsers,
    handleDeleteUser,
    handleViewUser,
    handleUpdateUser,
    getAllRoles,
    hashPassword,
    comparePassword,
    countTotalUserPages
};