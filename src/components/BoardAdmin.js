import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";

const BoardAdmin = () => {

  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    
  }, []);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  if(currentUser && currentUser.user && currentUser.user.isAdmin === '0'){
    return <Redirect to="/" />
  }

  return (
    <div className="container">
      <header className="jumbotron">
        Administration
      </header>
    </div>
  );
};

export default BoardAdmin;
