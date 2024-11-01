"use client"

import dynamic from "next/dynamic";

const HomeBox = dynamic(
    ()=>import('@/component/HomeBox'),
    {ssr:false})

export default function Home() {

  return (
      <>
          <title>Next Three Lab</title>
          <HomeBox/>
      </>
  );
}
