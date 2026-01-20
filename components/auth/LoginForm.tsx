"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Added Link
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/auth/Navbar";
import styles from "@/styles/Auth.module.css";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    const res = await signIn("credentials",{
      redirect:false,
      email,
      password
    });

    if (res?.error) {
      toast.error("Invalid credentials");
      setLoading(false);
      return;
    }

    toast.success("Login successful");
    setLoading(false);
    router.replace("/dashboard");
  };

  return (
    <>
      <Navbar />
      <div className={styles.background}>
        <ToastContainer position="top-right" autoClose={3000} />
        
        <div className={styles.leftSide}>
          <div className={styles.welcomeText}>
            <h1>Welcome <span>Back.</span></h1>
            <p>Access your sacred space. Continue your journey towards balance, harmony, and abundance.</p>
          </div>
        </div>

        <div className={styles.rightSide}>
          <div className={styles.container}>
            <h2 className={styles.title}>Login</h2>
            <p className={styles.subtitle}>Enter your details to continue</p>
            
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email Address" 
                  className={styles.input} 
                  required 
                />
              </div>

              <div className={styles.inputGroup}>
                <input 
                  type="password" 
                  name="password" 
                  placeholder="Password" 
                  className={styles.input} 
                  required 
                />
                <div className={styles.forgotWrapper}>
                  <Link href="/forgot-password" className={styles.forgotLink}>
                    Forgot password?
                  </Link>
                </div>
              </div>

              <button className={styles.button} disabled={loading}>
                {loading ? "Verifying..." : "Login"}
              </button>
            </form>

            <div className={styles.links}>
              <span>Don't have an account?</span>
              <Link href="/register">Create Account</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}