"use server"

import { navigate } from "@/utils/navigation"

export default async function Page() {
  await navigate("/browse");
}
