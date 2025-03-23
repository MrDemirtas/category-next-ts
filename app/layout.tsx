import "./reset.css";

import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "My Category App",
  description: "A simple app to manage categories and products",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
