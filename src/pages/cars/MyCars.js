import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

const carsData = [
    {
        id:1,
        model:"DACIA",
        color:"BLACK",
        etat:"Bon",
        img:"https://s3-eu-west-1.amazonaws.com/assetseu.izmocars.com/userfiles/100344/Dacia/Sandero/Black_Touch_/sandero-sl-black-touch2.jpg"
    },
    {
        id:2,
        model:"CLIO",
        color:"BLUE",
        etat:"Noeuf",
        img:"https://4.bp.blogspot.com/-L7iB7ekpcmc/XKOuItmCC0I/AAAAAAAAZO0/R-li0HHRDhYdCDitg-tH0bvi9MQKa4bXgCLcBGAs/w1200-h630-p-k-no-nu/renault-clio-bleu-iron-couleurs-v.jpg"
    },
]

function MyCars(props) {

    const [cars, setCars] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setCars(carsData);
            setLoading(false);
        }, 1000);
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
                                        <img width={300} src={car.img} alt={"car"+car.id} />
                                        <span>{"Model : "+car.model}</span>
                                        <span>{"Etat : "+car.etat}</span>
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