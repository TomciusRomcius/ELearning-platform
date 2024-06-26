"use server";

import { authOptions } from "../api/auth/authOptions";
import { getServerSession } from "next-auth";
import { navigate } from "@/utils/navigation";
import { UserRole } from "@/backend/models/userModel";
import { isAdmin } from "@/backend/utils/isAdmin";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (await isAdmin()) {
    await navigate("/admin/courses");
  } else await navigate("not-authorized");
}
