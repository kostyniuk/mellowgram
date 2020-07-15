import React from 'react';

const User = ({match}) => {

  const {username} = match.params 

  return(
    <div>
      <h1>User {username}</h1>
    </div>
  )
}

export default User;