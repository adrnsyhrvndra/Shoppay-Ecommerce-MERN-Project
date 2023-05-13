import styles from "./styles.module.scss";
import { MdSecurity } from 'react-icons/md';
import { BsSuitHeart } from 'react-icons/bs';
import { RiAccountPinCircleLine,RiArrowDropDownFill } from 'react-icons/ri';
import Link from "next/link";
import { useState } from "react";
import UserMenu from "./UserMenu";
import { useSession } from "next-auth/react";

// export default function Top({country}) {
export default function Top() {

  const { data: session } = useSession();
  const [visible,setVisible] = useState(false);

  return (
    <div className={styles.top}>
      <div className={styles.top_container}>
        <div></div>
        <ul className={styles.top_list}>
          {/* <li className={styles.li}>
            <img
              src={country.flag}
            />
            <span>{country.name}</span>
          </li> */}
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
            session ? (
              <li className={styles.li}>
            <div className={styles.flex}>
              <img src={session.user.image}/>
              <span>{session.user.name}</span>
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
          {visible && <UserMenu session={session} />}
          </li>
        </ul>
      </div>
    </div>
  )
}
