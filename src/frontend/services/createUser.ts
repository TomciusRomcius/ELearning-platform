import axios from "axios";

export async function createUser(
  username: string,
  password: string,
  isAdmin: boolean = false
) {
  if (!username || !password) return;
  if (password.length < 8) throw new Error("Password too short!");

  await axios.post("/api/sign-up", {
    username: username,
    password: password,
    admin: isAdmin ? true : false,
  });
}
