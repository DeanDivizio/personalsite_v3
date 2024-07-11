import { Inter } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/dist/google';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DeanDivizio.com",
  description: "The website for creative engineer, Dean Divizio.",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <GoogleAnalytics gaID='G-B4LMP9JX7Y' />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
