"use client"
import dynamic from 'next/dynamic';

const JIEJOEPoke = dynamic(
    ()=>import('@/component/Reference/JIEJOE/Poke'),
    {ssr:false}
)

export default function JIEJOEPokePage(){
    return (
        <JIEJOEPoke/>
    )
}
