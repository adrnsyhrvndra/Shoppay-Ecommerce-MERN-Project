import Link from "next/dist/client/link";
import styles from "./styles.module.scss";

export default function UserMenu({loggedIn}) {
    return (
        <div className={styles.menu}>
            <h4>Welcome To Shoppay</h4>
            {loggedIn ? (
                <div className={styles.flex}>
                    <img 
                        src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"
                        className={styles.menu_img}
                    />
                    <div className={styles.col}>
                        <span>Welcome Back</span>
                        <h3>Adriansyah</h3>
                        <span>Sign Out</span>
                    </div>
                </div>
            ) : (

                <div className={styles.flex}>
                    <button className={styles.btn_primary}>Register</button>
                    <button className={styles.btn_outlined}>Login</button>
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
