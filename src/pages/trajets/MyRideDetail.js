import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import "../../styles/RidesList.css";

import axios from "axios";
import { API_URL } from "../../constants";

import { FaArrowRight, FaUser, FaMobileAlt } from "react-icons/fa";

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

const demandes = [
  {
    id:1,
    contact:"+212 676 77 88 91",
    nom:"Ali HJK"
  },
  {
    id:2,
    contact:"+212 698 34 21 22",
    nom:"Samira ABC"
  },
  {
    id:3,
    contact:"+212 661 31 88 91",
    nom:"Ahmad XYZ"
  },
  {
    id:4,
    contact:"+212 645 77 12 91",
    nom:"Ali OUY"
  },
  
];

function MyRideDetail(props) {

  const { user: currentUser } = useSelector((state) => state.auth);
  const [id, ] = useState(props.match.params.id);
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {

    axios.get(API_URL + "/trajets/" + id)
    .then(resp => {
      console.log(resp.data);
      setData(resp.data);
      setLoading(false);
    })
    .catch(err => {
      alert("Erreur...");
    })

  }, [id]);

  const onCancelTrajet = () => {
    alert("Annulation du trajet Numero "+id);
  }

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  if (isLoading) return "Chargement..."
  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className='col-md-12 d-flex justify-content-between'>
          <h2>Annonce #{id} :</h2>
          <Link to="/trajets/ajout" className='btn btn-primary'>Nouveau trajet</Link>
        </div>
        {
          (data !== null)
            ? (
              <div className="col-md-12">
                <div className="mt-2 d-flex">
                  <div className="card p-4 mt-3" style={{ width: "100%" }}>
                    <div className="first">
                      <h6 className="heading d-flex justify-content-between">
                        <span>{data.trajet.villeDepart}</span>
                        <span>
                          <FaArrowRight />
                        </span>
                        <span>{data.trajet.villeArrive}</span>
                      </h6>
                      <div className="time d-flex flex-row align-items-center justify-content-between mt-3">

                        <div className="d-flex align-items-center">
                          <i className="fa fa-clock-o clock"></i>
                          <span className="hour ml-1">
                            {data.trajet.dateDepart}
                          </span>
                        </div>

                        <div>
                          <span className="font-weight-bold">{data.trajet.prix + " DH"}</span>
                        </div>
                      </div>

                    </div>
                    <div className="second d-flex flex-row mt-2">

                    </div>

                    <hr className="line-color" />

                    <div className='d-flex justify-content-between'>
                      <h6>{"Voiture : "+data.car.marque+" - "+data.car.matricule}</h6>
                      <h6>{data.car.nbPlace + " places"}</h6>
                    </div>

                    <hr className="line-color" />

                    <div className=''>

                      <h5 className='d-block'>Liste des demandes :</h5>
                      <table className="table table-striped" style={{width:"50%"}}>
                        <tbody>
                          {
                            demandes.map( d => (
                              <tr key={d.id}>
                                <td width="5%">{d.id}</td>
                                <td  width="35%"> <FaMobileAlt /> {d.contact}</td>
                                <td  width="30%"><FaUser /> {d.nom}</td>
                                <td  width="30%">
                                  <button className='btn btn-success'>
                                    Accepter
                                  </button>
                                </td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>

                    </div>

                    <div className="third mt-4">
                      <button onClick={onCancelTrajet} className="btn btn-success btn-block">
                        <i className="fa fa-clock-o"></i>
                        Annuler le trajet
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
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

export default MyRideDetail;