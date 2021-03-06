import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import PlayerCard from '../components/PlayerCard';
import TeamForm from './TeamForm';

export default function Team({ user, player, setPlayer }) {
  const [showButton, setShowButton] = useState(false);
  const handleClick = () => {
    setShowButton((prevState) => !prevState);
  };

  return (
    <main>
      <section className="header">
      <header className="h1">{user.fullName}&apos;s Team page</header>
      { !showButton
        ? <Button color='info' onClick={handleClick}>Add Player</Button>
        : <div>
        <Button color='info' onClick={handleClick}>Are you done yet?</Button>
          <TeamForm setPlayer={setPlayer} user={user}/>
        </div>
        }
      </section>
      <section className="container">
        <div className='playerContainer'>
        {player.map((playerInfo) => (
          <PlayerCard key={playerInfo.firebaseKey}
            firebaseKey={playerInfo.firebaseKey}
            name={playerInfo.name}
            position={playerInfo.position}
            uid={playerInfo.uid}
            imageUrl={playerInfo.imageUrl}
            setPlayer={setPlayer}
            user={user}
          />
        ))}
        </div>
      </section>
    </main>
  );
}

Team.propTypes = {
  user: PropTypes.any,
  player: PropTypes.array.isRequired,
  setPlayer: PropTypes.func.isRequired
};
