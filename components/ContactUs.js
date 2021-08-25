import React, { Component } from "react";

export class Contactus extends Component {
  render() {
    return (
      <div className="container-fluid whole-background pb-5" id="contactus">
        <div className="container">
          <div className="row ">
            <div className="col-md-6 ml-4"></div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-8">
            <img className="img imgg-css" src="/pic.Jpeg" alt="logo" />
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-4 pl-4 mt-5">
            <form>
              <div className="">
                <div className="card-body p-3">
                  <div className="about-left my-3">
                    <div className="icon">
                      <h4>
                        Get In <strong> Touch </strong>
                        <br />
                        With Us
                      </h4>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="fa fa-user icon"></i>
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        name="nombre"
                        placeholder="User name"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="fa fa-envelope icon"></i>
                        </div>
                      </div>
                      <input
                        type="email"
                        className="form-control"
                        id="nombre"
                        name="email"
                        placeholder="example@gmail.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="fa fa-comment icon"></i>
                        </div>
                      </div>
                      <textarea
                        className="form-control"
                        placeholder="Write your message"
                        required
                      ></textarea>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-warning btn-block rounded-5 py-2 text-white"
                    >
                      <i className="fa fa-paper-plane text-white pr-3"></i>
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
        
          {/* <div className="row  pt-5">
              <div className="col-1 pt-1">
              
              </div>
              <div className="col-9">
                <h1 className="home-logo-css"> Services Across Pakistan</h1>
              </div>
            </div>
            <div className="row pt-3">
              <div className="col-1 pt-2">
                <i className="far fa-envelope icon"></i>
              </div>
              <div className="col-9">
                <h1 className="home-logo-css pt-2"> Best Quality </h1>
              </div>
            </div>
            <div className="row pt-3">
              <div className="col-1">
              
              </div>
              <div className="col-9">
                <h1 className="home-logo-css ">Best Offers</h1>
              </div>
            </div> */}
        </div>
      </div>
    );
  }
}

export default Contactus;
