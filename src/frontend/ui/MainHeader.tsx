"use client";

import Link from "next/link";
import Account from "../resources/svg/Account";
import { signOut, useSession } from "next-auth/react";
import Popup from "./Popup";
import { useState } from "react";
import { navigate } from "@/utils/navigation";
import LinkOption from "./LinkOption";
import Logout from "../resources/svg/Logout";

export default function MainHeader() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const session = useSession();

  const onSignOut = () => {
    signOut();
  };

  const signIn = () => {
    navigate("/auth/sign-in");
  }

  const onTogglePopup = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <header className="flex justify-between sticky px-20 py-5 items-center border-b-1 border-border shadow-lg">
      <span className="flex gap-20">
        <LinkOption className="text-text-grayed" highlightedClass="text-text-light" href="/my-courses">My courses</LinkOption>
        <LinkOption className="text-text-grayed" highlightedClass="text-text-light" href="/browse">Browse</LinkOption>
      </span>
      <span className="flex gap-20">
        <button className="relative" onClick={onTogglePopup}>
          {isPopupVisible ? (
            <Popup onClose={onTogglePopup} isFixed={false}>
              <div className="w-max p-4 bg-primary-200 border-border border-1 rounded-lg flex flex-col gap-4">
                {session.data?.user ? (
                  <button className="flex gap-2" onClick={onSignOut}>
                    <Logout className="fill-text-grayed"/>
                    Sign out
                  </button>
                ) : (
                  <button onClick={signIn}>Sign in</button>
                )}
              </div>
            </Popup>
          ) : null}
          <Account className="fill-text-grayed hover:fill-secondary" />
        </button>
      </span>
    </header>
  );
}
