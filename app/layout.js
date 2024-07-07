import { Inter } from "next/font/google";
import Nav from "../components/nav/Nav"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DeanDivizio.com",
  description: "The website for creative engineer, Dean Divizio.",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
