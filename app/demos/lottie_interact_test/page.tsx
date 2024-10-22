"use client"
import dynamic from "next/dynamic";
const LottieInteractTestComp = dynamic(
    ()=>import('@/component/Demos/LottieInteractTest'),
    {ssr: false}
)
export default function LottieInteractTestPage(){
    return <>
        <LottieInteractTestComp/>
    </>
}
