"use client";

import Navbar from "@/components/auth/Navbar";
import styles from "@/styles/About.module.css";
import { JSX } from "react";

export default function AboutPage(): JSX.Element {
  return (
    <>
      <Navbar />
      <main className={styles.aboutMain}>
        {/* Header Section */}
        <section className={styles.headerSection}>
          <h1 className={styles.title}>Ancient Wisdom for <br /><span>Modern Harmony</span></h1>
          <p className={styles.lead}>
            Shree Yantra is more than just a symbol; it is a cosmic map of the universe and a tool for spiritual elevation.
          </p>
        </section>

        {/* Story Section */}
        <section className={styles.contentGrid}>
          <div className={styles.textBlock}>
            <h2>What is Shree Yantra?</h2>
            <p>
              The Shree Yantra, often called the "Queen of Yantras," is a 2,000-year-old sacred geometric pattern consisting of nine interlocking triangles that surround a central point known as the <strong>Bindu</strong>. 
            </p>
            <p>
              It represents the divine union of the masculine (Shiva) and feminine (Shakti). When meditated upon, it is believed to harmonize the left and right hemispheres of the brain and align the seeker with the frequency of abundance.
            </p>
          </div>

          <div className={styles.geometryCard}>
            <h3>The Sacred Geometry</h3>
            <ul className={styles.featureList}>
              <li><strong>9 Triangles:</strong> Representing the layers of the cosmos.</li>
              <li><strong>4 upward triangles:</strong> Symbolic of Shiva (Masculine).</li>
              <li><strong>5 downward triangles:</strong> Symbolic of Shakti (Feminine).</li>
              <li><strong>43 small triangles:</strong> Created by the intersections, representing the complexity of creation.</li>
            </ul>
          </div>
        </section>

        {/* Mission Section */}
        <section className={styles.mission}>
          <h2>Our Mission</h2>
          <p>
            We bridge the gap between ancient Vedic science and modern lifestyle. Our platform provides the tools and community to help you integrate these sacred practices into your daily digital life, fostering peace in a fast-paced world.
          </p>
        </section>
      </main>
    </>
  );
}