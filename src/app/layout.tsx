import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Progress App",
  description: "Dog Training Tracker",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#F7F7F7] text-black">
        {children}
      </body>
    </html>
  );
}
