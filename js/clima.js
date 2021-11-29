//Ciudad actual var global
const value_busqueda = document.getElementById('busqueda');

document.body.addEventListener('click', ()=>{
    event.preventDefault();
    obtenerDatos(value_busqueda.value);
}); 


function obtenerDatos(ciudadActual){
    console.log('diste click');
    let url =   `https://api.openweathermap.org/data/2.5/weather?q=${ciudadActual}&appid=cba22844979badce462750c91e19f19d`;

    const api = new XMLHttpRequest();

    api.open('GET', url, true);
    api.send();

    api.onreadystatechange = function(){
        if(this.status == 200 && this.readyState == 4){
            let datos = JSON.parse(this.responseText);

            //Agarro lo que está dentro de Main -temperatura, st, presión
            let itemMain = datos.main;

            let weatherObeject = {
                 img: `http://openweathermap.org/img/wn/${datos.weather[0].icon}@2x.png`,
                 clima : datos.weather[0].main,
                 climaDescripcion: datos.weather[0].description,
                 sensacionT : toCelsius(itemMain.feels_like)+'°',
                 humedad : itemMain.humidity+'%',
                 presion : itemMain.pressure+'hPa',
                 temperatura : toCelsius(itemMain.temp)+'°',
                 maxima : toCelsius(itemMain.temp_max)+'°',
                 minima : toCelsius(itemMain.temp_min)+'°',
                 viento : datos.wind.speed+'m/s',
            };

            console.log(weatherObeject);

            let display = document.getElementById('resultadoDisplay');
            let detallado = document.getElementById('resultadoDetallado');
            
            display.innerHTML=`
                <img src="${weatherObeject.img}" alt="${weatherObeject.clima}">
                
                <div class="row align-items-center justify-content-center">
                    <span class="col-3">${weatherObeject.temperatura}</span>

                    <div class="col-3">
                    <span>${weatherObeject.maxima}</span>
                    <span>| ${weatherObeject.minima}</span>
                    </div>
                    
                </div>
                    <p>${ciudadActual}</p>
                    <p>${weatherObeject.climaDescripcion}</p>
                    <p><abbr title="Sensación Térmica">ST</abbr>${weatherObeject.sensacionT}</p>`;

            detallado.innerHTML=`
                <div class="row row-cols-2 row-cols-md-4 justify-content-evenly ">

                <div class="display col-4 m-2 col-md-2 pt-3">
                    <p><abbr title="Sensación Térmica">ST</abbr></p>
                    <p>${weatherObeject.sensacionT}</p>
                </div>
                
                <div class="display col-4 m-2 col-md-2 pt-3">
                <p>Humedad</p>
                <p>${weatherObeject.humedad}</p>
                </div>

                <div class="display col-4 m-2 col-md-2 pt-3">
                    <p>Viento</p>
                    <p>${weatherObeject.viento}</p>
                </div>

                <div class="display col-4 m-2 col-md-2 pt-3">
                    <p>Presión</p>
                    <p>${weatherObeject.presion}</p>
                </div>
                </div>`;
        }
    }

    function toCelsius(temperatureToConvert){
        let tempInKelvin = parseInt(temperatureToConvert);
        let tempInCelsius = tempInKelvin - 273;
        return tempInCelsius.toString();
    }

}
