import React from 'react'
import { Container } from '../../globalStyles'
import {
    HeaderContainer,
    HeaderTitle,
    HeaderDescription,
} from './header.elements'

const Header = () => {
    return(
        <>
            <HeaderContainer>
                <HeaderTitle>SIAK Jadwal Generator</HeaderTitle>
                <HeaderDescription>Website ini akan mengubah SS SIAKNG menajadi JSON dan .ICS file.</HeaderDescription>
            </HeaderContainer>
        </>
    )
}   

export default Header;