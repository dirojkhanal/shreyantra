"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import styles from "@/styles/Home.module.css";
import { JSX } from "react";
export default function Home(): JSX.Element {
  return (
    <>
      <Navbar />

      <main className={styles.main}>
        {/* Hero Section */}

        <section className={styles.hero}>
          <div className={styles.overlay}></div>

          <div className={styles.content}>
            <h1 className={styles.title}>
              Calm Mind
              <br />
              Strong Spirit
            </h1>

            <p className={styles.subtitle}>
              Embrace the ancient wisdom of Shree Yantra, a powerful sacred
              geometric symbol in Hinduism, formed by nine interlocking
              triangles radiating from a central point (bindu), representing the
              divine union of masculine (Shiva) and feminine (Shakti) energies,
              the cosmos, and the body. It is used for attracting wealth,
              spiritual growth, and harmony, often placed in homes or for
              meditation.
            </p>

            <div className={styles.cta}>
              <Link href="/about" className={styles.btnPrimary}>
                Discover More
              </Link>

              <Link href="/register" className={styles.btnSecondary}>
                Start Journey
              </Link>
            </div>
          </div>
        </section>

        {/* Info Section */}

        <section className={styles.info}>
          <h2>The Sacred Path of Yantra & Yoga</h2>

          <p>
            Discover the transformative power of the Shree Yantra combined with
            mindful meditation and yoga practices.
            <br />
            Achieve balance, abundance, and enlightenment in your daily life.
          </p>
        </section>
      </main>
    </>
  );
}
