"use server";

import LinkOption from "../LinkOption";
import { getSessionServer } from "@/backend/utils/getServerSession";
import TogglePopup from "./TogglePopup";

export default async function MainHeader() {
  const session = await getSessionServer();

  return (
    <header className="flex justify-between sticky px-10 md:px-20 py-5 items-center border-b-1 border-border shadow-lg">
      <span className="flex gap-10 md:gap-20">
        <LinkOption
          className="text-text-grayed hover:text-text-light transition-colors"
          highlightedClass="text-text-light"
          href="/my-courses"
        >
          My courses
        </LinkOption>
        <LinkOption
          className="text-text-grayed hover:text-text-light transition-colors"
          highlightedClass="text-text-light"
          href="/browse"
        >
          Browse
        </LinkOption>
      </span>
      <span className="flex gap-10 md:gap-20">
        <TogglePopup session={session} />
      </span>
    </header>
  );
}
