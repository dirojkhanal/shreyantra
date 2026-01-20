"use client"; // optional here if you use dynamic

import dynamic from "next/dynamic";

const VerifyOtpForm = dynamic(() => import("@/components/auth/VerifyOtpForm"), { ssr: false });

export default function VerifyOtpPage() {
    return <VerifyOtpForm />;
}
