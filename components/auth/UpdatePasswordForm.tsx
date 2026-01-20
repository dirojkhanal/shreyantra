import React from "react";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "@/styles/Auth.module.css";
import api from "@/lib/api";
import { Eye, EyeOff } from "lucide-react";

const UpdatePasswordForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      await api.post("/auth/update-password", formData);
      toast.success("Password Updated Successfully");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.background}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className={styles.leftSide}>
        <div className={styles.welcomeText}>
          <h1>Secure Your Account.</h1>
          <p>Choose a strong password to keep your account safe.</p>
        </div>
      </div>

      <div className={styles.rightSide}>
        <div className={styles.container}>
          <h2 className={styles.title}>Update Password</h2>
          <p className={styles.subtitle}>
            Enter your email and new password below.
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Confirm Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />

            {/* Password Wrapper for the Icon */}
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <button className={styles.button} disabled={loading}>
              {loading ? "Updating..." : "Set New Password"}
            </button>

            <div className={styles.links}>
              <a href="/login">Cancel and Return to Login</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordForm;
