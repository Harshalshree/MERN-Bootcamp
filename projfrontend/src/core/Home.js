import React from 'react'
import "../styles.css"
import {API} from "../backend"

export default function Home(){
    return(
        <div>
            <h1 className="text-white">Hello {API}</h1>
        </div>
    )
}