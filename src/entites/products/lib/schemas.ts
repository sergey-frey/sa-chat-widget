import * as v from "valibot";

export const ProductSchema = v.object({
  id: v.number(),
  title: v.string(),
  assistant_name: v.nullable(v.string()),
});

export type IProduct = v.InferOutput<typeof ProductSchema>;

export const GetProductPayloadSchema = v.object({
  productId: v.number(),
});

export type IGetProductPayload = v.InferInput<typeof GetProductPayloadSchema>;
