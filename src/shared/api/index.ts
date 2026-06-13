import ky, { isHTTPError } from "ky";

export const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

export class ForbiddenError extends Error {
  constructor() {
    super("403 Forbidden");
    this.name = "ForbiddenError";
  }
}

function getPageOrigin(): string {
  const { origin, pathname } = window.location;
  return origin + pathname;
}

export const apiInstance = ky.create({
  baseUrl: BASE_API_URL,
  timeout: 180000,
  hooks: {
    beforeRequest: [
      ({ request }) => {
        request.headers.set("X-Page-Origin", getPageOrigin());
      },
    ],
    beforeError: [
      ({ error }) => {
        if (isHTTPError(error) && error.response.status === 403) throw new ForbiddenError();
        return error;
      },
    ],
  },
});

export { useMutation } from "./use-mutation";
export { useQuery } from "./use-query";
