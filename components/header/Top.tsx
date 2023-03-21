import styles from "./styles.module.scss";
import { MdSecurity } from 'react-icons/md';
import { BsSuitHeart } from 'react-icons/bs';
import { RiAccountPinCircleLine,RiArrowDropDownFill } from 'react-icons/ri';
import Link from "next/link";
import { useState } from "react";
import UserMenu from "./UserMenu";

export default function Top() {

  const [loggedIn,setLoggedIn] = useState(true);
  const [visible,setVisible] = useState(false);

  return (
    <div className={styles.top}>
      <div className={styles.top_container}>
        <div></div>
        <ul className={styles.top_list}>
          <li className={styles.li}>
            <img
              src="https://www.seekpng.com/png/detail/154-1542644_small-25mm-lapel-pin-button-badge-novelty-indonesia.png" alt="Small 25mm Lapel Pin Button Badge Novelty Indonesia - Indonesia Flag Icon Vector@seekpng.com"
            />
            <span>Indonesian</span>
          </li>
          <li className={styles.li}>
            <MdSecurity />
            <span>Buyer Protection</span>
          </li>
          <li className={styles.li}><span>Customer Service</span></li>
          <li className={styles.li}><span>Help</span></li>
          <li className={styles.li}>
            <BsSuitHeart/>
            <Link href="/profile/wishlist">
              <span>Wishlist</span>
            </Link>
          </li>
          <li 
            onMouseOver={() => setVisible(true)} 
            onMouseLeave={() => setVisible(false)} 
            className={styles.li}
          >
          {
            loggedIn ? (
              <li className={styles.li}>
            <div className={styles.flex}>
              <img src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"/>
              <span>Adriansyah</span>
            </div>
          </li>
            ) : (
              <li className={styles.li}>
            <div className={styles.flex}>
              <RiAccountPinCircleLine/>
              <span>Account</span>
              <RiArrowDropDownFill/>
            </div>
          </li>
            )
          }
          {visible && <UserMenu loggedIn={loggedIn} />}
          </li>
        </ul>
      </div>
    </div>
  )
}
