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

const {REACT_APP_PRESET_NAME, REACT_APP_CLOUD_URL, REACT_APP_LOCAL_API} = process.env;
const preset = REACT_APP_PRESET_NAME;
const url =  REACT_APP_CLOUD_URL;


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
          const image = await axios.post('http://${REACT_APP_LOCAL_API}/upload', {
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
          const image = await axios.get('http://${REACT_APP_LOCAL_API}/getLatest');
          setImage(image.data);
        }
        fetchImage();
    }, []);


    return(
        <>  
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