"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import store from "../utils/store/store";
import { usePathname } from "next/navigation";
import Header from "../components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const noHeaderRoutes = ["/Login", "/Register", "/Home"];

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          {!noHeaderRoutes.includes(pathname) && <Header />}
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}

