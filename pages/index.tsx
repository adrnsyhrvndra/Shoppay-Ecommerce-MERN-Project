import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss';
import Header from '@/components/header';
import Footer from '@/components/footer';
import axios from 'axios';
import { useSession, signIn, signOut } from "next-auth/react";

const inter = Inter({ subsets: ['latin'] })

export default function Home({country}) {

  const { data: session } = useSession();
  console.log(session);

  return (
    <div>
      <Header country={country}/>
      {
        session ? "You Are Logged In" : "You Are Not Logged In"
      }
      <Footer country={country}/>
    </div>
  );
}

export async function getServerSideProps(){

  // Panggil API Ipregistry Location
  let data = await axios
  .get('https://api.ipregistry.co/66.165.2.7?key=rpoc55n1ahym3hro')
  .then((res) => {
    return res.data.location.country;
  })
  .catch((err) => {
    console.log(err);
  });
  
  return{
    props:{
      country:{
        name:data.name,
        flag:data.flag.emojitwo
      }
    }
  }
  
}