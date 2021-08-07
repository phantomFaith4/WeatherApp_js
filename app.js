const api={
    key:"a162899aba020d546d71f3f6256ebc72",
    baseurl:"https://api.openweathermap.org/data/2.5/",       
};   
console.log(api.key+":"+api.baseurl)

const searchbox=document.querySelector('.search-box');
searchbox.addEventListener('keypress',setQuery);
 
function setQuery(evt){      
    if(evt.keyCode == 13){   
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}
function getResults(query){
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather =>{
            return weather.json();
        }).then(displayResults);

}
function displayResults(weather){
    console.log(weather);
    let city=document.querySelector('.location .city');
    city.innerText=`${weather.name},${weather.sys.country}`;
    
    let now=new Date();
    let date=document.querySelector('.location .date');
    date.innerText=dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`; 
    
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
   
};
window.addEventListener("load",()=>{
    let long;
    let lati; 
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long=position.coords.longitude;
            lati=position.coords.latitude;
            console.log(long,lati);
 
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&units=metric&appid=a162899aba020d546d71f3f6256ebc72`;
            
            fetch(api) 
            .then(response=>{
                return response.json(); 
            }) 
            .then(data=>{
                console.log(data);
                let city=document.querySelector('.location .city');
                city.innerText=`${data.name},${data.sys.country}`;
                let now=new Date(); 

                let date=document.querySelector('.location .date');
                date.innerText=dateBuilder(now);

                let temp = document.querySelector('.current .temp');
                temp.innerHTML = `${Math.round(data.main.temp)}<span>°c</span>`; 
    
                let weather_el = document.querySelector('.current .weather');
                weather_el.innerText = data.weather[0].main;
 
                let hilow = document.querySelector('.hi-low');
                hilow.innerText = `${Math.round(data.main.temp_min)}°c / ${Math.round(data.main.temp_max)}°c`;

            });

        });
    } 
});   


function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
   
    let day = days[d.getDay()];
    let date = d.getDate();  
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
}
