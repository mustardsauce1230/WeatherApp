

let search = document.getElementById("search")
let btn = document.getElementById("btn")
let API_KEY = "a8ee85694fe02536b6d283e694fd2b01"
let weather_info = document.querySelector(".weather_info")
let body = document.querySelector("body")

function fetchData(){

    if(search.value.trim() === ""){
        error.innerText = "N/A"
    }
    else{
        setTimeout(()=>{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&units=metric&appid=${API_KEY}` 
            fetch(url)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                showData(data)
                // console.log(data);
            })
            .catch((err) => {
                weather_info.innerHTML = `<h1> CITY NOT FOUND !! </h1>`
                console.log(err);
            })
            error.innerText = ""
            search.value = ""
        },1000)
        
        weather_info.innerHTML = `<h1> HOLD ON... </h1>`

    }

}

function showData(data){
    const {country} = data.sys
    const {temp} = data.main
    let updatedTemp = Math.round(temp)
    const {main, description,  icon, id} = data.weather[0]
    let urlImg;

    if(id >= 200 && id <= 232 ){
        urlImg = "assets/images/thunderstorm.png"
        body.classList = "thunderstorm"
    }
    else if(id >= 300 && id <= 321 ){
        urlImg = "assets/images/drizzle.png"
    }
    else if(id >= 500 && id <= 531 ){
        urlImg = "assets/images/rainy-day.png"
    }
    else if(id >= 600 && id <= 622 ){
        urlImg = "assets/images/snowy.png"
    }
    else if(id >= 701 && id <= 781 ){
        urlImg = "assets/images/atmosphere.png"
    }
    else if(id >= 801 && id <= 804 ){
        urlImg = "assets/images/cloudy.png"
    }
    else{
        urlImg = "assets/images/sun (1).png"
    }

    weather_info.classList = "padding"
    weather_info.innerHTML = `
    <p>${data.name},${country}</p>
    <img src="${urlImg}" alt="">
    <h1 class="number">${updatedTemp} <sup class="degree">o</sup>C</h1>
    <p>${main}, (${description})</p>
    
    `
    console.log(data);
}

search.addEventListener('keyup',(e)=>{
    if(e.key === "Enter"){
        fetchData()
    }
})

btn.addEventListener('click', fetchData)

let currentLocation = document.getElementById("currentLocation")

function getCurrentLocation(){
    navigator.geolocation.getCurrentPosition((position)=>{

        let lon = position.coords.longitude
        let lat = position.coords.latitude
        let currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        fetch(currentUrl)
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            showData(data)
        })
        .catch((err) => {
            weather_info.innerHTML = `<h1> CITY NOT FOUND !! </h1>`
            console.log(err);
        })
        
    },(error)=>{
        const {message} = error
        error.innerText = `${message}`
        // console.log(error);
        
    })
}

currentLocation.addEventListener("click", getCurrentLocation)
