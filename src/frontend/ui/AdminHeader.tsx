"use client"

import axios from "axios";
import Link from "next/link";

export default function AdminHeader() {
  const onPrepopulateData = () => {
    axios.get("/api/prepopulate");
  }

  return (
    <div className="w-full p-2 bg-primary-200">
      <div>
        <Link href="/admin">
          <button className="px-8 py-2 bg-primary-300 border-border border-1">
            Admin
          </button>
        </Link>
        <button onClick={onPrepopulateData} className="px-8 py-2 bg-primary-300 border-border border-1">
          Prepopulate courses
        </button>
      </div>
    </div>
  );
}
