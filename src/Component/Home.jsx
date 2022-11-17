import React from "react";
import chef from "../images/chef.png";
import Carousel from "react-bootstrap/Carousel";
import chefshow from "../images/chefshow.png";
import burgur from "../images/burgur.png";
import curry from "../images/curry.png";
import egg from "../images/briyani.png";
import breakfast from "../images/breakfast.png";
function Home() {
  return (
    <div className="homeContainer">
      <div className="homeimage">
      <div></div>
        <img className="img-responsive" src={chefshow} alt="blow" />
       
      </div>
      <div className="homeMain">
        <div className="homeTitle"></div>
        <div className="homeDescription">
         <img className=" silder1" src={burgur} alt="burgur" />
         <img className=" silder2" src={egg} alt="egg" />
         <img className=" silder3" src={curry} alt="curry" />
         <img className="silder4" src={breakfast} alt="breakfast" />
         
        </div>
      </div>
    </div>
  );
}

export default Home;
