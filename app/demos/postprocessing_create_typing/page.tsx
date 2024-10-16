"use client"
import dynamic from "next/dynamic";

const PostprocessingCreateTypingComp = dynamic(
    ()=> import ("@/component/Demos/PostprocessingCreateTyping"),
    {ssr: false}
)

export default function PostprocessingCreateTypingPage() {
    return <>
        <PostprocessingCreateTypingComp/>
    </>
}
