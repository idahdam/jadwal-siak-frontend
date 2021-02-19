import React from 'react'
import { Header, Footer } from '../components/index'; 
import { Container } from '../globalStyles';

const Page404 = () => {
    return(
        <>
            <Header/>
            <Container>
                404 Not Found.
            </Container>
            <Footer/>
        </>
    )
}

export default Page404;