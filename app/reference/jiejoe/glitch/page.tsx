"use client"
import dynamic from 'next/dynamic';

const JIEJOEGlitchText = dynamic(
    ()=>import('@/component/Reference/JIEJOE/Glitch'),
    {ssr:false}
)

export default function JIEJOEGlitchPage(){
    return (
        <JIEJOEGlitchText/>
    )
}
