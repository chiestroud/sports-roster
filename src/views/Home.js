import React from 'react';
import PropTypes from 'prop-types';

export default function Home({ user }) {
  return (
    <div>
    { user
        && <section>
        <header>Welcome, {user.fullName}</header>
        <img className='profileImage' src={user.profileImage} />
        </section>
      }
   </div>
  );
}

Home.propTypes = {
  user: PropTypes.any
};
