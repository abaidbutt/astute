import React, { Component } from "react";
import Link from "next/link";

export class Home extends Component {
  render() {
    return (
      <div style={{ marginTop: "-80px" }}>
        <div className="row">
          <header>
            <div
              id="carouselExampleCaptions"
              class="carousel slide"
              data-bs-ride="carousel"
            >
              <div class="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="0"
                  class="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
              </div>
              <div class="carousel-inner">
                <div
                  class="carousel-item active"
                  style={{
                    backgroundImage: `url('/women3.jpg')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    height: "100vh",
                  }}
                >
                  <div class="carousel-caption">
                    <h1 class="display-3 text-warning">
                      WOMEN <span>EMPOWERMENT</span>
                    </h1>
                    <p class="lead mb-0">
                      “ No one can make you feel inferior without your consent."
                    </p>

                    <Link href="/register">
                      <a
                        className="btn btn-general btn-home btn-outline-warning"
                        role="button"
                        href="#team"
                        title="Start Now"
                      >
                        Become A Seller
                      </a>
                    </Link>
                  </div>
                </div>
                <div
                  class="carousel-item"
                  style={{
                    backgroundImage: `url('/women7.jpg')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    height: "100vh",
                  }}
                >
                  <div class="carousel-caption">
                    <h1 class="display-3 text-warning">
                      Self <span>Assured</span>
                    </h1>
                    <p class="lead mb-0">
                    No matter who you are, no matter what you did, no matter where you’ve come from, you can always change, become a better version of yourself.


                    </p>

                    <Link href="/register">
                      <a
                        className="btn btn-general btn-home btn-outline-warning"
                        role="button"
                        href="#team"
                        title="Start Now"
                      >
                        Become A Seller
                      </a>
                    </Link>
                  </div>
                </div>
                <div
                  class="carousel-item"
                  style={{
                    backgroundImage: `url('/women6.jpg')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    height: "100vh",
                  }}
                >
                  <div class="carousel-caption">
                    <h1 class="display-3 text-warning">
                      WOMEN <span>EMPOWERMENT</span>
                    </h1>
                    <p class="lead mb-0">
                      “ No one can make you feel inferior without your consent."
                    </p>

                    <Link href="/register">
                      <a
                        className="btn btn-general btn-home btn-outline-warning"
                        role="button"
                        href="#team"
                        title="Start Now"
                      >
                        Become A Seller
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </header>

          {/* <div className="col-12">
            <header>
              <div class="overlay"></div>
              <img src="/a.jpeg" />

              <div class="container h-100">
                <div class="d-flex h-100 text-center align-items-center">
                  <div class="w-100 text-white">
                    <h1 class="display-3">
                      WOMEN <span>EMPOWERMENT</span>
                    </h1>
                    <p class="lead mb-0">
                      “ No one can make you feel inferior without your consent."
                    </p>

                    <Link href="/register">
                      <a
                        className="btn btn-general btn-home btn-outline-warning"
                        role="button"
                        href="#team"
                        title="Start Now"
                      >
                        Become A Seller
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <a href="#productScrollId" className="arrow-down">
                <i className="fa fa-angle-down"></i>
              </a>
            </header>
          </div> */}
        </div>
      </div>
    );
  }
}

export default Home;
