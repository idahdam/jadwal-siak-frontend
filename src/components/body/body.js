import React, { useState, useEffect } from 'react'
import { 
    BodyContainer,
    BodyTitle,
    BodyDesc,
    BodyForm,
    BodyInput,
    BodyImage,
    BodyTextArea,
    BodyButton,
    BodyFormButton
} from './body.elements'
import Tesseract from 'tesseract.js';
import axios from 'axios';
import Swal from 'sweetalert2';

const {REACT_APP_PRESET_NAME, REACT_APP_CLOUD_URL} = process.env;
const preset = REACT_APP_PRESET_NAME;
const url =  REACT_APP_CLOUD_URL;

const Body = () => {
    const dayArray = ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu"]
    const [image, setImage] = useState('');
    const [text, setText] = useState('');
    const [button, setButton] = useState({
      senin: false,
      selasa: false,
      rabu: false,
      kamis: false,
      jumat: false,
      sabtu: false
    })
    const [imagePos, setImagePos] = useState({
      top: 0,
      left: 0,
      width: 0,
      height: 0
    })
    const [imageRes, setImageRes] = useState({
      width: 0,
      height: 0,
    })

    const setButtonhandler = (button, day) => {
      button[day] = !button[day]
      console.log(button)
    }

    const setImagePostHandler = () => {
      
    }
    
    const setImageResHandler = (a, b) => {
      imageRes['width'] = a
      imageRes['height'] = b
      // console.log(imageRes)
      if(imageRes['width'] <= 1366 && imageRes['width'] >= 1200){
        setImagePos({
          top: 0,
          left: 0,
          width: 0,
          height: 0
        })
      }
      else if(imageRes['width'] < 1920 && imageRes['width'] >= 1440){
        console.log('full hd')
        setImagePos({
          top: 0,
          left: 0,
          width: 0,
          height: 0
        })
      }
    }

    const checkSize = (link) => {
      const img = new Image();
      img.src = link;
      img.onload = function() {
        // alert(this.width + 'x' + this.height);
        console.log(this.width, this.height)
        setImageResHandler(this.width, this.height)
      }
    }


    const setTextArea = (text) => {
      setText(text)
    }

    const onChange = e => {
        setImage(e.target.files[0]);
    };

    const alertPeep = () => {
      alert('on build.')
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
          const imageUrl = await res.data.secure_url;
          const image = await axios.post(`http://localhost:3000/api/upload`, {
            imageUrl
          })
          .then(Swal.fire({
            icon: 'success',
            title: 'File sudah ter-upload!',
            showConfirmButton: false,
            timer: 1500
          }))
          .then(checkSize(imageUrl))
          // .then(OCR(imageUrl))
          // .then((text) => setText(text))
          setImage(image.data)
          // console.log(image.data)

        } catch (err) {
          // console.log(err)
            Swal.fire({
              icon: 'error',
              title: err,
              text: 'Apa kamu sudah memilih file gambar? (.png/.jpg)?',
              footer: '<a href>Why do I have this issue?</a>'
            })
        }
    };
    
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
              <BodyTitle>Kamu seharian tidak ada matkul di hari apa?</BodyTitle>
              <BodyFormButton>
                  <input type="checkbox" id="Senin" name="Senin" value="Senin" onChange={() => setButtonhandler(button, 'senin')}/>
                  <label htmlFor="vehicle1"> Senin</label><br/>
                  <input type="checkbox" id="Selasa" name="Selasa" value="Selasa" onChange={() => setButtonhandler(button, 'selasa')}/>
                  <label htmlFor="vehicle2"> Selasa</label><br/>
                  <input type="checkbox" id="Rabu" name="Rabu" value="Rabu" onChange={() => setButtonhandler(button, 'rabu')}/>
                  <label htmlFor="vehicle3"> Rabu</label><br/>
                  <input type="checkbox" id="Kamis" name="Kamis" value="Kamis" onChange={() => setButtonhandler(button, 'kamis')}/>
                  <label htmlFor="vehicle3"> Kamis</label><br/>
                  <input type="checkbox" id="Jumat" name="Jumat" value="Jumat" onChange={() => setButtonhandler(button, 'jumat')}/>
                  <label htmlFor="vehicle3"> Jumat</label><br/>
                  <input type="checkbox" id="Sabtu" name="Sabtu" value="Sabtu" onChange={() => setButtonhandler(button, 'sabtu')}/>
                  <label htmlFor="vehicle3"> Sabtu</label><br/>
                  {/* <BodyButton onClick={onSubmit} >Upload</BodyButton> */}
              </BodyFormButton>
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