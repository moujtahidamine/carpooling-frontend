import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { API_URL } from '../../constants';

import car1 from "../../assets/images/car1.JPG";
// import car2 from "../../assets/images/car2.JPG";
// import car3 from "../../assets/images/car3.JPG";

function MyCars(props) {

    const [cars, setCars] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(API_URL + "/cars")
            .then(resp => {
                setCars(resp.data);
                setLoading(false);
            })
            .catch(err => {
                alert("Erreur");
            })
    }, []);

    if(isLoading) return <div className='container'>Chargement...</div>;

    return (
        <div className="container">
        {
            (cars.length === 0)
            ?(
                <div className='container'>
                    <span className='d-block'>Liste vide!</span>
                    <Link to="/mes-voitures/ajout" className='btn-link'>Ajouter une voiture...</Link>
                </div>
            )
            :(
                <div>
                    <div className='d-flex justify-content-between'>
                        <h3>My Cars :</h3>
                        <Link to="/mes-voitures/ajout" className='btn btn-primary'>Ajouter une voiture</Link>
                    </div>
                    <div className='d-flex my-2'>
                        {
                            cars.map(car => {
        
                                return(
                                    <div className='d-flex flex-column border p-2' key={car.id}>
                                        <img width={300} src={car1} alt={"car"+car.id} />
                                        <span>{"Model : "+car.marque}</span>
                                        <span>{"Matricule : "+car.matricule}</span>
                                        <span>{"Etat : "+car.etatVoiture}</span>
                                        <div className='d-flex mt-2'>
                                            <button className='btn btn-success' onClick={()=>alert("En cours de construction...")}>
                                                Editer
                                            </button>
                                            <button className='btn btn-danger mx-1' onClick={()=>alert("En cours de construction...")}>
                                                Supprimer
                                            </button>
                                        </div>
                                    </div>  
                                )
                            })
                        }
                    </div>
                </div>
            )
        }
            
        </div>
    )
}

export default MyCars