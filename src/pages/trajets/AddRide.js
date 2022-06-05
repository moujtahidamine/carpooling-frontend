import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect, Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { cities } from "../../data";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../constants";

const AddRide = () => {

    const { register, handleSubmit } = useForm();
    const { user: currentUser } = useSelector((state) => state.auth);
    const history = useHistory();

    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    const onSubmit = (data) => {

        const request = {
            user_id: currentUser.user.id,
            car_id: Number(data.car_id),

            villeDepart: data.villeDepart,
            villeArrive: data.villeArrive,
            dateDepart: data.dateDepart,
            prix: Number(data.prix),
            nbPlace: Number(data.nbPlace),
        }

        console.log("request", request);

        axios.post(API_URL + "/trajets", request)
            .then(resp => {
                console.log(resp.data);
                history.push("/trajets")
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get(API_URL+"/cars/user/" + currentUser.user.id)
            .then(resp => {
                console.log(resp);
                setCars(resp.data);
                setLoading(false);
            })
            .catch(err => setLoading(false))
    }, []);

    if (!currentUser) {
        return <Redirect to="/login" />;
    }

    if(loading) return "Chargement...";
    return (
        <div className="container rounded bg-white mt-5 mb-5">

            {
                cars.length === 0
                    ? (
                        <div>
                            <p>Vous devez avoir une voiture pour lancer un trajet!</p>
                            <Link to="/mes-voitures/ajout">Ajouter une voiture</Link>
                        </div>
                    )
                    : (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">

                                <div className="col-md-8 offset-2">
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
                                                <label className="labels">Voiture</label>
                                                <select
                                                    type="text"
                                                    {...register("car_id")}
                                                    className="form-control"
                                                    placeholder=""
                                                    defaultValue=""
                                                >
                                                    {
                                                        cars.map(car => {
                                                            console.log(car);
                                                            return (
                                                                <option key={car.id} value={car.id}>
                                                                    {car.marque + " | " + car.matricule}
                                                                </option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>

                                            <div className="col-md-12">
                                                <label className="labels">Prix (DH)</label>
                                                <input type="number" {...register("prix")} min={0} className="form-control" placeholder="" defaultValue="" />
                                            </div>
                                            <div className="col-md-12">
                                                <label className="labels">Nombre de place</label>
                                                <input type="number" {...register("nbPlace")} min={0} className="form-control" placeholder="" defaultValue="" />
                                            </div>


                                            <div className="col-md-12">
                                                <label className="labels">Date de depart</label>
                                                <input type="text" {...register("dateDepart")} className="form-control" placeholder="JJ/MM/AAAA" defaultValue="" />
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

                                        <div className="row mt-4">
                                            <div className="col-md-12">
                                                <div className="text-left">
                                                    <button className="btn btn-success profile-button" style={{ width: "100%" }} type="submit">
                                                        Enregistrer
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>


                            </div>

                        </form>
                    )
            }

        </div>
    );
};

export default AddRide;
