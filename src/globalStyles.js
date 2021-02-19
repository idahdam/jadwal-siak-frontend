import styled, { createGlobalStyle } from 'styled-components'


export const globalStyle = createGlobalStyle`
* {
    font-family: 'Playfair Display', serif;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
`

export const Button = styled.button`

`

export const Container = styled.div`
    z-index: 1;
    width: 100%;
    max-width: 1300px;
    margin-right: auto;
    margin-left: auto;
    padding-right: 50px;
    padding-left: 50px;
`


