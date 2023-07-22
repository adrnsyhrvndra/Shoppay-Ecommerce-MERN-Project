import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss';
import Header from '@/components/header';
import Footer from '@/components/footer';
import axios from 'axios';
import { useSession, signIn, signOut } from "next-auth/react";
import Main from '@/components/home/main';
import FlashDeals from '@/components/home/flashDeals';

const inter = Inter({ subsets: ['latin'] })

// export default function Home({country}) {

export default function Home({country}) {

  const { data: session } = useSession();
  console.log(session);

  return (
    <>
      {/* <Header country={country}/> */}
      <Header country={country}/>
      {/* {
        session ? "You Are Logged In" : "You Are Not Logged In"
      } */}
      <div className={styles.home}>
        <div className={styles.container}>
          <Main/>
          <FlashDeals/>
        </div>
      </div>
      <Footer country={country}/>
      {/* <Footer country={country}/> */}
    </>
  );
}

// export async function getServerSideProps(){

//   // Panggil API Ipregistry Location
//   let data = await axios
//   .get('https://api.ipregistry.co/66.165.2.7?key=rpoc55n1ahym3hro')
//   .then((res) => {
//     return res.data.location.country;
//   })
//   .catch((err) => {
//     console.log(err);
//   });
  
//   return{
//     props:{
//       country:{
//         name:data.name,
//         flag:data.flag.emojitwo
//       }
//     }
//   }
  
// }