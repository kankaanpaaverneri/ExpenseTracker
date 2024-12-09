import { ExpenseFilters } from "../util/types";

export async function fetchGet(url: string, filters?: ExpenseFilters) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filters),
  });
  const data = await response.json();
  return data;
}

export async function fetchPost(url: string, data: Object) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  return result;
}

export async function fetchDelete(url: string) {
  await fetch(url, {
    method: "DELETE",
  });
}
