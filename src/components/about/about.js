import react from 'react'
import {
    AboutContainer,
    AboutTitle,
    AboutImgContainer,
    AbouTextContainer,
    AboutNotesContainer
} from './about.elements'

import image1 from '../../images/1.png'
import image2 from '../../images/2.png'
import image3 from '../../images/3.png'
import image4 from '../../images/4.png'
import image5 from '../../images/5.png'
import image6 from '../../images/6.png'

const AboutComponent = () => {

    return(
        <>
            <AboutContainer>
                <AboutTitle>Cara menggunakan website ini</AboutTitle>
                <AboutContainer>
                    <AboutImgContainer src={image1}/>
                    <AbouTextContainer>
                    <br/>
                    1. Upload image lalu klik upload. Tunggu hingga memberikan notifikasi seperti di bawah ini.
                    <br/>
                    <br/>
                    </AbouTextContainer>
                    <AboutImgContainer src={image2}/>
                    <br/>
                    <AbouTextContainer>
                    2. Cek gambar yang sudah diupload. (fitur upload sedang dimatikan, sementara menggunakan gambar bawaan.)
                    bila sudah sesuai, lanjut ke step selanjutnya.
                    <br/>
                    <br/>
                    </AbouTextContainer>
                    <AboutImgContainer src={image3}/>
                    <AbouTextContainer>
                    <br/>
                    3. Dikarenakan ukuran layar yang berbeda-beda, user akan diminta untuk meng-crop gambar sesuai dengan hari. 
                    Pastikan hasil crop-an sesuai dengan contoh (lebar mengikuti lebar tabel mata kuliah, tinggi sesuai tinggi gambar)
                    <br/>
                    <br/>
                    </AbouTextContainer>
                    <AboutImgContainer src={image4}/>
                    <AbouTextContainer>
                    <br/>
                    4. Tekan scan lalu pastikan bahwa hasil OCR yang keluar sesuai dengan mata kuliah pada hari tersebut. Bila salah, silakan atur area crop kembali.
                    <br/>
                    <br/>
                    </AbouTextContainer>
                    <AboutImgContainer src={image5}/>
                    <AbouTextContainer>
                    <br/>
                    5. Tekan set untuk mengubah menjadi bentuk JSON. 
                    <br/>
                    <br/>
                    </AbouTextContainer>
                    <AboutImgContainer src={image6}/>
                    <AbouTextContainer>
                    <br/>
                    6. Lakukan secara berulang untuk setiap hari secara berurutan* dan selesai. 
                    <br/>
                    <br/>
                    </AbouTextContainer>
                    <AboutNotesContainer>
                        *Notes: mata kuliah yang digunakan masih Teknik Komputer 2019 <br/>dan bila crop tidak berurutan,
                        hasil json juga tidak berurutan. Serta fitur convert .ICS mungkin akan ditambahkan.
                    </AboutNotesContainer>
                </AboutContainer>
            </AboutContainer>  
        </>
    )
}


export default AboutComponent;
