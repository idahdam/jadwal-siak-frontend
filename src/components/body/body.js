import React, { useState, useRef, useEffect } from 'react'
import { 
    BodyContainer,
    BodyTitle,
    BodyDesc,
    BodyForm,
    BodyInput,
    BodyImage,
    BodyTextArea,
    BodyTextAreaPreview,
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
  parseText,
  JSONsafeStringify,
  data
} from './logic'

const {REACT_APP_PRESET_NAME, REACT_APP_CLOUD_URL} = process.env;
const preset = REACT_APP_PRESET_NAME;
const url =  REACT_APP_CLOUD_URL;

const Body = () => {
    const dayArray = ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu"]
    const textAreaRef = useRef(null);
    const [crop, setCrop] = useState({ unit: '%'});
    const [completedCrop, setCompletedCrop] = useState(null);
    const [show, setShow] = useState(true)
    const [image, setImage] = useState(null);
    const [text, setText] = useState('');
    const [preview, setPreview] = useState('');
    const [button, setButton] = useState({
      senin: false,
      selasa: false,
      rabu: false,
      kamis: false,
      jumat: false,
      sabtu: false
    })
    const [imagePos, setImagePos] = useState({
      left: 0,
      top: 0,
      width: 0,
      height: 0
    })

    const handleImageLoaded = (image) => {
      // console.log(image)
    } 

    const handleOnCropChange = (crop) => {
      setCrop(crop)
      // console.log({crop: crop})
    }

    const handleOnCropComplete = (crop) => {
      setCompletedCrop(crop)
      setImagePos({
        left: crop.x,
        top: crop.y,
        width: crop.width,
        height: crop.height
      })
    }
    
    const getTextArea = ( text ) => {
      textAreaRef.current.select();
      document.execCommand('copy');
      (Swal.fire({
        icon: 'success',
        title: 'Copied!',
        showConfirmButton: false,
        timer: 1500
      }))
    }
    const manipulateURL = (imageUrl) => {
      var str = imageUrl
      var pos = str.indexOf('upload/')
      var blackWhiteUrl = str.slice(0, pos+1) + "c_mfit,h_694,o_100,q_100,w_1205,z_1/" + str.slice(pos);
      console.log(blackWhiteUrl)
      // return blackWhiteUrl
    }

    const iterOCR = (imageUrl, imagePos) => {
      const rectangle = { left: imagePos.left, top: imagePos.top, width: imagePos.width, height: imagePos.height };
 
      console.log(imagePos)
      console.log(imageUrl)
      console.log(rectangle)

      const worker = createWorker({
        logger: m => console.log(m)
      });

      // replace rectangle with imagePos, imgurl
      (async () => {
        try{
        await worker.load();
        await worker.loadLanguage('ind');
        await worker.initialize('ind');
        const { data: { text } } = await worker.recognize('https://res.cloudinary.com/dxsh8co1d/image/upload/v1613980684/nucomhpu0nmlzwaalmkv.png', {rectangle});
        console.log(text);
        setPreview(text)
        // parseText(text)
        // setTextArea(data);
        // console.log(data)
        await worker.terminate();
        Swal.fire({
          icon: 'success',
          title: 'Scan berhasil!',
          showConfirmButton: false,
          timer: 1500
        })
        }
        catch(e){
          console.log(e)
          Swal.fire({
            icon: 'error',
            title: e,
            text: 'Apa kamu sudah memilih area?',
            footer: '<a href="https://google.com">Why do I have this issue?</a>'
          })
        }
      })();

    }

    const setPreviewArea = (preview) => {
      setPreview(preview)
    }

    const setTextArea = (preview) => {
      var dictJSON = JSONsafeStringify(preview)
      setText(dictJSON)
    }

    const onChange = e => {
      setImage(e.target.files[0]);
    };

    const alertPeep = () => {
      alert('Nggak diaktifkan dulu untuk demo. Belum deploy ke MongoDB.')
      setShow(!show)
      Swal.fire({
        icon: 'success',
        title: 'File sudah ter-upload!',
        showConfirmButton: false,
        timer: 1500
      })
    }

    const onScan = (imagePos, image) => {
      // setImage('https://res.cloudinary.com/dxsh8co1d/image/upload/c_mfit,e_blackwhite,h_694,o_100,q_100,w_1205,z_1/v1613893875/Screenshot_43_ze84hi.png')
      // manipulateURL(image)
      iterOCR(image, imagePos)
      // manipulateURL(image)
    }

    const onClickSet = () => {
        parseText(preview)
        setTextArea(data);
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
          .then(setShow(true))
          .then(setImage(imageUrl))

        } catch (err) {
          Swal.fire({
            icon: 'error',
            title: err,
            text: 'Apa kamu sudah memilih file gambar? (.png/.jpg)?',
            footer: '<a href="https://google.com">Why do I have this issue?</a>'
          })
        } 
    };

    return(
        <>  
        { show ? 
          <>
          <BodyContainer>
            <BodyTitle>Silakan upload screenshot SIAKNG-mu di bawah ini.</BodyTitle>
            <BodyDesc>Format file berupa .jpg atau .png.</BodyDesc>
            <BodyForm>
              <BodyInput type='file' name='image' onChange={onChange} />
              {/* <BodyButton onClick={onSubmit} >Upload</BodyButton> */}
              <BodyButton onClick={alertPeep} >Upload</BodyButton>
            </BodyForm>
          </BodyContainer></> 
          :
            <>
            <BodyContainer>
              {/* api limit, change image to url */}
              <BodyDesc>Berikut jadwal yang kamu upload: </BodyDesc>
              <BodyImage src='https://res.cloudinary.com/dxsh8co1d/image/upload/v1613980684/nucomhpu0nmlzwaalmkv.png' id="canvas" alt="Jika kamu melihat ini, kamu belum mengupload atau gagal."/>
              <BodyDesc>Silakan crop berdasarkan hari:</BodyDesc>
              <ReactCrop 
                src='https://res.cloudinary.com/dxsh8co1d/image/upload/v1613980684/nucomhpu0nmlzwaalmkv.png'
                crop={crop}
                onImageLoaded={handleImageLoaded}
                onChange={(c) => handleOnCropChange(c)}
                onComplete={(c) => handleOnCropComplete(c)}
              />
              <p>top: {crop.y}, left: {crop.x}, width: {crop.width}, height: {crop.height}</p>
              <BodyButton onClick={() => onScan(imagePos, image)}>Scan</BodyButton>
              <BodyDesc>Preview, klik set bila hasil sudah sesuai:</BodyDesc>
              <BodyTextAreaPreview readOnly={true} placeholder="Area preview" value={preview} onChange={(preview) => setTextArea(text)}></BodyTextAreaPreview>
              <br/>
              <br/>
              <BodyButton onClick={() => onClickSet()}>Set</BodyButton>
              <br/>
              <BodyDesc>Berikut versi JSON:</BodyDesc>
              <BodyTextArea readOnly={true} placeholder="Area JSON" ref ={textAreaRef} id="textarea" value={text} onChange={(text) => setTextArea(text)}></BodyTextArea>
              <BodyFormButton onClick={(text) => {getTextArea(text)}}>Copy</BodyFormButton>
              <BodyDesc>Klik tombol di bawah untuk mendownload versi .ICS:</BodyDesc>
              <BodyButton onClick={alertPeep} >Download</BodyButton>
          </BodyContainer>
          </> 
        }
        </>
    )}   

export default Body;