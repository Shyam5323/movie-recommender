import Link from "next/link";
export default function SideBar() {
  return (
    <div className="bg-gray-800 text-white w-64 h-screen flex flex-col justify-between py-5">
      <div className="px-4">
        <p className="text-2xl font-bold mb-8">Logo</p>
        <div className="space-y-4">
          <Link href="/dashboard">
            <p className="cursor-pointer hover:text-gray-400">Home</p>
          </Link>
          <p className="cursor-pointer hover:text-gray-400">Search</p>
          <p className="cursor-pointer hover:text-gray-400">Heart</p>
          <Link href="/profile">
            <button className="cursor-pointer hover:text-gray-400">
              Profile
            </button>
          </Link>
        </div>
      </div>
      <div className="px-4">
        <p className="cursor-pointer hover:text-gray-400">Options</p>
      </div>
    </div>
  );
}
