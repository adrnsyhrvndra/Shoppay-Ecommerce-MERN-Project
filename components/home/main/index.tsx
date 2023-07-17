import styles from "./styles.module.scss";
import MainSwiper from "./swiper";
import Offers from "./offers";
import { useSession } from "next-auth/react";
import Link from "next/link";
//-----------------------------
import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

export default function Main() {
    return (
        <div className={styles.main}>
            <div className={styles.header}>Header</div>
            <div className={styles.menu}>Menu</div>
            <MainSwiper />
            <Offers />
            <div className={styles.user}>User</div>
        </div>
    );
}
