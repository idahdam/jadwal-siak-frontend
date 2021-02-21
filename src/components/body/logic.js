export const setButtonhandler = (button, day) => {
    button[day] = !button[day]
    console.log(button)
}

export const parseText = (text) => {
    if(text.includes("Senin") || text.includes("senin")){
        console.log('senin exists.')
        data["senin"] = {}
        if(text.includes("Analisis Algoritma")){
            data["senin"]["Analisis Algoritma"] = 
            {
                "mulai" : "0800",
                "selesai" : "0900",
                "ruang kelas": "GK 304"
            }
        }
        if(text.includes("Jaringan Komputer dan Praktikum")){
            data["senin"]["Jaringan Komputer dan Praktikum"] = 
            {
                "mulai" : "0800",
                "selesai" : "0900",
                "ruang kelas": "Lab Puskom 201"
            }
        }
        if(text.includes("Sistem Siber-Fisik dan Praktikum")){
            data["senin"]["Sistem Siber-Fisik dan Praktikum"] = 
            {
                "mulai" : "0800",
                "selesai" : "0900",
                "ruang kelas": "S.203"
            }
        }
    }
    else if(text.includes("Selasa") || text.includes("selasa")){

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


// var dict = 
// {
//     "one" : [15, 4.5],
//     "two" : [34, 3.3],
//     "three" : [67, 5.0],
//     "four" : [32, 4.1]
// };

// dict["five"] = [22, 5.0]

// var dictJSON = JSON.stringify(dict)
// console.log(dictJSON)