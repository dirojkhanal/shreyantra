"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import styles from "@/styles/Dashboard.module.css";

export default function Dashboard() {
  const { auth, logout, loading } = useAuth();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  // Ensure client-side rendering only
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (mounted && !loading && !auth) {
      router.replace("/login");
    }
  }, [mounted, loading, auth, router]);

  // LOADER during hydration + auth check
  if (!mounted || loading) {
    return (
      <div className={styles.loaderWrapper}>
        <div className={styles.loader}></div>
        <p className={styles.loadingText}>Loading...</p>
      </div>
    );
  }

  // Safety fallback
  if (!auth) return null;

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className={styles.dashboard}>
      {/* Background Waves */}
      <div className={styles.backgroundWaves} />

      {/* Subtle Shree Yantra Overlay */}
      <div className={styles.yantraContainer}></div>

      <div className={styles.content}>
        <div className={styles.profileCard}>
          <h1 className={styles.welcome}>
            Namaste, {auth.user.name} 
          </h1>

          <p className={styles.subtitle}>
            Welcome to Shree Yantra 
          </p>

          <div className={styles.userInfo}>
            <p><strong>Email:</strong> {auth.user.email}</p>
            {auth.user.phone && (
              <p><strong>Phone:</strong> {auth.user.phone}</p>
            )}
          </div>

          <button onClick={handleLogout} className={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
