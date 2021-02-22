import React from 'react'
import { Route } from 'react-router-dom'
import { Container } from '../../globalStyles'
import {
    HeaderContainer,
    HeaderTitle,
    HeaderDescription,
    HeaderLink,
} from './header.elements'

const Header = ({headerTitle, headerDescription, headerLink, link}) => {
    return(
        <>
            <HeaderContainer>
                <HeaderTitle>{headerTitle}</HeaderTitle>
                <HeaderDescription>{headerDescription}</HeaderDescription>
                <a href={link}>
                    <HeaderLink>{headerLink}</HeaderLink>
                </a>
            </HeaderContainer>
        </>
    )
}   

export default Header;