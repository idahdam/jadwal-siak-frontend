export const setButtonhandler = (button, day) => {
    button[day] = !button[day]
    console.log(button)
}

export const parseText = (text) => {
    const dayArray = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
    var i = 0, j = 0
    for(i = 0; i<6; i++){
        if(text.includes(dayArray[i])){
            console.log(`${dayArray[i]} exists`)
            data[`${dayArray[i]}`] = {}
            console.log(jadwal[dayArray[i]][0][0]["nama"])
            console.log(jadwal[dayArray[i]])
            for(j = 0; j < 3; j++){
                data[`${dayArray[i]}`][`Matakuliah ke-${j+1}`] = {}
                if(text.includes(jadwal[dayArray[i]][j][0]["nama"])){
                        var nama = jadwal[dayArray[i]][j][0]["nama"]
                        var mulai = jadwal[dayArray[i]][j][0]["jam mulai"]
                        var selesai = jadwal[dayArray[i]][j][0]["jam selesai"]
                        var ruang = jadwal[dayArray[i]][j][0]["ruang"]
                        data[`${dayArray[i]}`][`Matakuliah ke-${j+1}`].nama = nama
                        data[`${dayArray[i]}`][`Matakuliah ke-${j+1}`].mulai = mulai
                        data[`${dayArray[i]}`][`Matakuliah ke-${j+1}`].selesai = selesai
                        data[`${dayArray[i]}`][`Matakuliah ke-${j+1}`].ruang = ruang
                }
            }
        }
        else{
            continue
        }
    }
}

export const data =  
{}

export const JSONsafeStringify = (obj, indent = 2) => {
    let cache = [];
    const retVal = JSON.stringify(
      obj,
      (key, value) =>
        typeof value === "object" && value !== null
          ? cache.includes(value)
            ? undefined // Duplicate reference found, discard key
            : cache.push(value) && value // Store value in our collection
          : value,
      indent
    );
    cache = null;
    return retVal;
};

var jadwal = 
{
    "Senin" : 
    [
        [{
            "nama" : "Analisis Algoritma",
            "jam mulai" : "08.00",
            "jam selesai": "09.40",
            "ruang": "GK403"
        }],
        [{
            "nama" : "Jaringan Komputer dan Praktikum",
            "jam mulai" : "08.00",
            "jam selesai": "09.40",
            "ruang": "Lab Puskom 201"
        }],
        [{
            "nama" : "Sistem Siber-Fisik dan Praktikum",
            "jam mulai" : "08.00",
            "jam selesai": "0940",
            "ruang": "S.203"
        }],
        // lanjutin aja
        [{}],
        [{}]

    ],
    "Selasa" : 
    [
        [{
            "nama" : "Jaringan Komputer dan Praktikum",
            "jam mulai" : "13.00",
            "jam selesai": "15.30",
            "ruang": "S.203"
        }],
        [{
            "nama" : "Profesionalisme dan Etika dalam Teknologi",
            "jam mulai" : "08.00",
            "jam selesai": "09.40",
            "ruang": "-"
        }],
    ]
}