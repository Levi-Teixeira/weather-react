import {React, useState, useEffect} from 'react';
import './App.css';

function App() {

  const [location, setLocation] = useState('');
  const [previsões, setPrevisões] = useState([])

  useEffect(()=>{
    fetch('https://extreme-ip-lookup.com/json/')
      .then((response)=>{
        const resposta = response.json();
        return resposta
      })
      .then((resposta)=>{
        setLocation(`${resposta.city}, ${resposta.region}`);
        return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${resposta.lat}&lon=${resposta.lon}&units=metric&lang=pt_BR&appid=47b16d41765388e1d2e251b373b570c0`) 
      })
      .then((objeto)=>{
        const info = objeto.json()
        return info
      })
      .then((objeto)=>{
        const daily = objeto.daily
        setPrevisões(daily)
      })
  },[]);

  return (
    <div className="App">
      <h1>Previsão do tempo em {location}</h1>
      <div className = 'dias'>
        {previsões.map((item, x)=>(
          <div className='caixa'>
            <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}/>
            <h2 className = 'dia'>{
              previsões.indexOf(item) === 0 ? "Hoje"
              : previsões.indexOf(item) === 1
              ? "Amanhã"
              : `Daqui a ${previsões.indexOf(item)} dias`
            }
            </h2>
            <p>{item.weather[0].description}</p>
            <p>{item.temp.min} Cº -</p><p>{item.temp.max} Cº</p>
          </div>
          
        ))}
      </div>
    </div>
  );
}

export default App;
