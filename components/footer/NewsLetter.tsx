import styles from './styles.module.scss';
import Link from "next/link";

export default function NewsLetter() {
  return (
    <div className={styles.footer__newsletter}>
        <h3>SIGN UP FOR OUR NEWSLETTER</h3>
        <div className={styles.footer__flex}>
            <input type="text" name="" placeholder='Your Email Address' id="" />
            <button className={styles.btn_primary}>
                SUBSCRIBE
            </button>
        </div>
        <p>
            By Clicking the SUBSCRIBE Button,you are agreeing to
            <Link href="">Privacy & Policy</Link>
        </p>
    </div>
  )
}
