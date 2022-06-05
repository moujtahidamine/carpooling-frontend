import React from "react";
import { useForm } from "react-hook-form";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import { API_URL } from "../constants";
import axios from "axios";

const Profile = () => {

  const { register, handleSubmit } = useForm();

  const { user: currentUser } = useSelector((state) => state.auth);

  const onSubmit = (data) => {

    const request = {

    }

    console.log("request", request);

    axios.post(API_URL + "/cars", request)
      .then(resp => {
        console.log(resp.data);
        window.location.reload(true);
      })
      .catch(err => console.log(err))
  }

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  console.log("currentUser", currentUser);

  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img className="rounded-circle mt-5" alt="profile-avatar" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" />
            <span className="font-weight-bold">{currentUser.user.name}</span>
            <span className="text-black-50">{currentUser.user.email}</span>
            <span> </span>
          </div>
        </div>
        <div className="col-md-5 border-right">

          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Mes information</h4>
            </div>
            <div className="row mt-3">
              <div className="col-md-12"><label className="labels">Numéro de téléphone</label>
                <input type="text" {...register("tel")} className="form-control" placeholder="" defaultValue="" /></div>
              <div className="col-md-12"><label className="labels">Adresse 1</label>
                <input type="text" {...register("addressline1")} className="form-control" placeholder="" defaultValue="" /></div>
              <div className="col-md-12"><label className="labels">Adresse 2</label>
                <input type="text" {...register("addressline2")} className="form-control" placeholder="" defaultValue="" /></div>
              <div className="col-md-12"><label className="labels">Code postal</label>
                <input type="text" {...register("codePostal")} className="form-control" placeholder="" defaultValue="" /></div>
            </div>
            <div className="row my-3">
              <div className="col-md-6"><label className="labels">Pays</label>
                <input type="text" {...register("country")} className="form-control" placeholder="" defaultValue="" /></div>
              <div className="col-md-6"><label className="labels">Province</label>
                <input type="text" {...register("province")} className="form-control" defaultValue="" placeholder="" /></div>

            </div>

            <div className="row">
              <div className="col-md-6 text-center">
                <button className="btn btn-success profile-button" type="button">
                  Enregistrer
                </button>
              </div>
            </div>

          </form>
          {/* form */}

        </div>
        <div className="col-md-4">
          <div className="p-3 py-5">

            <div className="d-flex justify-content-between mb-3">
              <h4 className="text-left">Mes voitures</h4>
            </div>
            <div className="d-flex flex-column">

              {
                currentUser.user.cars.map(car => (
                  <div className="" key={car.id}>
                    <span>
                      {car.marque +" | "+car.matricule +" | "+car.etatVoiture}
                    </span>                  
                  </div>
                ))
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
