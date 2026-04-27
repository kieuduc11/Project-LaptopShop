import { prisma } from "config/client"
import { ITEM_PER_CLIENT_PAGE } from "config/constant";

const getProductWithFilter = async (
    page: number,
    factory: string,
    target: string,
    price: string,
    sort: string
) => {
    //Build where query
    let whereClause: any = {};
    if (factory) {
        const factoryInput = factory.split(",")
        whereClause.factory = {
            in: factoryInput
        }
    }

    if (target) {
        const targetInput = target.split(",")
        whereClause.target = {
            in: targetInput
        }
    }

    if (price) {
        const priceInput = price.split(",")
        const priceCondition = []
        for (let i = 0; i < priceInput.length; i++) {
            if (priceInput[i] === "duoi-10-trieu") {
                priceCondition.push({ price: { lte: 10000000 } })
            }
            if (priceInput[i] === "10-15-trieu") {
                priceCondition.push({ price: { gte: 10000000, lte: 15000000 } })
            }
            if (priceInput[i] === "15-20-trieu") {
                priceCondition.push({ price: { gte: 15000000, lte: 20000000 } })
            }
            if (priceInput[i] === "tren-20-trieu") {
                priceCondition.push({ price: { gte: 20000000 } })
            }
        }

        whereClause.OR = priceCondition
    }

    //Build sort query
    let orderByClause: any = {};
    if (sort) {
        if (sort === "gia-tang-dan") {
            orderByClause = {
                price: "asc"
            }
        }
        if (sort === "gia-giam-dan") {
            orderByClause = {
                price: "desc"
            }
        }
    }

    const [products, count] = await prisma.$transaction([
        prisma.product.findMany({
            skip: (page - 1) * ITEM_PER_CLIENT_PAGE,
            take: ITEM_PER_CLIENT_PAGE,
            where: whereClause,
            orderBy: orderByClause
        }),
        prisma.product.count({ where: whereClause })
    ])

    const totalPages = Math.ceil(count / ITEM_PER_CLIENT_PAGE)

    return { products, totalPages }
}

export { getProductWithFilter }