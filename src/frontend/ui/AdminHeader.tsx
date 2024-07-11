"use client"

import axios from "axios";
import Link from "next/link";
import AccentButton from "./AccentButton";

export default function AdminHeader() {
  const onPrepopulateData = () => {
    axios.get("/api/prepopulate");
  }

  return (
    <div className="w-full p-4 flex flex-row gap-4 bg-primary-0 border-b-1 border-border">
        <Link href="/admin">
          <AccentButton className="px-8 py-2 bg-primary-100 border-border border-1">
            Admin
          </AccentButton>
        </Link>
        <AccentButton onClick={onPrepopulateData} className="px-8 py-2 bg-primary-100 border-border border-1">
          Prepopulate courses
        </AccentButton>
    </div>
  );
}
