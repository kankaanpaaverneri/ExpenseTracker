import { CategoryFilters, DateFilters } from "../util/types";

interface Filters {
  categoryFilters: CategoryFilters[];
  dateFilters: DateFilters;
}

export async function fetchGet(url: string, filters?: Filters) {
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
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function fetchDelete(url: string) {
  await fetch(url, {
    method: "DELETE",
  });
}
