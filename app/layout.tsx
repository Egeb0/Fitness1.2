import "./globals.css";
import localFont from "next/font/local";
import type { Metadata } from "next";
import ClientWrapper from "./ClientWrapper"; // Ensure this path is correct

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Fitness Tracker 💪",
  description: "Make sure to improve yourself!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientWrapper>
          <div className="min-h-screen flex flex-col">
            <Header />
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ClientWrapper>
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="bg-purple-400 text-white py-4 shadow-lg">
      <h1 className="text-center text-3xl font-bold drop-shadow-lg">
      Fitness Tracker 💪
      </h1>
    </header>
  );
}

function Navbar() {
  return (
    <nav className="bg-white shadow-md py-3">
      <ul className="flex justify-center space-x-4">
        <li>
      
        
          <a
            href="/about"
            className="text-gray-700 hover:text-purple-500 font-semibold"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="/contact"
            className="text-gray-700 hover:text-purple-500 font-semibold"
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <p className="text-center text-sm">
        © 2024 Fitness Tracker . All Rights Reserved.
      </p>
    </footer>
  );
}
