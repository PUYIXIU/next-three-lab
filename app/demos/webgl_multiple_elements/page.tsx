"use client"
import dynamic from "next/dynamic";

const WebGlMultipleElementsComp = dynamic(
    ()=> import ("@/component/Demos/WebglMultipleElements"),
    {ssr: false}
)

export default function WebGlMultipleElementsPage() {
    return <>
        <title>材质比较表</title>
        <WebGlMultipleElementsComp/>
    </>
}
