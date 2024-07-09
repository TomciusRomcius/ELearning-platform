"use server";

import { navigate } from "@/utils/navigation";
import { isAdmin } from "@/backend/utils/isAdmin";

export default async function Page() {
  if (await isAdmin()) {
    await navigate("/admin/courses");
  } else await navigate("not-authorized");
}
