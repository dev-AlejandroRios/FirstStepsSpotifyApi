import React, { useState } from 'react';
import axios, { AxiosResponse } from "axios";
import logo from './logo.svg';
import { SpotifyFunctions } from './Services/SpotifyFunctions';
import './App.css';


function App() {

  const [accessCode, setEstado] = useState<string>('');
  const handleAC = (accessCode: string) => {
    setEstado(accessCode);
  };

  var client_id: string = '36e737bf22c042e3a9df9dead75e0059';
  var client_secret = '92304bf7db904adf8171c0c13a3f1a83';

  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization: "Basic " + btoa(`${client_id}:${client_secret}`),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: "grant_type=client_credentials",
  };

  var getToken = async () => {
    await axios.post(authOptions.url, authOptions.data, { headers: authOptions.headers })
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          const token = response.data.access_token;
          console.log(token)
          handleAC(token);
          // Utiliza el token de acceso
        }
      })
      .catch((error: any) => {
        // Maneja el error
      });
  }

  var getArtist = async () => {
    await axios.get("https://api.spotify.com/v1/artists/1mcTU81TzQhprhouKaTkpq", { headers: { Authorization: `Bearer ${accessCode}` } })
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          // const token = response.data.access_token;
          console.log(response)
          // handleAC(token);
          // Utiliza el token de acceso
        }
      })
      .catch((error: any) => {
        // Maneja el error
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <a
            className="App-link"
            onClick={getToken}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get token
          </a>
          <br />
          <a
            className="App-link"
            onClick={getArtist}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Artist info
          </a>
          <ul>
            <li>User ID: <span id="id"></span></li>
            <li>Acces token: {accessCode}</li>
          </ul>        </p>
      </header>
    </div>
  );
}

export default App;
