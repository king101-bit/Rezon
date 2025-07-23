import { Inter } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "Rezon",
  description: "A movie discovery app",
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
