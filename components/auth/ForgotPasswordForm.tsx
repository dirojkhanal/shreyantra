"use client";
import React from 'react'
import { useRouter } from "next/navigation";
import { useState , FormEvent} from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "@/styles/Auth.module.css";
import api from "@/lib/api";


const ForgotPasswordForm = () => {
  const router = useRouter();
  const [email ,setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const formData = new FormData();
      formData.append("email",email);

      await api.post("/auth/reset-password",formData)
      toast.success("OTP Sent Successfully");
      router.push("/verify-otp?type=forgot-password&email="+encodeURIComponent(email));
      
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to Send OTP");
      
    } finally {
      setLoading(false);
      
    }

  }
  return (
    <div className={styles.background}>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Left Visual Side */}
      <div className={styles.leftSide}>
        <div className={styles.welcomeText}>
          <h1>Forgot Password?</h1>
          <p>
            Don’t worry, it happens to the best of us.
            Enter your email and we’ll help you get back in.
          </p>
        </div>
      </div>

      {/* Right Form Side */}
      <div className={styles.rightSide}>
        <div className={styles.container}>
          <h2 className={styles.title}>Reset Password</h2>
          <p className={styles.subtitle}>
            We’ll send a 6-digit OTP to your email
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <button className={styles.button} disabled={loading}>
              {loading ? "Sending Code..." : "Send Reset Code"}
            </button>

            <div className={styles.links}>
              <a href="/login">← Back to Login</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordForm
