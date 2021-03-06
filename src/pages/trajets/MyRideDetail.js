import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import "../../styles/RidesList.css";

import axios from "axios";
import { API_URL } from "../../constants";

import { FaArrowRight, FaUser, FaMobileAlt } from "react-icons/fa";
import { Modal, } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

const { confirm } = Modal;

function MyRideDetail(props) {

  const { user: currentUser } = useSelector((state) => state.auth);
  const [id,] = useState(props.match.params.id);
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const history = useHistory()

  useEffect(() => {

    axios.get(API_URL + "/trajets/" + id)
      .then(resp => {
        
        console.log("trajet", resp.data);

        setData(resp.data);
        setLoading(false);
      })
      .catch(err => {
        alert("Erreur...");
      })

  }, [id]);

  const showPromiseConfirm = (idTrajet) => {
    confirm({
      title: 'Voulez-vous vraiment annuler ce trajet?',
      icon: <ExclamationCircleOutlined />,
      content: null,

      onOk() {
        return new Promise((resolve, reject) => {

          axios.delete(API_URL + "/trajets/" + idTrajet)
            .then(resp => {
              history.push("/mes-trajets");
              resolve();
            })
            .catch(err => {
              console.log(err);
              reject();
            })

        }).catch(() => console.log('Oops errors!'));
      },

      onCancel() { },
    });
  };

  const showPromiseConfirmAcceptance = (idUser, idTrajet) => {
    confirm({
      title: 'Voulez-vous vraiment accepter cette demande?',
      icon: <ExclamationCircleOutlined />,
      content: null,

      onOk() {
        return new Promise((resolve, reject) => {

          axios.get(API_URL+"/user/"+idUser+"/trajet/"+idTrajet+"/accept")
            .then(resp => {
              history.push("/mes-trajets");
              resolve();
            })
            .catch(err => {
              console.log(err);
              reject();
            })

        }).catch(() => console.log('Oops errors!'));
      },

      onCancel() { },
    });
  };

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
                      <h6>{"Voiture : " + data.car.marque + " - " + data.car.matricule}</h6>
                      <h6>{data.car.nbPlace + " places"}</h6>
                    </div>

                    <hr className="line-color" />

                    <div className=''>

                      <h5 className='d-block'>Liste des demandes :</h5>
                      <table className="table table-striped" style={{ width: "100%" }}>
                        <tbody>
                          {
                            data.demandes.map(d => (
                              <tr key={d.id}>
                                <td width="5%">{d.id}</td>
                                <td width="40%"> <FaMobileAlt /> {d.email}</td>
                                <td width="35%"><FaUser /> {d.name}</td>
                                <td width="20%">
                                  {
                                    d.pivot.acceptance === '1' 
                                    ?(
                                      <p style={{color:'green'}}>Accept??</p>
                                    )
                                    :(
                                      <button
                                        className='btn btn-success'
                                        onClick={() => showPromiseConfirmAcceptance(d.id, data.trajet.id)}
                                      >
                                        Accepter
                                      </button>
                                    )
                                  }
                                </td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>

                    </div>

                    <div className="third mt-4">
                      <button onClick={() => showPromiseConfirm(data.trajet.id)} className="btn btn-success btn-block">
                        <i className="fa fa-clock-o"></i>
                        Annuler le trajet
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
            : (
              <div className='col-md-12 d-flex justify-content-between'>
                <p>Liste vide...</p>
              </div>
            )
        }

      </div>
    </div>
  )
}

export default MyRideDetail;