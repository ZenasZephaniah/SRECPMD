import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Inventory Dashboard",
  description: "Secure Product Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased bg-gray-50 text-gray-900"
        style={{ fontFamily: '"Microsoft Sans Serif", Arial, sans-serif' }}
      >
        {children}
      </body>
    </html>
  );
}