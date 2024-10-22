"use client"

import dynamic from "next/dynamic";
const CustomDotCursorComp = dynamic(
    ()=>import('@/component/Demos/CustomDotCursor'),
{ssr: false}
)

export default function CustomDotCursorPage(){
    return (
        <CustomDotCursorComp/>
    )
}
