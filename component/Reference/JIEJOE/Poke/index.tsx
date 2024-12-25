"use client"
/**
 * 原教程：
 * https://www.bilibili.com/list/3546390319860710?tid=0&sort_field=pubtime&spm_id_from=333.999.0.0&oid=832508980&bvid=BV1W34y1u7Rf
 */
import styles from './poke.module.scss';
import {useEffect} from "react";

import post1 from './imgs/1.webp'
import post2 from './imgs/2.webp'
import post3 from './imgs/3.webp'
import post4 from './imgs/4.webp'
import post5 from './imgs/5.webp'
import post6 from './imgs/6.webp'
import post7 from './imgs/7.webp'
import post8 from './imgs/8.webp'
import post9 from './imgs/9.webp'
const imgs = [
    post1.src,
    post2.src,
    post3.src,
    post4.src,
    post5.src,
    post6.src,
    post7.src,
    post8.src,
    post9.src,
]

let curImgIndex = 0
const picDoms:any = []
const transformList = [
    'rotate(-10deg)',
    'rotate(-6deg) translate(35%, -12%)',
    'rotate(-2deg) translate(65%, -19%)',
    'rotate(2deg) translate(95%, -26%)',
    'rotate(6deg) translate(125%, -23%)',
]

export default function JIEJOEPoke(){

    useEffect(() => {
        const doms = document.getElementsByClassName('poker-switch')
        for(let i = 0;i < doms.length; i++){
            picDoms.push({
                num:i ,
                node:doms[i]
            })
        }
        curImgIndex = doms.length - 1
    }, []);

    const switchPoker = ()=>{
        picDoms.forEach((item:any)=>{
            if(item.num == 4){
                item.num = 0
                curImgIndex = (curImgIndex + 1)% imgs.length
                item.node.children[0].src = imgs[curImgIndex]
                item.node.style.transition = '0s'
            }else{
                item.num ++
                item.node.style.transition = '0.3s ease transform';
            }
            item.node.style.zIndex = item.num
            item.node.style.transform = transformList[item.num]
        })
    }
    return (
        <div className={styles['wrapper']}>
            <div className={styles['container']}>
                { new Array(5).fill(0).map((item, index)=>{
                    return (
                            <div className={`poker-switch ${styles['poker']} ${styles['poker'+ (index + 1)]}`} key={index}>
                                <img src={imgs[index]} alt=""/>
                            </div>
                        )
                  })
                }
                <div className={`${styles['poker-top']} ${styles['poker5']}`} onClick={()=>switchPoker()}>
                    <h1>NEXT</h1>
                </div>
            </div>
        </div>
    )
}
