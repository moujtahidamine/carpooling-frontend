import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import "../../styles/RidesList.css";

import axios from "axios";
import { API_URL } from "../../constants";

import { FaArrowRight } from "react-icons/fa";

// const trajets = [
//     {
//         id:1,
//         villeDepart:"Kenitra",
//         villeArrive:"Rabat",
//         dateDepart:"26/05/2022",
//         prix:30,
//         nbPlace:3,
//         conducteur:"Achbari Salma",
//     },
//     {
//         id:2,
//         villeDepart:"Sale",
//         villeArrive:"Fes",
//         dateDepart:"26/05/2022",
//         prix:30,
//         nbPlace:3,
//         conducteur:"Eddissi Saad",
//     },
//     {
//         id:3,
//         villeDepart:"Tanger",
//         villeArrive:"Casablanca",
//         dateDepart:"22/05/2022",
//         prix:30,
//         nbPlace:3,
//         conducteur:"Amghar Ayoub",
//     },
//     {
//         id:4,
//         villeDepart:"Kenitra",
//         villeArrive:"Tanger",
//         dateDepart:"20/05/2022",
//         prix:30,
//         nbPlace:3,
//         conducteur:"Benmoussa Dounia",
//     },
// ];

function MyRides(props) {

  const { user: currentUser } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {

    axios.get(API_URL + "/trajets/")
      .then(resp => {
        setData(resp.data);
        setLoading(false);
      })
      .catch(err => {
        alert("Erreur...");
      })

    // setTimeout(() => {
    //   setData([]);
    //   setLoading(false);
    // }, 1000);
  }, []);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  if (isLoading) return "Chargement..."
  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className='col-md-12 d-flex justify-content-between'>
          <h2>Mes annonces :</h2>
          <Link to="/trajets/ajout" className='btn btn-primary'>Nouveau trajet</Link>
        </div>
        {
          (data.length > 0)
            ? data.map((item, index) => (
              <div className="col-md-4" key={index}>
                <div className="mt-2 d-flex">
                  <div className="card p-4 mt-3" style={{ width: "100%" }}>
                    <div className="first">
                      <h6 className="heading d-flex justify-content-between">
                        <span>{item.villeDepart}</span>
                        <span>
                          <FaArrowRight />
                        </span>
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
                          <span className="font-weight-bold">{item.prix + " DH"}</span>
                        </div>
                      </div>

                    </div>
                    <div className="second d-flex flex-row mt-2">

                    </div>

                    <hr className="line-color" />

                    <div className='d-flex justify-content-between'>                                
                        <h6>{"Voiture : DACIA"}</h6>
                        <h6>{item.nbPlace + " places"}</h6>
                    </div>

                    <div className="third mt-4">
                      <Link to={"/mes-trajets/"+item.id} className="btn btn-success btn-block">
                        <i className="fa fa-clock-o"></i>
                        Afficher plus de detail
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
            : (
              <div className='col-md-12'>
                <p>Liste vide...</p>
              </div>
            )
        }

      </div>
    </div>
  )
}

export default MyRides;