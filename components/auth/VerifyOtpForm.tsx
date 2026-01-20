"use client";
import React, { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "@/styles/Auth.module.css";
import api from "@/lib/api";

const VerifyOtpForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const type = searchParams.get("type"); // register | forgot-password
    const emailFromParams = searchParams.get("email");

    const [email] = useState(emailFromParams || "");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("otp", otp);

            await api.post("/auth/verify-otp", formData);

            toast.success("OTP Verified Successfully");

            if (type === "forgot-password") {
                router.push(`/update-password?email=${encodeURIComponent(email)}`);
            } else {
                router.push(`/login?email=${encodeURIComponent(email)}`);
            }

        } catch (error: any) {
            toast.error(error?.response?.data?.message || "OTP Verification Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.background}>
            <ToastContainer position="top-right" autoClose={3000} />

            <div className={styles.leftSide}>
                <div className={styles.welcomeText}>
                    <h1>Check Your Inbox</h1>
                    <p>Enter the OTP sent to your email.</p>
                </div>
            </div>

            <div className={styles.rightSide}>
                <div className={styles.container}>
                    <h2 className={styles.title}>Verify OTP</h2>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <input
                            type="email"
                            value={email}
                            disabled
                            className={styles.input}
                        />

                        <input
                            type="text"
                            inputMode="numeric"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            maxLength={6}
                            className={styles.input}
                            required
                        />

                        <button className={styles.button} disabled={loading}>
                            {loading ? "Verifying..." : "Verify"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VerifyOtpForm;
