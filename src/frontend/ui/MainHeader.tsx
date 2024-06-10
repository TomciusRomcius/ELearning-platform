"use client";

import Link from "next/link";
import Account from "../resources/svg/Account";
import { signOut, useSession } from "next-auth/react";
import Popup from "./Popup";
import { useState } from "react";
import { navigate } from "@/utils/navigation";

export default function MainHeader() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const session = useSession();

  const onSignOut = () => {
    signOut();
  };

  const signIn = () => {
    navigate("/api/auth/signin");
  }

  const onTogglePopup = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setIsPopupVisible(!isPopupVisible);
  };

  const isActive = (path: string) => {
    return window.location.pathname === path;
  }

  let unselectedLinkClass = "text-text-grayed" 

  return (
    <header className="flex justify-between sticky px-20 py-5 items-center border-b-1 border-border">
      <span className="flex gap-20">
        <Link className={isActive("/my-courses") ? "" : unselectedLinkClass} href="/my-courses">My courses</Link>
        <Link className={isActive("/browse") ? "" : unselectedLinkClass} href="/browse">Browse</Link>
      </span>
      <span className="flex gap-20">
        <button className="relative" onClick={onTogglePopup}>
          {isPopupVisible ? (
            <Popup onClose={onTogglePopup} isFixed={false}>
              <div className="w-max p-4 bg-primary-200 border-border border-1 rounded-lg flex flex-col gap-4">
                {session.data?.user ? (
                  <button onClick={onSignOut}>Sign out</button>
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
