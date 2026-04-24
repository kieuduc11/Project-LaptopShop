import { prisma } from "config/client";

const getProductById = async (id: string) => {
    const product = await prisma.product.findUnique({
        where: {
            id: Number(id)
        }
    });
    return product;
};

const addProductToCart = async (quantity: number, productId: number, user: Express.User) => {
    const cart = await prisma.cart.findUnique({
        where: { userId: user.id }
    });

    const product = await prisma.product.findUnique({
        where: { id: productId }
    });

    if (!product) throw new Error("Product not found!")

    if (cart) {
        // update
        // cập nhật sum giỏ hàng
        await prisma.cart.update({
            where: { id: cart.id },
            data: {
                sum: {
                    increment: quantity
                }
            }
        })

        // cập nhật cart-detail
        // nếu chưa có -> Tạo mới. Có rồi -> cập nhật
        await prisma.cartDetail.upsert({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId
                }
            },
            update: {
                quantity: {
                    increment: quantity
                }
            },
            create: {
                price: product.price,
                cartId: cart.id,
                productId,
                quantity
            }
        });


    } else {
        //create
        await prisma.cart.create({
            data: {
                sum: quantity,
                userId: user.id,
                cartDetail: {
                    create: [
                        {
                            price: product.price,
                            productId,
                            quantity
                        }
                    ]
                }
            }
        })
    }
};

const getProductInCart = async (userId: number) => {
    const cart = await prisma.cart.findUnique({
        where: { userId }
    });

    if (cart) {
        const cartDetail = await prisma.cartDetail.findMany({
            where: {
                cartId: cart.id
            },
            include: {
                product: true
            }
        })

        return cartDetail;
    };

    return [];
};

const deleteProductInCart = async (cartDetailId: number, sumCart: number) => {
    const cartDetail = await prisma.cartDetail.delete({
        where: { id: cartDetailId }
    });

    if (sumCart > 1) {
        return await prisma.cart.update({
            where: { id: cartDetail.cartId },
            data: {
                sum: {
                    decrement: cartDetail.quantity
                }
            }
        })
    } else {
        return await prisma.cart.delete({
            where: { id: cartDetail.cartId }
        })
    }
};

const updateCartDetailBeforeCheckout = async (
    data: { id: string; quantity: string }[],
    userId: number
) => {
    let totalQuantity = 0;
    for (const item of data) {
        await prisma.cartDetail.update({
            where: {
                id: Number(item.id),
            },
            data: {
                quantity: Number(item.quantity),
            },
        });

        totalQuantity += Number(item.quantity);
    }

    // cập nhật sum cart
    const cart = await prisma.cart.findUnique({
        where: { userId }
    });

    if (!cart) return;
    await prisma.cart.update({
        where: { id: cart.id },
        data: {
            sum: totalQuantity
        }
    })
};
const handlePlaceOrder = async (
    userId: number,
    receiverName: string,
    receiverAddress: string,
    receiverPhone: string,
    totalPrice: number
) => {
    try {
        // transaction
        await prisma.$transaction(async (tx) => {
            const cart = await tx.cart.findUnique({
                where: { userId },
                include: { cartDetail: true }
            });

            if (!cart) return;

            // check product
            for (let i = 0; i < cart.cartDetail.length; i++) {
                const product = await tx.product.findUnique({
                    where: { id: cart.cartDetail[i].productId }
                })

                if (!product || product.quantity < cart.cartDetail[i].quantity) {
                    throw new Error(`Sản phẩm không tồn tại hoặc không đủ số lượng.`)
                } else {
                    await tx.product.update({
                        where: { id: cart.cartDetail[i].productId },
                        data: {
                            quantity: {
                                decrement: cart.cartDetail[i].quantity
                            },
                            sold: {
                                increment: cart.cartDetail[i].quantity
                            }
                        }
                    })
                }
            }

            //create order, order detail
            const dataOrderDetail = cart.cartDetail.map((item) => ({
                price: item.price,
                quantity: item.quantity,
                productId: item.productId
            }));
            await tx.order.create({
                data: {
                    receiverName,
                    receiverAddress,
                    receiverPhone,
                    paymentMethod: "COD",
                    paymentStatus: "PAYMENT_UNPAID",
                    status: "PENDING",
                    totalPrice,
                    userId,
                    orderDetails: {
                        create: dataOrderDetail
                    }
                }
            })

            // delete cart-detail, cart
            await tx.cartDetail.deleteMany({
                where: { cartId: cart.id }
            })
            await tx.cart.delete({
                where: { id: cart.id }
            })

        })
        return "";
    } catch (error: unknown) {
        if (error instanceof Error) {
            return error.message;
        }
        return String(error);
    }
};

export {
    getProductById,
    addProductToCart,
    getProductInCart,
    deleteProductInCart,
    updateCartDetailBeforeCheckout,
    handlePlaceOrder
};