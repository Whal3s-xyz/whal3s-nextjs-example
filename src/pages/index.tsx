import Head from 'next/head'
import dynamic from "next/dynamic";
import Button from "@/components/Button";
import React from "react";

const DynamicLogin = dynamic(() => import('@/components/Login'), {
  ssr: false,
  loading: () => <Button
      isLoading={true}
      className=""
      onClick={() => {
      }}
  >Initializing</Button>,
})

export default function Home() {
  return (
      <>
        <Head>
          <title>Next.js x Whal3s</title>
          <meta name="description" content="Next.js token gating with Whal3s" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main >
          <DynamicLogin/>
        </main>
      </>
  )
}
