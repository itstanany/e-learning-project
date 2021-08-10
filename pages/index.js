import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div style={{ width: '100%', margin: '0 auto', padding: '50px' }}>
      Home page container
      <br />
      <Link href="/signin">
        <a>
          Signin
        </a>
      </Link>
    </div>)
}
