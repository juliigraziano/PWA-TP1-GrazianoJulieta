document.querySelector('#ciudad').addEventListener('click', function(){
    obtenerDatos();
});

function obtenerDatos(){
    console.log('diste click');
    let url =   `https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=cba22844979badce462750c91e19f19d`;

    const api = new XMLHttpRequest();

    api.open('GET', url, true);
    api.send();

    api.onreadystatechange = function(){
        if(this.status == 200 && this.readyState == 4){
            let datos = JSON.parse(this.responseText);

            
            let resultado = document.querySelector('#resultado');
            resultado.innerHTML = '';

            let weatherObejects = [];
            //Agarro lo que est[a dentro de Main -temperatura, st, presi[on-
            for(let item of datos.list){
                let itemMain = item.main;

                weatherObejects.push({
                    clima : item.weather[0].main,
                    sensacionT : toCelsius(itemMain.feels_like),
                    humedad : itemMain.humidity,
                    presion : itemMain.pressure,
                    temperatura : toCelsius(itemMain.temp),
                    maxima : toCelsius(itemMain.temp_max),
                    minima : toCelsius(itemMain.temp_min),
                    viento : item.wind,
                })

                console.log(itemMain);
            }
            console.log(weatherObejects);
        }
    }

    function toCelsius(temperatureToConvert){
        let tempInKelvin = parseInt(temperatureToConvert);
        let tempInCelsius = tempInKelvin - 273;
        return tempInCelsius.toString();
    }

}