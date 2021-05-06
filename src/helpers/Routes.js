import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import Team from '../views/Team';
import Home from '../views/Home';
import NotFound from '../views/NotFound';

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  const routeChecker = (taco) => (user
    ? (<Component {...taco} user={user} />)
    : (<Redirect to={{ pathname: '/', state: { from: taco.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  user: PropTypes.any
};

export default function Routes({ user, player, setPlayer }) {
  return (
    <div>
      <Switch>
        <Route
          exact path='/'
          component={() => <Home user={user}/>}
        />
        <PrivateRoute
          path='/team'
          user={user}
          component={() => <Team user={user} player={player} setPlayer={setPlayer} />} />
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
