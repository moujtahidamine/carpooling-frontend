import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import "../../styles/RidesList.css";

const trajets = [
    {
        id:1,
        villeDepart:"Kenitra",
        villeArrive:"Rabat",
        dateDepart:"26/05/2022",
        prix:30,
        nbPlace:3,
        conducteur:"Achbari Salma",
    },
    {
        id:2,
        villeDepart:"Sale",
        villeArrive:"Fes",
        dateDepart:"26/05/2022",
        prix:30,
        nbPlace:3,
        conducteur:"Eddissi Saad",
    },
    {
        id:3,
        villeDepart:"Tanger",
        villeArrive:"Casablanca",
        dateDepart:"22/05/2022",
        prix:30,
        nbPlace:3,
        conducteur:"Amghar Ayoub",
    },
    {
        id:4,
        villeDepart:"Kenitra",
        villeArrive:"Tanger",
        dateDepart:"20/05/2022",
        prix:30,
        nbPlace:3,
        conducteur:"Benmoussa Dounia",
    },
]

function RidesList(props) {

    const { user: currentUser } = useSelector((state) => state.auth);
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(trajets);
    }, []);

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    return (
        <div className="container rounded bg-white mt-5 mb-5">
            <div className="row">
                <div className='col-md-12 d-flex justify-content-between'>
                    <h2>Liste des trajets :</h2>
                    <Link to="/trajets/add" className='btn btn-primary'>Nouveau trajet</Link>
                </div>
                {
                    data.map((item, index) => (
                        <div className="col-md-4" key={index}>
                            <div className="mt-2 d-flex">
                                <div className="card p-4 mt-3">
                                    <div className="first">
                                        <h6 className="heading d-flex justify-content-between">
                                            <span>{item.villeDepart}</span>
                                            <span>{"-->"}</span>
                                            <span>{item.villeArrive}</span>
                                        </h6>
                                        <div className="time d-flex flex-row align-items-center justify-content-between mt-3">

                                            <div className="d-flex align-items-center">
                                                <i className="fa fa-clock-o clock"></i>
                                                <span className="hour ml-1">
                                                    {item.dateDepart}
                                                </span>
                                            </div>

                                            <div>
                                                <span className="font-weight-bold">{item.prix +" DH"}</span>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="second d-flex flex-row mt-2">
                                        <div className="image mr-3">
                                            <img src="https://i.imgur.com/0LKZQYM.jpg" alt="driver-avatar" className="rounded-circle" width="60" />
                                        </div>

                                        <div className="">

                                            <div className="d-flex flex-row mb-1">

                                                <span>{item.conducteur}</span>

                                                <div className="ratings ml-2">

                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>

                                                </div>

                                            </div>

                                            <div>

                                                <button className="btn btn-outline-dark btn-sm px-2">+ Suivi</button>
                                                <button className="btn btn-outline-dark btn-sm mx-1">Profil</button>

                                            </div>

                                        </div>

                                    </div>

                                    <hr className="line-color" />

                                    <h6>{item.nbPlace +" places"}</h6>
                                    <div className="third mt-4">
                                        <button className="btn btn-success btn-block">
                                            <i className="fa fa-clock-o"></i>
                                            Envoyer une demande
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default RidesList;