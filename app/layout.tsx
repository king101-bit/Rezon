import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Rezon – Discover movies & TV",
    template: "%s | Rezon",
  },
  description:
    "Discover new movies and TV shows, and search the titles you love.",
};
const inter = Inter({
  display: "swap",
  subsets: ["latin"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
