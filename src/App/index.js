import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import NavBar from '../components/NavBar';
import Routes from '../helpers/Routes';
import './App.scss';
import { getPlayers } from '../helpers/data/playerData';

function App() {
  const [user, setUser] = useState(null);
  const [player, setPlayer] = useState([]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userInfoObj = {
          fullName: authed.displayName,
          profileImage: authed.photoURL,
          uid: authed.uid,
          username: authed.email.split('@')[0]
        };
        setUser(userInfoObj);
        getPlayers(userInfoObj).then((response) => setPlayer(response));
      } else if (user || user === null) {
        setUser(false);
      }
    });
  }, []);

  return (
    <Router>
      <NavBar user={user}/>
      <Routes
        user={user}
        player={player}
        setPlayer={setPlayer}
      />
    </Router>
  );
}

export default App;
