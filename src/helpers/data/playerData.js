import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getPlayers = (user) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/player.json?orderBy="uid"&equalTo="${user.uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((err) => reject(err));
});

const addPlayer = (player, user) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/player.json`, player)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/player/${response.data.name}.json`, body)
        .then(() => {
          getPlayers(user).then((playerArray) => resolve(playerArray));
        });
    }).catch((err) => reject(err));
});

const deletePlayer = (firebaseKey, user) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/player/${firebaseKey}.json`)
    .then(() => getPlayers(user).then((playerArray) => resolve(playerArray)))
    .catch((err) => reject(err));
});

const updatePlayer = (player, user) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/player/${player.firebaseKey}.json`, player)
    .then(() => getPlayers(user).then(resolve))
    .catch((err) => reject(err));
});

export {
  getPlayers, addPlayer, deletePlayer, updatePlayer
};
