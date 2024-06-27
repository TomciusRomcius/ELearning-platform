import Link from "next/link";

export default function AdminHeader() {
  return (
    <div className="w-full p-2 bg-primary-200">
      <div>
        <Link href="/admin">
          <button className="px-8 py-2 bg-primary-300 border-border border-1">
            Admin
          </button>
        </Link>
      </div>
    </div>
  );
}
