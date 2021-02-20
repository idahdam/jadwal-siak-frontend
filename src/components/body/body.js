import React, { useState, useEffect } from 'react'
import { 
    BodyContainer,
    BodyTitle,
    BodyDesc,
    BodyForm,
    BodyInput,
    BodyImage,
    BodyTextArea,
    BodyButton
} from './body.elements'
import Tesseract from 'tesseract.js';
import axios from 'axios';
import Swal from 'sweetalert2';

const {REACT_APP_PRESET_NAME, REACT_APP_CLOUD_URL} = process.env;
const preset = REACT_APP_PRESET_NAME;
const url =  REACT_APP_CLOUD_URL;

const Body = () => {
  
    const [image, setImage] = useState('');
    const [text, setText] = useState('');

    const setTextArea = (text) => {
      setText(text)
    }

    const onChange = e => {
        setImage(e.target.files[0]);
    };

    const alertPeep = () => {
      alert('on build.')
    }

    const checkSize = (link) => {
      const img = new Image();
      img.src = link;
      img.onload = function() {
        // alert(this.width + 'x' + this.height);
        console.log(this.width, this.height)
      }
    }

    const OCR = (imageUrl) => {
      Tesseract.recognize(
        imageUrl,
        'eng',
        { logger: m => console.log(m) }
      ).then(({ data: { text } }) => {
        // console.log(text);
        setText(text)
      })
    }

    const onSubmit = async () => {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', preset);
        try {
          const res = await axios.post(url, formData);
          const imageUrl = res.data.secure_url;
          const image = await axios.post(`http://localhost:3000/api/upload`, {
            imageUrl
          }).then(Swal.fire({
            icon: 'success',
            title: 'File sudah ter-upload!',
            showConfirmButton: false,
            timer: 1500
        }), checkSize(imageUrl)).then(OCR(imageUrl)).then((text) => setText(text))

          setImage(image.data);
          // console.log(image.data)

        } catch (err) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Apa kamu sudah memilih file gambar? (.png/.jpg)?',
              footer: '<a href>Why do I have this issue?</a>'
            })
        }
    };

    // split
    // const split_4 = (imageUrl) => {
    //   img.src=imageUrl;
    //   var canvas = document.createElement('canvas'),
    //   ctx = canvas.getContext('2d'),
    //   parts = [],
    //   img = new Image();
  
    //   img.onload = split_4;

    //   var w2 = img.width / 2,
    //       h2 = img.height / 2;

    //   for(var i=0; i<4; i++) {
    //     var x = (-w2*i) % (w2*2),
    //         y = (h2*i)<=h2? 0 : -h2 ;

    //     canvas.width = w2;
    //     canvas.height = h2;

    //     ctx.drawImage(this, x, y, w2*2, h2*2);

    //     parts.push( canvas.toDataURL() );

    //     // for test div
    //     var slicedImage = document.createElement('img')
    //     slicedImage.src = parts[i];
    //     var div = document.getElementById('test');
    //     div.appendChild( slicedImage );

    //   }

    //     console.log( parts );

    //   }

      
    // function to view the latest with GET req.
    // useEffect(() => {
    //     try{
    //       async function fetchImage() {
    //         // const image = await axios.get(`http://localhost:3000/api/getLatest`);
    //         const image = await image
    //         setImage(image.data);
    //         console.log(image.data)
    //       }
    //       fetchImage();
    //     }
    //     catch(e){
    //       setImage(`https://miro.medium.com/max/534/1*wUOrpv-selJOytCkslSIhg.png`)
    //     }
    // }, []);

    return(
        <>  
            <BodyContainer>
            <BodyTitle>Silakan upload screenshot SIAKNG-mu di bawah ini.</BodyTitle>
            <BodyDesc>Format file berupa .jpg atau .png.</BodyDesc>
            <BodyForm>
                    <BodyInput type='file' name='image' onChange={onChange} />
                    <BodyButton onClick={onSubmit} >Upload</BodyButton>
            </BodyForm>
                    <BodyDesc>Berikut jadwal yang kamu upload: </BodyDesc>
                    <BodyImage src={image} alt="Jika kamu melihat ini, kamu belum mengupload atau gagal."/>
                    <BodyDesc>Berikut versi JSON:</BodyDesc>
                    <BodyTextArea placeholder="Text area ini bisa di-stretch." value={text} onChange={() => setTextArea(text)}></BodyTextArea>
                    <BodyDesc>Klik tombol di bawah untuk mendownload versi .ICS:</BodyDesc>
                    <BodyButton onClick={alertPeep} >Download</BodyButton>
            </BodyContainer>
        </>
    )}   

export default Body;