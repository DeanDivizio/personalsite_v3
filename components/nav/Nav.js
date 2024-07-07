"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./nav.module.css";
import { getBlogPageContent } from "@/actions/WordPress"


export default function Nav() {
    const router = useRouter();
    const handlePrefetch = () => {
        getBlogPageContent();
    }
    const handleClick = (slug) => {
        router.push(slug);
    }

    return(
        <div className={styles.container}>
            <div className={styles.portfolioSection}>
                <p style={{fontWeight: '400'}}>My Work:</p>
                <Link href={'/websites'}><p>Design & Development</p></Link>
                <Link href={'/media'}><p>Media Production</p></Link>
            </div>
            <div className={styles.blogSection}>
                <button onMouseDown={()=>{handlePrefetch}} onClick={()=>{handleClick}} href='/blog'><p>Blog</p></button>
            </div>
        </div>
    )
}