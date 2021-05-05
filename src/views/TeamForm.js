import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form, FormGroup, Label, Input, Button
} from 'reactstrap';
import { addPlayer } from '../helpers/data/playerData';

export default function TeamForm({ user, setPlayer }) {
  const [newPlayer, setNewPlayer] = useState({
    firebaseKey: '',
    name: '',
    imageUrl: '',
    position: '',
    uid: user.uid,
  });

  const handleInputChange = (e) => {
    setNewPlayer((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPlayer(newPlayer).then((playerArray) => setPlayer(playerArray));
  };

  return (
    <Form
      id="addPlayerForm"
      onSubmit={handleSubmit}
    >
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          type="text"
          name="name"
          id="playerName"
          placeholder="Player Name"
          value={newPlayer.name}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="position">Position</Label>
        <Input
          type="text"
          name="position"
          id="position"
          value={newPlayer.position}
          placeholder="Player Position"
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="image">ImageURL</Label>
        <Input
          type="url"
          name="imageUrl"
          id="playerImage"
          value={newPlayer.imageUrl}
          onChange={handleInputChange}
          placeholder="Player Picture" />
      </FormGroup>
      <Button color='info'>Submit Player</Button>
    </Form>
  );
}

TeamForm.propTypes = {
  setPlayer: PropTypes.func,
  user: PropTypes.any
};
