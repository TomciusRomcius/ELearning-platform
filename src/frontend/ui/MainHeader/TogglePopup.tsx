"use client";

import { useState } from "react";
import Popup from "../Popup";
import type { Session } from "next-auth";
import Account from "@/frontend/resources/svg/Account";
import { signOut } from "next-auth/react";
import { navigate } from "@/utils/navigation";
import Logout from "@/frontend/resources/svg/Logout";

type TogglePopupProps = {
  session: Session | null;
};

export default function TogglePopup({ session }: TogglePopupProps) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const onTogglePopup = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setIsPopupVisible(!isPopupVisible);
  };

  const onSignOut = () => {
    signOut();
  };

  const signIn = () => {
    navigate("/auth/sign-in");
  };

  return (
    <button className="relative" onClick={onTogglePopup}>
      {isPopupVisible ? (
        <Popup onClose={onTogglePopup} isFixed={false}>
          <div className="w-max p-4 bg-primary-200 border-border border-1 rounded-lg flex flex-col gap-4">
            {session?.user ? (
              <button
                className="flex gap-2 text-text-grayed hover:text-text-light fill-text-grayed hover:fill-text-light transition-colors"
                onClick={onSignOut}
              >
                <Logout className="fill-inherit" />
                Sign out
              </button>
            ) : (
              <button
                className="text-text-grayed hover:text-text-light transition-all"
                onClick={signIn}
              >
                Sign in
              </button>
            )}
          </div>
        </Popup>
      ) : null}
      <Account className="fill-text-grayed hover:fill-secondary transition-colors" />
    </button>
  );
}
