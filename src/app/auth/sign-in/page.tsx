import { getServerSession } from "next-auth";
import SignIn from "./SignInPage";
import { navigate } from "@/utils/navigation";

export default async function Page() {
  const session = await getServerSession();
  if (session?.user)
    await navigate("/my-courses");

  return (
    <SignIn/>
  )
}