const icon=document.querySelector('[data-icon]');
const locationTimeZone=document.querySelector('[data-location]');
const date=document.querySelector('[data-date]');
const time=document.querySelector('[data-time]');
const temp=document.querySelector('[data-temp]');
const sign=document.querySelector('[data-sign]');
const description=document.querySelector('[data-description]');
const humidity=document.querySelector('h2.humidity');
const uv=document.querySelector('[data-uvindex]');
const btn= document.querySelector('[data-btn]');
const min_temp= document.querySelector('[data-min-temp]');
const max_temp= document.querySelector('[data-max-temp]');
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let city='Budaun';
let country='India'.toLowerCase();
let mins=00;
let iconFile;


window.addEventListener("load", ()=>{
    let long;
    let lat;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long=position.coords.longitude;
            lat=position.coords.latitude;
        
// const proxy= 'https://cors-anywhere.herokuapp.com/';

const api= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=e46bc53d5357dc5f11a54ec4136d8f96`
fetch(api)
    .then(response=>{
        return response.json();
    })
    .then(data=>{
        // console.log(data);
         {

            let id=data.weather[0]['id'];
            
           

            if(id<250){
              
                icon.innerHTML='<img src="./icons/storm.svg" data-icon class="icons" alt="Storms">';
              }
              else if(id<350)
              {
                icon.innerHTML='<img src="./icons/drizzle.svg" data-icon class="icons" alt="Drizzle">';
              }
              else if(id<550)
              {
                icon.innerHTML='<img src="./icons/rain.svg" data-icon class="icons" alt="Rain">';
              }
              else if(id<650)
              {
                icon.innerHTML='<img src="./icons/snow.svg" data-icon class="icons" alt="Snow">';
              }
              else if( id<800)
              {
                icon.innerHTML='<img src="./icons/atmosphere.svg" data-icon class="icons" alt="Atmosphere">';
              }
              else if(id==800){
                
                icon.innerHTML='<img src="./icons/sun.svg" data-icon class="icons" alt="Sun">';
              
            }
              else{
                icon.innerHTML='<img src="./icons/clouds.svg" data-icon class="icons" alt="Clouds">';
              }
             

            let city_=data['name'];
            let country_= data['sys']['country'];
            locationTimeZone.textContent=`${city_}, ${country_}`;
            
        let temperature=data['main']['temp'];
        temp.innerText=`🌡️ ${calculate(temperature)}°C`;
         
         const d=new Date();
        date.innerText=` 📅 ${days[d.getDay()]}, ${d.getDate()}, ${months[d.getMonth()]}`
     
      
        time.innerText=`🕒 ${d.getHours()}:${minutes(d.getMinutes())}`
         let desc=data['weather'][0]['description'];
         description.innerText= desc.charAt(0).toUpperCase() + desc.slice(1);
         let humid=data['main']['humidity'];
         humidity.innerText=`Humidity: ${humid}`;
        
         let max=data['main']['temp_max'];
        
        let min=data['main']['temp_min']; 
        
        max_temp.innerText= min_temp.innerText=`Max-temperature: ${calculate(max)+1.1}°C`;
        
        min_temp.innerText=`Min-temperature: ${calculate(min)-0.8}°C`;
        
        }

        
       function calculate(temp){
        
           let a= parseInt(temp) -273;  
           
           return a;
           
       }

       function minutes(mins){
           mins=mins.toString();
        if(mins.length=== '0'){
            mins="00";
            
          }
          else if(mins.length=== '1'){
              mins=`0 ${mins}`;
            
          }
          return mins;

       }
      
         
    })
})
}
})

 



temp.addEventListener('click', ()=>{  
    let str= temp.innerText; 
    let deg=str.slice(-1);
    let digit=str.replace("°C",'' )
   digit=parseInt(digit.slice(4));

    if(deg === 'C'){
        let f = (digit* 9/5) + 32;
       temp.innerText= `🌡️ ${Math.round(f)} °F`;
    }
    else{
        let c = (digit-32)*5/9;
        temp.innerText= `🌡️ ${Math.round(c)} °C`;
    }
});




    
              
