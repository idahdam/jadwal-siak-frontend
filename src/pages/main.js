import React from 'react'
import { Header, Body, Footer } from '../components/index'; 
import {stringHeaderMain} from '../data/data'


const Main = () => {
    return(
        <>
            <Header link = {stringHeaderMain.link} headerTitle = {stringHeaderMain.headTitle} headerDescription ={stringHeaderMain.headDesc} headerLink={stringHeaderMain.headLink}/>
            <Body/>
            <Footer/>
        </>
    )
}

export default Main;