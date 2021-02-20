import React, { useState, useEffect } from 'react'
import { 
    BodyContainer,
    BodyTitle,
    BodyDesc,
    BodyForm,
    BodyInput,
    BodyTextArea,
    BodyButton
} from './body.elements'
import axios from 'axios';
import loadingGif from '../../images/spinner.gif';

const preset = 'uaq9suqt';
const url = 'https://api.cloudinary.com/v1_1/dxsh8co1d/image/upload';


const Body = () => {


    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const onChange = e => {
        setImage(e.target.files[0]);
    };

    const onSubmit = async () => {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', preset);
        try {
          setLoading(true);
          const res = await axios.post(url, formData);
          const imageUrl = res.data.secure_url;
          const image = await axios.post('http://localhost:3000/api/upload', {
            imageUrl
          });
          setLoading(false);
          setImage(image.data);
        } catch (err) {
          console.error(err);
        }
    };

    useEffect(() => {
        async function fetchImage() {
          const image = await axios.get('http://localhost:3000/api/getLatest');
          setImage(image.data);
        }
        fetchImage();
        // eslint-disable-next-line
    }, []);


    return(
        <>  
            {/* <BodyContainer>
                <BodyTitle>Silakan upload screenshot SIAKNG-mu di bawah ini.</BodyTitle>
                <BodyDesc>Format file berupa .jpg atau .png.</BodyDesc>
                <BodyForm>
                    <BodyInput type="file"name="image"onChange={onChange}/>
                    <button onClick={onSubmit} className='btn center'>
                    upload
                    </button>
                </BodyForm>
                <BodyDesc>File JSON ada pada Text Area berikut ini</BodyDesc>
                <BodyTextArea  id="JSONArea" name="w3review" rows="20" cols="50" defaultValue="Empty...">
                </BodyTextArea>
                <BodyDesc>Klik tombol di bawah untuk mendownload file .ICS</BodyDesc>
                <BodyButton>Download</BodyButton>
            </BodyContainer> */}

            <BodyContainer>
            <BodyTitle>Silakan upload screenshot SIAKNG-mu di bawah ini.</BodyTitle>
            <BodyDesc>Format file berupa .jpg atau .png.</BodyDesc>
            <BodyForm>
                    <BodyInput type='file' name='image' onChange={onChange} />
                    <BodyButton onClick={onSubmit} >Upload</BodyButton>
            </BodyForm>
            </BodyContainer>
        </>
    )}   

export default Body;