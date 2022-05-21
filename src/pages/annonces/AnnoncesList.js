import React, { useEffect, useState } from 'react';
import "../../styles/AnnoncesList.css";

function AnnoncesList(props) {

    const [data, setData] = useState([]);

    useEffect(() => {
        setData([{}, {}, {}, {}, {}, {}, {}, {}]);
    }, []);

    return (
        <div className="container rounded bg-white mt-5 mb-5">
            <div className="row">
                <div className='col-md-12'>
                    <h2>Liste des annonces :</h2>
                </div>
                {
                    data.map(item => (
                        <div className="col-md-4">
                            <div className="mt-2 d-flex">
                                <div className="card p-4 mt-3">
                                    <div className="first">
                                        <h6 className="heading">{"Kenitra -> Tanger"}</h6>
                                        <div className="time d-flex flex-row align-items-center justify-content-between mt-3">

                                            <div className="d-flex align-items-center">
                                                <i className="fa fa-clock-o clock"></i>
                                                <span className="hour ml-1">3 hrs</span>
                                            </div>

                                            <div>
                                                <span className="font-weight-bold">90 DH</span>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="second d-flex flex-row mt-2">
                                        <div className="image mr-3">
                                            <img src="https://i.imgur.com/0LKZQYM.jpg" alt="driver-avatar" className="rounded-circle" width="60" />
                                        </div>

                                        <div className="">

                                            <div className="d-flex flex-row mb-1">

                                                <span>@hairtaje</span>

                                                <div className="ratings ml-2">

                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>

                                                </div>

                                            </div>

                                            <div>

                                                <button className="btn btn-outline-dark btn-sm px-2">+ follow</button>
                                                <button className="btn btn-outline-dark btn-sm mx-1">See Profile</button>

                                            </div>

                                        </div>

                                    </div>

                                    <hr className="line-color" />

                                    <h6>48 comments</h6>
                                    <div className="third mt-4">

                                        <button className="btn btn-success btn-block"><i className="fa fa-clock-o"></i>Join</button>


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

export default AnnoncesList;