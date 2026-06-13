import ky, { isHTTPError } from "ky";

const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;
const DEV_API_URL = "http://localhost:8000/";

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

function createApiInstance(baseUrl: string) {
  return ky.create({
    prefix: baseUrl,
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
}

export let apiInstance = createApiInstance(BASE_API_URL);

export function setDevMode(enabled: boolean) {
  apiInstance = createApiInstance(enabled ? DEV_API_URL : BASE_API_URL);
}

export { useMutation } from "./use-mutation";
export { useQuery } from "./use-query";
