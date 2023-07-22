import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Navigation } from 'swiper';

import Countdown from "../../countdown";
import { MdFlashOn } from "react-icons/md";
import styles from "./styles.module.scss";

import { flashDealsArray } from "../../../data/home";
import Link from 'next/link';
import FlashCard from './Card';

export default function FlashDeals() {
    return (
        <div className={styles.flashDeals}>
            <div className={styles.flashDeals__header}>
                <h1>
                    Flash Sale
                    <MdFlashOn />
                </h1>
                <Countdown date={new Date(2023,8,8)}/>
            </div>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                modules={[Navigation]}
                className="flashDeals_swiper"
                breakpoints={{
                    450: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    630: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    920: {
                        slidesPerView: 4,
                        spaceBetween: 40
                    },
                    1232: {
                        slidesPerView: 4,
                        spaceBetween: 40
                    },
                    1600: {
                        slidesPerView: 5,
                        spaceBetween: 40
                    }
                }}
            >
                <div className={styles.flashDeals_list}>
                    {flashDealsArray.map((product, i) => (
                        <SwiperSlide>
                            <FlashCard product={product} key={i} />
                        </SwiperSlide>
                    ))}
                </div>
            </Swiper>
        </div>
    )
}
