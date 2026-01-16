import ClientLayout from "@/components/ClientLayout";
import type { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}


export const metadata = {
  title: {
    default: "Shree Yantra", // Default title
    template: "%s | Shree Yantra", // Page-specific titles
  },
  description: "Shree Yantra – Mindfulness & Balance Platform",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
