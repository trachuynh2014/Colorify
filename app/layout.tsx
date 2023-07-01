import ClientOnly from "@/components/ClientOnly";
import "./globals.css";
import { Inter } from "next/font/google";
import ToasterProvider from "@/components/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Colorify",
  description: "Color Palette Generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <ToasterProvider />
          {children}
        </ClientOnly>
      </body>
    </html>
  );
}
