import { useQuery } from "@/shared/api";
import { productsService } from "../lib/products.service";
import type { IGetProductPayload } from "../lib/schemas";

export function useGetProduct({ productId }: IGetProductPayload) {
  return useQuery(
    () => productsService.getProduct({ productId }),
    [productId],
    { throwOnError: false },
  );
}
