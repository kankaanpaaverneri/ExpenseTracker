export function parseUser(result: any) {
  return {
    userId: result?.userId,
    username: result?.username,
  };
}
