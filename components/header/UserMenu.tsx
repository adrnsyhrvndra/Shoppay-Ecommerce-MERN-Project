import Link from "next/dist/client/link";
import styles from "./styles.module.scss";
import {signOut,signIn} from "next-auth/react";

export default function UserMenu({session}) {
    return (
        <div className={styles.menu}>
            <h4>Welcome To Shoppay</h4>
            {session ? (
                <div className={styles.flex}>
                    <img 
                        src={session.user.image}
                        className={styles.menu_img}
                    />
                    <div className={styles.col}>
                        <span>Welcome Back</span>
                        <h3>{session.user.name}</h3>
                        <span onClick={() => signOut()}>Sign Out</span>
                    </div>
                </div>
            ) : (

                <div className={styles.flex}>
                    <button className={styles.btn_primary}>Register</button>
                    <button onClick={() => signIn()} className={styles.btn_outlined}>Login</button>
                </div>

            )}
            <ul>
                <li>
                    <Link href="/profile">Account</Link>
                </li>
                <li>
                    <Link href="/profile/orders">My Orders</Link>
                </li>
                <li>
                    <Link href="/profile/mesaages">Message Center</Link>
                </li>
                <li>
                    <Link href="/profile/addres">Address</Link>
                </li>
                <li>
                    <Link href="/profile/mesaages">Message Center</Link>
                </li>
                <li>
                    <Link href="/profile/wishlist">Wishlist</Link>
                </li>
            </ul>
        </div>
    )
}
