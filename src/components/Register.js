import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { signup } from "../actions/auth";

const Register = () => {

  const { register, handleSubmit } = useForm();

  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const history = useHistory();

  const onSubmit = (data) => {

    setSuccessful(false);

    const request = {
      email: data.email,
      password: data.password,
      password_confirmation: data.passwordConfirmation,
      name: data.name,
      isAdmin: false,
    }

    dispatch(signup(request))
      .then(() => {
        setSuccessful(true);
        history.push("/login");

      })
      .catch(() => {
        setSuccessful(false);
      });
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Nom complet</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  {...register("name")}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  {...register("email")}
                />
              </div>

              <div className="form-group">
                <label htmlFor="cin">CIN</label>
                <input
                  type="text"
                  className="form-control"
                  name="cin"
                  {...register("cin")}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  {...register("password")}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Confirmation de mot de passe</label>
                <input
                  type="password"
                  className="form-control"
                  name="passwordConfirmation"
                  {...register("passwordConfirmation")}
                />
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">Inscription</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
