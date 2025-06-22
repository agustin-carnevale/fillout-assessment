import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Form Builder - Fillout Assessment",
  description:
    "A modern form builder application with drag-and-drop page navigation.",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#162542" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
