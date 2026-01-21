"use client";

export const dynamic = "force-dynamic";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Navbar from "@/components/auth/Navbar";
import styles from "@/styles/Dashboard.module.css";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  // 🔒 Wait until session is fully resolved
  if (status === "loading") {
    return (
      <>
        <Navbar />
        <div className={styles.dashboard}>
          <p>Dashboard Loading...</p>
        </div>
      </>
    );
  }

  // Extra safety
  if (status !== "authenticated") {
    return null;
  }

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.replace("/login");
  };

  const userInitial = session.user?.name?.charAt(0).toUpperCase() ?? "U";

  return (
    <>
      <Navbar />
      <main className={styles.dashboard}>
        <div className={styles.content}>
          <div className={styles.avatar}>{userInitial}</div>
          <h1>Welcome, {session.user?.name}</h1>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <h3>Status</h3>
              <span>Verified</span>
            </div>
            <div className={styles.statCard}>
              <h3>Email</h3>
              <p>{session.user?.email}</p>
            </div>
          </div>

          <button onClick={handleLogout} className={styles.logoutBtn}>
            Logout Account
          </button>
        </div>
      </main>
    </>
  );
}
