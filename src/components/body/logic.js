export const setButtonhandler = (button, day) => {
    button[day] = !button[day]
    console.log(button)
}

export const parseText = (text) => {
    if(text.includes("Senin") || text.includes("senin")){
        console.log('senin exists.')
        data["senin"] = {}
        if(text.includes("Analisis Algoritma")){
            data["senin"]["mata kuliah"] = "Analisis Algoritma"
        }
    }
    else if(text.includes("Selasa") || text.includes("selasa")){

    }
}

export const data = 
{}


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