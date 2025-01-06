import { z } from "zod";

export const postFormSchema = z.object({
  postTitle: z.string().min(1, "Название поста обязательно"),
});

export type PostFormSchema = z.infer<typeof postFormSchema>;
