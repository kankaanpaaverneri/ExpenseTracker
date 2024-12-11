import { ExpenseFilters } from "../util/types";

export async function fetchGet(url: string, filters?: ExpenseFilters) {
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filters),
  });
}

export async function fetchPost(url: string, data: Object) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
}

export async function fetchDelete(url: string) {
  await fetch(url, {
    method: "DELETE",
  });
}
