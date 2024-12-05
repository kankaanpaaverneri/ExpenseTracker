export async function fetchGet(url: string) {
  const response = await fetch(url, { method: "GET" });
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
