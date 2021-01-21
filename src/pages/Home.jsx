import React from "react";
import "../styles/home.css";
import background from "../../src/homepage-banner.png";

class Home extends React.Component {
  render() {
    return (
      <div class="home-page">
        <header>
          <h1 id="header-title">Health Hub</h1>
          <p id="header-desc">
            Allowing healthcare professionals to communicate patient information
            <br />
            seamlessly through an easy-to-use and industry tested platform.
          </p>
        </header>
        <body id="home-body">
          <section id="section-1" className="home-section">
            <h2 className="section-title">Save Time</h2>
            <p className="section-desc">
              Health Hub brings all health care organisations to one place
              through its easy-to-use and platform, so you can focus on what's
              most important.
            </p>
          </section>
          <section id="section-2" class="home-section">
            <h2 className="section-title">Don't Miss a Thing</h2>
            <p className="section-desc">
              You are receiving a new patient in hospice that has come from home
              care? Every part of your patients' history is linked to their
              profile, from prescriptions to daily journals.
            </p>
          </section>
          <section id="section-3" class="home-section">
            <h2 className="section-title">Peace of Mind</h2>
            <p className="section-desc">
              Your patients and their family can relax knowing that you have all
              the information you need to give the best care possible.
            </p>
          </section>
        </body>
        <footer id="home-footer">
          An Ironhack project made with react, blood, sweat and tears by
          Jacqueline Jumaga
        </footer>
      </div>
    );
  }
}

export default Home;
