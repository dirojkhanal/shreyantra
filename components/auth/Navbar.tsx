"use client";

import { JSX } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import styles from "@/styles/Navbar.module.css";

export default function Navbar(): JSX.Element {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

 
  
  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>
          <Link href="/">Shree <span>Yantra</span></Link>
        </div>
        
        <ul className={styles.links}>
          <li>
            <Link href="/" className={pathname === "/" ? styles.active : ""}>Home</Link>
          </li>
          <li>
            <Link href="/about" className={pathname === "/about" ? styles.active : ""}>About</Link>
          </li>
          
          {!session ? (
            <>
              <li><Link href="/login" className={styles.loginLink}>Login</Link></li>
              <li><Link href="/register" className={styles.registerBtn}>Register</Link></li>
            </>
          ) : (
            <>
              <li><Link href="/dashboard" className={pathname === "/dashboard" ? styles.active : ""}>Dashboard</Link></li>
              <li><button onClick={handleLogout} className={styles.logoutBtn}>Logout</button></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}