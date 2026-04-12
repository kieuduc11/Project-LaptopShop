import { z } from "zod";

const ProductSchema = z.object({
    name: z.string().trim().min(1, { message: "Name is required" }),
    price: z.string()
        .transform((val) => (val === "" ? 0 : Number(val)))
        .refine((num) => num > 0, {
            message: "Price must be a positive number",
        }),

    detailDesc: z.string().trim().min(1, { message: "Detail description is required" }),
    shortDesc: z.string().trim().min(1, { message: "Short description is required" }),
    quantity: z.string()
        .transform((val) => (val === "" ? 0 : Number(val)))
        .refine((num) => num > 0, {
            message: "Quantity must be a positive number",
        }),

    factory: z.string().trim().min(1, { message: "Factory is required" }),
    target: z.string().trim().min(1, { message: "Target is required" }),
});

export type TProductSchema = z.infer<typeof ProductSchema>;
export { ProductSchema };