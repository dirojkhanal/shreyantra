"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

interface ClientLayoutProps {
  children: ReactNode;
  session?: any;
}

export default function ClientLayout({ children, session }: ClientLayoutProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
