import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import Layout from "@/components/Layout";
import {Toaster} from "react-hot-toast";

export default function App({Component, pageProps}: AppProps) {
  return (
      <>
        <div>
          <Toaster
              position="top-right"
              reverseOrder={false}
          />
        </div>
        <Layout>

          <Component {...pageProps} />
        </Layout>
      </>
  )
}
