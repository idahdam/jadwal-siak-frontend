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
                <HeaderTitle>Jadwal SIAKNG Generator</HeaderTitle>
                <HeaderDescription>Website ini akan mengubah SS SIAKNG menjadi JSON dan .ICS file.</HeaderDescription>
            </HeaderContainer>
        </>
    )
}   

export default Header;