import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

const BoardAdmin = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        Administration
      </header>
    </div>
  );
};

export default BoardAdmin;
