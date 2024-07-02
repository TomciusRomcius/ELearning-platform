"use server";

import { authOptions } from "../api/auth/authOptions";
import { navigate } from "@/utils/navigation";
import { isAdmin } from "@/backend/utils/isAdmin";
import { getSessionServer } from "@/backend/utils/getServerSession";

export default async function Page() {
  const session = await getSessionServer(authOptions);
  if (await isAdmin()) {
    await navigate("/admin/courses");
  } else await navigate("not-authorized");
}
