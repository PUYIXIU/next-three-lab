"use client"
/**
 * https://www.bilibili.com/list/3546390319860710?tid=0&sort_field=pubtime&spm_id_from=333.999.0.0&oid=875675263&bvid=BV1LN4y1D7aC
 *
 * 实现故障的3个要素：
 * 1. 颜色分离
 * 2. 图像抖动
 * 3. 错位图块
 * 4. 多个实现上述效果的节点相互重叠
 *
 */
import './glitch.scss'
import {useEffect} from "react";

const faultText:{
    player:any,
    texts:Element[],
    init:any,
    fault:any
} = {
    player:{},
    texts:[],
    init(){
        this.texts = Array.from(document.getElementsByClassName('faulttext'))
    },
    fault(){
        setTimeout(()=>{
            clearInterval(this.player)
            this.texts.forEach((text:any)=>{
                text.style.transform = ''
                text.style.clipPath = ''
            })
        }, 1000)
        this.player = setInterval(()=>{
            this.texts.forEach((text:any)=>{
                text.classList.add('faulttext_fault')
                text.style.transform = `translate(${30*(0.5 - Math.random())}%,${30*(0.5-Math.random())}%)`
                const left = Math.random() * 100
                const top = Math.random() * 100
                const right = left + 50 * Math.random() + 10
                const bottom = top + 40 * Math.random() + 10
                text.style.clipPath = `polygon(${left}% ${top}%, ${right}% ${top}%, ${right}% ${bottom}%, ${left}% ${bottom}%)`
            })
        },30)
    }
}

export default function JIEJOEGlitchText(){
    useEffect(() => {
        faultText.init()
    }, []);
    return (
        <div className='wrapper'>
            <div className="container" onClick={()=>{
                faultText.fault()
            }}>
                <p className='faulttext'>CONTEXT</p>
                <p className='faulttext'>CONTEXT</p>
                <p className='faulttext'>CONTEXT</p>
            </div>
        </div>
    )
}
