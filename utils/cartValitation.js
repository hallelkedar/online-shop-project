import z, { number } from 'zod';

export default z.object(
    {
        costumerId: z.string(),
        productId: z.number(),
        quantity: z.number().min(1)
    }
).strict()