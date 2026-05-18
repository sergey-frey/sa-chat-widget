import * as v from "valibot";
import { apiInstance } from "@/shared/api";
import { ProductSchema, type IGetProductPayload, type IProduct } from "./schemas";

function throwParseError(
  issues: readonly [v.BaseIssue<unknown>, ...v.BaseIssue<unknown>[]],
): never {
  const flat = v.flatten(issues);
  throw new Error(`Schema validation failed: ${JSON.stringify(flat, null, 2)}`);
}

export const productsService = {
  async getProduct(payload: IGetProductPayload): Promise<IProduct> {
    const response = await apiInstance
      .get<IProduct>(`products/${payload.productId}/info`)
      .json();

    const result = await v.safeParseAsync(ProductSchema, response);

    if (!result.success) throwParseError(result.issues);

    return result.output;
  },
};
