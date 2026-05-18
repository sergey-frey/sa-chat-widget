import ky from "ky";

export const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

export const apiInstance = ky.create({
  baseUrl: BASE_API_URL,
  timeout: 180000,
});

export { useMutation } from "./use-mutation";
export { useQuery } from "./use-query";
