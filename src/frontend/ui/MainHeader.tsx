import Link from "next/link";

export default function MainHeader() {
  return (
    <header className="flex justify-between sticky px-20 py-5 items-center border-b-1 border-border">
      <span className="flex gap-20">
        <Link href="/my-courses">My courses</Link>
        <Link href="/browse">Browse</Link>
      </span>
      <span className="flex gap-20"></span>
    </header>
  );
}
