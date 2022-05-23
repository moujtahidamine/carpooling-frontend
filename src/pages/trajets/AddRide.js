import React from "react";
import { useForm } from "react-hook-form";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import { cities } from "../../data";
import axios from "axios";
import { API_URL } from "../../constants";

const Addride = () => {

    const { register, handleSubmit } = useForm();
    const { user: currentUser } = useSelector((state) => state.auth);

    const onSubmit = (data) => {

        const request = {
            // userId: currentUser.user.id,
            villeDepart: data.villeDepart,
            villeArrive: data.villeArrive,
            dateDepart: data.dateDepart,
            prix: Number(data.prix),
            nbPlace: Number(data.nbPlace),

        }

        console.log("request", request);

        axios.post(API_URL + "/trajets", request)
            .then(resp => console.log(resp.data))
            .catch(err => console.log(err))
    }

    if (!currentUser) {
        return <Redirect to="/login" />;
    }

    return (
        <div className="container rounded bg-white mt-5 mb-5">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">

                    <div className="col-md-6">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h2 className="text-right">Nouveau trajet</h2>
                            </div>
                            <div className="row mt-3">

                                <div className="col-md-12">
                                    <label className="labels">Nom du conducteur</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        defaultValue={currentUser.user && currentUser.user.name}
                                        readOnly
                                    />
                                </div>

                                <div className="col-md-12">
                                    <label className="labels">Ville de depart</label>
                                    <select type="text" {...register("villeDepart")} className="form-control" placeholder="" defaultValue="">
                                        <option value="" />
                                        {
                                            cities.map(city => (
                                                <option key={city.id}>
                                                    {city.ville}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="col-md-12">
                                    <label className="labels">Ville d'arrive</label>
                                    <select type="text" {...register("villeArrive")} className="form-control" placeholder="" defaultValue="">
                                        <option value="" />
                                        {
                                            cities.map(city => (
                                                <option key={city.id}>
                                                    {city.ville}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="p-3 py-5">

                            <div className="d-flex justify-content-between mb-3">
                                <h2 style={{ color: '#fff' }}>.</h2>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <label className="labels">Date de depart</label>
                                    <input type="text" {...register("dateDepart")} className="form-control" placeholder="JJ/MM/AAAA" defaultValue="" />
                                </div>
                                <div className="col-md-12">
                                    <label className="labels">Prix (DH)</label>
                                    <input type="number" {...register("prix")} min={0} className="form-control" placeholder="" defaultValue="" />
                                </div>
                                <div className="col-md-12">
                                    <label className="labels">Nombre de place</label>
                                    <input type="number" {...register("nbPlace")} min={0} className="form-control" placeholder="" defaultValue="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="px-3 text-left">
                            <button className="btn btn-primary profile-button" style={{ width: "200px" }} type="submit">
                                Enregistrer
                            </button>
                        </div>
                    </div>

                </div>

            </form>
        </div >
    );
};

export default Addride;
