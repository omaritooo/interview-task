import z from "zod";

const types = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
] as const;

const productSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(6, { message: "Title must at least be 8 characters" }),
  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    })
    .min(6, { message: "Description must at least be 6 characters" })
    .max(300, { message: "Description must not exceed 300 characters" }),
  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .positive({ message: "Price can not be a negative value" }),
  category: z.enum(types, {
    errorMap: () => ({
      message: "Invalid category",
    }),
  }),
  image: z
    .string({
      required_error: "Image URL is required",
      invalid_type_error: "Image URL must be a string",
    })
    .url({ message: "Invalid Url" }),
});

type productSchemaType = z.infer<typeof productSchema>;

export { productSchema, type productSchemaType };
