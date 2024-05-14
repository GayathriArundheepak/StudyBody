import React from 'react';
import './About.scss';
// import aboutImage from '../../images/about.png';

const About: React.FC = () => {
  return (
    <section id="about">
      <div className="container-fluid">
        <div className="row">
          <img src='' alt="about" />
          <div className="col-lg-6 col-md-6 col-12">
            <h1>ABOUT US</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae, quod, quae inventore facere veritatis
              error ut consequatur quidem commodi cupiditate eius! <br />
              Numquam similique assumenda cupiditate possimus voluptatum deserunt cum perspiciatis. Lorem ipsum dolor
              sit, amet consectetur adipisicing elit. Beatae, quod, quae inventore facere veritatis error ut
              consequatur quidem commodi cupiditate eius! <br />
              Numquam similique assumenda cupiditate possimus voluptatum deserunt cum perspiciatis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
