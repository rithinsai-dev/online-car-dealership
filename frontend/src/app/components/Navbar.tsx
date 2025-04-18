import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-black shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
      <div className="text-2xl font-bold text-white">
        <Link href="/" className="text-white hover:text-gray-300 transition duration-300 glow-on-hover">
          Autobahn
        </Link>
      </div>
      <div className="space-x-6 text-white">
        <Link href="/" className="hover:text-gray-300 transition duration-300 glow-on-hover">Home</Link>
        <Link href="/collection" className="hover:text-gray-300 transition duration-300 glow-on-hover">Collection</Link>
        <Link href="/testdrive" className="hover:text-gray-300 transition duration-300 glow-on-hover">Test Drive</Link>
        <a href="https://maps.app.goo.gl/2bmjKTy7DmmUkiEb8" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition duration-300 glow-on-hover">Locate Us</a>
      </div>
    </nav>
  );
}
