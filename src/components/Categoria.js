import React, { useEffect } from 'react'

const banners = {
    "narbut": "linear-gradient(217deg, #cd9059, #69a 70.71%)",
    "longboard": "linear-gradient(217deg, #cd9059, #80c8bb 70.71%)",
    "bicycle": "linear-gradient(217deg, #69a, #efd199 70.71%)"
}

export default function Categoria() {
    let categName = window.location.hash.split("#categ/")[1]

    useEffect(() => { window.scroll(0, 0) }, [])

    const categ = (
<div className="categ">
    <div className="categ_banner" style={{background: banners[categName]}}>
        {categName === "longboard" &&
        <svg>
            <ellipse cx="40vw" cy="50%" rx="50%" ry="10vw" fill="#0002"></ellipse>
            <circle cx="75vw" cy="10vw" r="5vw" fill="#f87516"></circle>
        </svg>}
        {categName === "bicycle" &&
        <svg>
            <circle cx="40vw" cy="50%" r="50%" fill="#0002"></circle>
            <circle cx="75vw" cy="10vw" r="10vw" fill="#fff2"></circle>
        </svg>}
        <h1>
            {categName === "narbut" && "Нарбут"}
            {categName === "longboard" && "Лонгборды"}
            {categName === "bicycle" && "Велосипеды"}
        </h1>
    </div>
</div>
    )
    return categ
}
