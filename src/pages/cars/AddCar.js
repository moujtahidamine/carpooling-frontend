import React from "react";
import { useForm } from "react-hook-form";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../constants";

const AddCar = () => {

    const { register, handleSubmit } = useForm();
    const { user: currentUser } = useSelector((state) => state.auth);
    const history = useHistory();

    const onSubmit = (data) => {

        const request = {
            user_id : currentUser.user.id,

            marque : data.marque,
            matricule : data.matricule,
            nbPlace : Number(data.nbPlace),
            etatVoiture : data.etatVoiture
        }

        console.log("request", request);

        axios.post(API_URL + "/cars", request)
            .then(resp => {
                console.log(resp.data);
                history.push("/mes-voitures")
            })
            .catch(err => console.log(err))
    }

    if (!currentUser) {
        return <Redirect to="/login" />;
    }

    return (
        <div className="container rounded bg-white my-5 mb-5">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">

                    <div className="col-md-8 offset-2 border">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h2 className="text-right">Nouvelle voiture</h2>
                            </div>
                            <div className="row mt-3">

                                <div className="col-md-12">
                                    <label className="labels">Marque</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        {...register("marque")}
                                    />
                                </div>

                                <div className="col-md-12">
                                    <label className="labels">Matricule</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        {...register("matricule")}
                                    />
                                </div>

                                <div className="col-md-12">
                                    <label className="labels">Nombre de place maximal</label>
                                    <input 
                                        type="number" 
                                        {...register("nbPlace")} 
                                        min={0} max={10}
                                        className="form-control" 
                                        placeholder="" 
                                        defaultValue="" 
                                    />
                                </div>

                                <div className="col-md-12">
                                    <label className="labels">Etat du voiture</label>
                                    <input 
                                        type="text" 
                                        {...register("etatVoiture")} 
                                        min={0} max={10}
                                        className="form-control" 
                                        placeholder="" 
                                        defaultValue="" 
                                    />
                                </div>

                                <div className="col-md-12 mt-4">
                                    <button
                                        type="submit"
                                        className="btn btn-success profile-button form-control" 
                                        style={{ width: "100%" }} 
                                    >
                                        Enregistrer
                                    </button>
                                </div>

                            </div>

                        </div>
                    
                    </div>

                </div>

            </form>
        </div >
    );
};

export default AddCar;
