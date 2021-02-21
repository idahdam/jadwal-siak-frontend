import React, { useState, useCallback } from 'react'
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
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import Swal from 'sweetalert2';
import { createWorker } from 'tesseract.js';
import {
  setButtonhandler,
} from './logic'

const {REACT_APP_PRESET_NAME, REACT_APP_CLOUD_URL} = process.env;
const preset = REACT_APP_PRESET_NAME;
const url =  REACT_APP_CLOUD_URL;

const Body = () => {
    const dayArray = ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu"]
    const [crop, setCrop] = useState({ unit: '%', width: 30 });
    const [completedCrop, setCompletedCrop] = useState(null);
    const [image, setImage] = useState(null);
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

    const handleImageLoaded = (image) => {
      // console.log(image)
    } 

    const handleOnCropChange = (crop) => {
      setCrop(crop)
      // console.log({crop: crop})
    }

    const handleOnCropComplete = (crop, pixelCrop) => {
      setCompletedCrop(crop)
      console.log(crop, pixelCrop)
    }
    
    const iterOCR = (imageUrl) => {
      var i = 0;
      // // for(i = 0; i<7; i++){
      //   if(button[dayArray[0]] === true){
      // console.log(button[dayArray[0]])

      const rectangle = { left: 0, top: 0, width: 265.375, height: 694 };

      const worker = createWorker({
        logger: m => console.log(m)
      });

      // replace rectangle with imagePos
      (async () => {
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text } } = await worker.recognize(imageUrl, {rectangle});
        console.log(imagePos)
        console.log(text);
        // setTextArea(text);
        await worker.terminate();
      })();
      imagePos["width"] += 40
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
          // .then(checkSize(imageUrl))
          .then(setImage(imageUrl))
          .then(iterOCR(imageUrl))
          .then(console.log(imageUrl))
          // .then((text) => setText(text))
          
          
        } catch (err) {
          Swal.fire({
            icon: 'error',
            title: err,
            text: 'Apa kamu sudah memilih file gambar? (.png/.jpg)?',
            footer: '<a href>Why do I have this issue?</a>'
          })
        } 
    };

    return(
        <>  
            <BodyContainer>
              <BodyTitle>Kamu seharian tidak ada matkul di hari apa?</BodyTitle>
              <BodyFormButton>
                  <input type="checkbox" id="Senin" name="Senin" value="Senin" onChange={() => setButtonhandler(button, 'senin')}/>
                  <label > Senin</label><br/>
                  <input type="checkbox" id="Selasa" name="Selasa" value="Selasa" onChange={() => setButtonhandler(button, 'selasa')}/>
                  <label > Selasa</label><br/>
                  <input type="checkbox" id="Rabu" name="Rabu" value="Rabu" onChange={() => setButtonhandler(button, 'rabu')}/>
                  <label > Rabu</label><br/>
                  <input type="checkbox" id="Kamis" name="Kamis" value="Kamis" onChange={() => setButtonhandler(button, 'kamis')}/>
                  <label > Kamis</label><br/>
                  <input type="checkbox" id="Jumat" name="Jumat" value="Jumat" onChange={() => setButtonhandler(button, 'jumat')}/>
                  <label > Jumat</label><br/>
                  <input type="checkbox" id="Sabtu" name="Sabtu" value="Sabtu" onChange={() => setButtonhandler(button, 'sabtu')}/>
                  <label > Sabtu</label><br/>
              </BodyFormButton>
            <BodyTitle>Silakan upload screenshot SIAKNG-mu di bawah ini.</BodyTitle>
            <BodyDesc>Format file berupa .jpg atau .png.</BodyDesc>
            <BodyForm>
                    <BodyInput type='file' name='image' onChange={onChange} />
                    <BodyButton onClick={onSubmit} >Upload</BodyButton>
            </BodyForm>
                    <BodyDesc>Berikut jadwal yang kamu upload: </BodyDesc>
                    <BodyImage src={image} id="canvas" alt="Jika kamu melihat ini, kamu belum mengupload atau gagal."/>
                    <BodyDesc>Silakan crop berdasarkan hari:</BodyDesc>
                    <br/>
                    <ReactCrop 
                      width={50}
                      src={image}
                      crop={crop}
                      onImageLoaded={handleImageLoaded}
                      onChange={(c) => handleOnCropChange(c)}
                      onComplete={(c) => handleOnCropComplete(c)}
                    />
                    <BodyDesc>Berikut versi JSON:</BodyDesc>
                    <BodyTextArea placeholder="Text area ini bisa di-stretch." value={text} onChange={() => setTextArea(text)}></BodyTextArea>
                    <BodyDesc>Klik tombol di bawah untuk mendownload versi .ICS:</BodyDesc>
                    <BodyButton onClick={alertPeep} >Download</BodyButton>
            </BodyContainer>
        </>
    )}   

export default Body;