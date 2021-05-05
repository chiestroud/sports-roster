import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Team from '../views/Team';
import Home from '../views/Home';
import NotFound from '../views/NotFound';

export default function Routes({ user, player, setPlayer }) {
  return (
    <div>
      <Switch>
        <Route exact path='/'
          component={() => <Home user={user}/>}
        />
        <Route path='/team' component={() => <Team user={user} player={player} setPlayer={setPlayer}/>}/>
        <Route path='*' component={NotFound} />
      </Switch>
    </div>
  );
}

Routes.propTypes = {
  user: PropTypes.any,
  player: PropTypes.array,
  setPlayer: PropTypes.func
};
