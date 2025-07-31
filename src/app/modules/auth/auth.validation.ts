import * as z from "zod";

export const registerValidator = z.object({
    name: z.string({error:"sdsdfsdfsdf"}),
    age: z.number().int().positive(),
    email: z.string().email(),
});