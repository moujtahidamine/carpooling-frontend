import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";

const BoardAdmin = () => {

  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {

  }, []);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  if (currentUser && currentUser.user && currentUser.user.isAdmin === '0') {
    return <Redirect to="/" />
  }

  return (
    <div className="container">
      <div>
        <div class="grey-bg container-fluid">
          <section id="minimal-statistics">
            <div class="row">
              <div class="col-12 mt-3">
                <h2 class="text-uppercase">Adminitration panel</h2>
                <p>Statistics.</p>
              </div>
            </div>
            <div class="row">
              <div class="col-xl-3 col-sm-6 col-12">
                <div class="card">
                  <div class="card-content">
                    <div class="card-body">
                      <div class="media d-flex">
                        <div class="align-self-center">
                          <i class="icon-pencil primary font-large-2 float-left"></i>
                        </div>
                        <div class="media-body text-right">
                          <h3>12</h3>
                          <span>Total Trajets</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-sm-6 col-12">
                <div class="card">
                  <div class="card-content">
                    <div class="card-body">
                      <div class="media d-flex">
                        <div class="align-self-center">
                          <i class="icon-speech warning font-large-2 float-left"></i>
                        </div>
                        <div class="media-body text-right">
                          <h3>23</h3>
                          <span>Total Voitures</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-sm-6 col-12">
                <div class="card">
                  <div class="card-content">
                    <div class="card-body">
                      <div class="media d-flex">
                        <div class="align-self-center">
                          <i class="icon-graph success font-large-2 float-left"></i>
                        </div>
                        <div class="media-body text-right">
                          <h3>70.89 %</h3>
                          <span>Utilisateurs satisfait</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-sm-6 col-12">
                <div class="card" style={{backgroundColor:'red', color :'#fff'}}>
                  <div class="card-content">
                    <div class="card-body">
                      <div class="media d-flex">
                        <div class="align-self-center">
                          <i class="icon-pointer danger font-large-2 float-left"></i>
                        </div>
                        <div class="media-body text-right">
                          <h3 style={{ color :'#fff'}}>3</h3>
                          <span>Nombre de signal</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BoardAdmin;
