"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "@/components/auth/Navbar";
import styles from "@/styles/Auth.module.css";
import { JSX } from "react";

export default function LoginForm(): JSX.Element {
    const [loading ,setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const form = e.currentTarget;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;
        const res = await signIn("credentials", { email, password, redirect: false });
        setLoading(false);
        if(res?.error){
            toast.error(res.error);
        } else {
            router.push("/dashboard");
        }
}

  return (
    <>
      <Navbar />
      <div className={styles.background}>
        <ToastContainer position="top-right" autoClose={3000} />
        <div className={styles.leftSide}>
          <div className={styles.welcomeText}>
            <h1>Welcome Back.</h1>
            <p>Login to access your dashboard and manage your projects.</p>
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.container}>
            <h2 className={styles.title}>Login</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
              <input type="email" name="email" placeholder="Email" className={styles.input} required />
              <input type="password" name="password" placeholder="Password" className={styles.input} required />
              <button className={styles.button} disabled={loading}>
                {loading ? "Logging In..." : "Login In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
