import { Geist } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "Rezon",
  description: "A movie discovery app",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
