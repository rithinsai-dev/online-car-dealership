import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-black shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
      <div className="text-xl font-bold"><Link href="/">Autobahn</Link></div>
      <div className="space-x-6">
        <Link href="/">Home</Link>
        <Link href="/testdrive">Test Drive</Link>
        <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">Locate Us</a>
      </div>
    </nav>
  );
}
