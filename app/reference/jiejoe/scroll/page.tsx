"use client"

import dynamic from 'next/dynamic'

const JIEJOEScrollComp = dynamic(
    ()=>import('@/component/Reference/JIEJOE/Scroll'),
    {ssr:false}
)

export default function JIEJOEScrollPage(){
    return (
        <JIEJOEScrollComp/>
    )
}
