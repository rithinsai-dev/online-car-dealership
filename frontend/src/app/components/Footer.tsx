import Link from "next/link";
export default function Footer() {
    return (
      <footer className="bg-black text-white text-center py-6 mt-10">
        <p>&copy; {new Date().getFullYear()} Autobahn. All rights reserved.</p>
        <p className="text-sm">Driven by passion. Powered by choice.</p>
        <Link href="/dashboard">Worker?</Link>
      </footer>
    );
  }