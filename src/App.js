import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardAdmin from "./components/BoardAdmin";

import {
  RidesList,
  AddRide,

} from "./pages"

import { logout } from "./actions/auth";
import { history } from "./helpers/history";
import { MyRideDetail, MyRides } from "./pages/trajets";
import { CarDetail, MyCars, AddCar } from "./pages/cars";

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'


const App = () => {


  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  // console.log(currentUser.user.isAdmin === '0');

  return (
    <Router history={history}>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Car pooling
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/accueil"} className="nav-link">
                Accueil
              </Link>
            </li>

            {currentUser && currentUser.user && currentUser.user.isAdmin && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Administration
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/trajets"} className="nav-link">
                  Tous les trajets
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/mes-voitures"} className="nav-link">
                  Mes voitures
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/mes-trajets"} className="nav-link">
                  Mes Trajets
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.user.name}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  Deconnexion
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Se connecter
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Inscription
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/accueil"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/admin" component={BoardAdmin} />

            <Route exact path="/trajets" component={RidesList} />
            
            <Route path="/trajets/ajout" component={AddRide} />

            <Route exact path="/mes-trajets" component={MyRides} />
            <Route path="/mes-trajets/:id" component={MyRideDetail} />

            <Route exact path="/mes-voitures" component={MyCars} />
            <Route path="/mes-voitures/ajout" component={AddCar} />
            <Route path="/mes-voitures/details" component={CarDetail} />
          </Switch>
        </div>

        {/* <AuthVerify logOut={logOut}/> */}
      </div>
    </Router>
  );
};

export default App;
