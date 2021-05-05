import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Card, CardBody, CardImg, CardText, Button, CardTitle
} from 'reactstrap';
import { deletePlayer } from '../helpers/data/playerData';
import TeamForm from '../views/TeamForm';

const PlayerCard = ({
  firebaseKey,
  name,
  imageUrl,
  position,
  uid,
  setPlayer,
  user
}) => {
  const [editing, setEditing] = useState(false);
  const handleClick = (type) => {
    if (type === 'delete') {
      deletePlayer(firebaseKey, user).then((playerArray) => setPlayer(playerArray));
    } else if (type === 'edit') {
      setEditing((prevState) => !prevState);
    }
  };

  return (
    <div className='container'>
      <Card body className='card' key={firebaseKey} id={uid}>
        <CardImg id='playerImg' src={imageUrl} alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">{name}</CardTitle>
          <CardText>Position: {position}</CardText>
          <Button color='info' onClick={() => handleClick('edit')}>
            {editing ? 'Close Form' : 'Update Player'}</Button>
          {editing && <TeamForm
            setPlayer={setPlayer}
            user={user}
            firebaseKey={firebaseKey}
            name={name}
            imageUrl={imageUrl}
            position={position}
            uid={uid}
          />}
          <Button color='danger' onClick={() => handleClick('delete')}>Delete Player</Button>
        </CardBody>
      </Card>
    </div>
  );
};

PlayerCard.propTypes = {
  firebaseKey: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  setPlayer: PropTypes.func,
  user: PropTypes.any
};

export default PlayerCard;
