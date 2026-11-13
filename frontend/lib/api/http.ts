import "server-only";

export const POST_SERVICE = process.env.POST_SERVICE_URL ?? "http://localhost:8081";
export const USER_SERVICE = process.env.USER_SERVICE_URL ?? "http://localhost:8082";

export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

type Options = { method?: string; body?: unknown };

/** Fetch JSON from one of the Go services. Throws ApiError on non-2xx. 204 resolves to undefined. */
export async function request<T>(base: string, path: string, { method = "GET", body }: Options = {}): Promise<T> {
  const res = await fetch(`${base}${path}`, {
    method,
    cache: "no-store",
    headers: body === undefined ? undefined : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!res.ok) {
    let message = res.statusText;
    try {
      message = (await res.json()).error ?? message;
    } catch {}
    throw new ApiError(res.status, message);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}
