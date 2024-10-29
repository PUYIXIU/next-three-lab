"use client"
import dynamic from "next/dynamic";

const CurzrCursorComp = dynamic(
    ()=>import("@/component/Reference/CurzrCursor"),
    {ssr: false}
)

export default function CurzrCursorPage(){
    return (
        <CurzrCursorComp/>
    )
}
