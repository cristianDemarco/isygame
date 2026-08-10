export const ApiMethod = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;

export type ApiMethod = typeof ApiMethod[keyof typeof ApiMethod];