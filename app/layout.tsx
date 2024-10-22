import type {Metadata, Viewport} from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "Next Lab",
  description: "Next + Three Lab",
};

export const viewport: Viewport = {
  themeColor:'black',
  width:"320.1",
  initialScale:1,
  minimumScale:1,
  maximumScale:1,
  userScalable:false,

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={`${geistSans.variable} ${geistMono.variable}`}>
    {children}
    </body>
    </html>
  );
}
