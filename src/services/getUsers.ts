import axios from "axios";

export async function getUsers() {
  await axios.get("/api/sign-up");
}