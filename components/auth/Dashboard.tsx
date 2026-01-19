"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Navbar from "@/components/auth/Navbar";
import styles from "@/styles/Dashboard.module.css";

export default function () {
  const {data:session , status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status ==="authenticated")
      router.push("/login")
  }, [session , status]);

  if (status ==="loading") {
    return (
      <div className={styles.dashboard}>
        <p>Dashboard Loding....</p>
      </div>
    );
  }
  if(!session?.user) {
    return null;
  }

  const handleLogout = async()=>{
    await signOut({redirect:false});
    router.replace("/login");

  }
   // Get first letter of name for the avatar
  const userInitial = session.user.name ? session.user.name.charAt(0).toUpperCase() : "U";

  return (
    <>
      <Navbar />
      <main className={styles.dashboard}>
        <div className={styles.content}>
          {/* Avatar Circle */}
          <div className={styles.avatar}>{userInitial}</div>

          <h1>Welcome, {session.user.name}</h1>
          

          {/* Stats Grid added to match your CSS */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <h3>Status</h3>
              <span>Verified</span>
            </div>
            <div className={styles.statCard}>
              <h3>Email</h3>
              <p>{session.user.email}</p>
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