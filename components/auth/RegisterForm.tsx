"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "@/styles/Auth.module.css";
import Navbar from "@/components/auth/Navbar"; // 

interface FormState {
  name: string;
  email: string;
  password: string;
  phone: string;
}
export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({ name: "", email: "", password: "", phone: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));

      await api.post("/auth/register", formData);
      toast.success("Registered! Check email for OTP");
      router.push("/verify-otp");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      
      <div className={styles.background}>
        <ToastContainer position="top-right" autoClose={3000} />

        {/* Visual Left Side (Branding) */}
        <div className={styles.leftSide}>
          <div className={styles.welcomeText}>
            <h1>Join Us.</h1>
            <p>Create an account to start managing your projects, collaborating with teams, and scaling your business.</p>
          </div>
        </div>

        {/* Form Right Side */}
        <div className={styles.rightSide}>
          <div className={styles.container}>
            <h2 className={styles.title}>Register</h2>
            <p className={styles.subtitle}>Get started for free today</p>

            <form className={styles.form} onSubmit={handleSubmit}>
              <input 
                name="name" 
                placeholder="Full Name" 
                className={styles.input} 
                required 
                onChange={handleChange} 
              />
              <input 
                name="email" 
                placeholder="Email" 
                type="email" 
                className={styles.input} 
                required 
                onChange={handleChange} 
              />
              <input 
                name="password" 
                placeholder="Password" 
                type="password" 
                className={styles.input} 
                required 
                onChange={handleChange} 
              />
              <input 
                name="phone" 
                placeholder="Phone Number" 
                className={styles.input} 
                required 
                onChange={handleChange} 
              />
              
              <button className={styles.button} disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
              </button>

              <div className={styles.links}>
                <span>Already have an account?</span>
                <a href="/login">Login</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}