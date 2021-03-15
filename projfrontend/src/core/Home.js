import React from 'react'
import "../styles.css"
import {API} from "../backend"
import Base from './Base'

export default function Home(){
    return(
        <Base title="HomePage">
            <h1 className="text-white">Hello World</h1>
            
        </Base>
    )
}