import React from 'react'
import { Container } from '../../globalStyles'
import { 
    BodyContainer,
    BodyTitle,
    BodyDesc,
    BodyForm,
    BodyInput,
    BodyTextArea,
    BodyButton
} from './body.elements'

const Body = () => {

    const clickHandler = () => {
        alert("hello!")
    }

    return(
        <>  
            <BodyContainer>
                <BodyTitle>Silakan upload screenshot SIAKNG-mu di bawah ini.</BodyTitle>
                <BodyDesc>Format file berupa .jpg atau .png.</BodyDesc>
                <BodyForm >
                    <BodyInput type="file" id="myFile" name="filename"/>
                    <BodyInput type="submit" onClick={() => clickHandler()}/>
                </BodyForm>
                <BodyDesc>File JSON ada pada Text Area berikut ini</BodyDesc>
                <BodyTextArea  id="JSONArea" name="w3review" rows="20" cols="50" defaultValue="Empty...">
                </BodyTextArea>
                <BodyDesc>Klik tombol di bawah untuk mendownload file .ICS</BodyDesc>
                <BodyButton>Download</BodyButton>
            </BodyContainer>

        </>
    )
}   

export default Body;