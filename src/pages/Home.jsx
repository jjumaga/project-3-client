import React from "react";
import "../styles/home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Home extends React.Component {
  render() {
    return (
      <body className="home-page">
        <header>
          <p className="header-desc">
            Allowing healthcare professionals to communicate patient information
            <br />
            seamlessly through an easy-to-use and industry tested platform.
          </p>
        </header>
        <hr />
        <div className="home-body">
          <section className="home-intro">
            <h2 className="section-title">Save Time</h2>
            <p className="section-desc">
              Health Hub brings all health care organisations to one place
              through its easy-to-use platform, so you can focus on what's most
              important.
            </p>
          </section>
          <section className="home-intro">
            <h2 className="section-title">Don't Miss a Thing</h2>
            <p className="section-desc">
              A new patient is transfering to hospice from home care? Every part
              of your patients' history is linked to their profile, from
              prescriptions to daily journals.
            </p>
          </section>
          <section className="home-intro">
            <h2 className="section-title">Peace of Mind</h2>
            <p className="section-desc">
              Your patients and their family can relax knowing that you have all
              the information you need to give the best care possible.
            </p>
          </section>
        </div>
        <footer className="home-footer">
          An Ironhack SPA project made with react, express, and{" "}
          <FontAwesomeIcon icon="coffee" /> by Jacqueline Jumaga
        </footer>
      </body>
    );
  }
}

export default Home;
