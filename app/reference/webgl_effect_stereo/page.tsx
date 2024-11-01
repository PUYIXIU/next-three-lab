"use client"
import dynamic from "next/dynamic";

const WebglEffectStereoComp = dynamic(
    ()=>import("@/component/Reference/WebglEffectStereo"),
    {ssr: false}
)

export default function WebglEffectStereoPage(){
    return (
        <WebglEffectStereoComp/>
    )
}
