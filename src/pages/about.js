import React from 'react'
import { Header, About, Footer } from '../components/index'; 
import {stringHeaderAbout} from '../data/data'

const Main = () => {
    return(
        <>
            <Header link={stringHeaderAbout.link} headerTitle = {stringHeaderAbout.headTitle} headerDescription ={stringHeaderAbout.headDesc} headerLink={stringHeaderAbout.headLink}/>
            <About/>
            <Footer/>
        </>
    )
}

export default Main;