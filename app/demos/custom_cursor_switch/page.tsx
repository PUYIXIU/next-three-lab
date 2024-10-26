"use client"

import dynamic from "next/dynamic";

const CustomCursorSwitchComp = dynamic(
    ()=>import('@/component/Demos/CustomCursorSwitch/index'),
    {ssr:false}
    )

export default function CustomCursorSwitchPage(){
    return (
        <CustomCursorSwitchComp/>
    )
}
