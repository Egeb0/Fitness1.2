function Navbar() {
  return (
    <nav className="bg-gray-700 shadow-md py-3">
      <ul className="flex justify-center space-x-6">
        <li>
          <a
            href="/" // Main page is the root path "/"
            className="text-white hover:text-purple-300 font-semibold"
          >
            Dashboard {/* Main page link */}
          </a>
        </li>
        <li>
          <a
            href="/about"
            className="text-white hover:text-yellow-500 font-semibold"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="/contact"
            className="text-white hover:text-yellow-500 font-semibold"
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}
