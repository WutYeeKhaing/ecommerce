import React, { useState } from 'react';
import './Hero.css';
import hand_icon from '../Assests/hand_icon.png';
import arrow_icon from '../Assests/arrow.png';
import hero_img from '../Assests/hero.png';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


const Hero = ({ sectionRefs }) => {

  const heroData = [
    {
      title: "New Arrival Only",
      subtitle: "New",
      description: "collections",
      additionalText: "for everyone",
      image: hero_img,
      bgColor: "rgb(243, 205, 246), rgb(249, 235, 235)",
      buttonColor: "rgb(137, 104, 140)",
      buttonHoverColor: "rgb(145, 105, 183)",
      buttonScrollTo: "newCollection", // Corresponds to ref key
      buttonText: "New Collections"
    },
    {
      title: "Summer Collection",
      subtitle: "Hot summer",
      description: " styles",
      additionalText: "for you",
      image: hero_img,
      bgColor: "rgb(255, 226, 189), rgb(255, 239, 222)",
      buttonColor: "rgb(255, 156, 43)",
      buttonHoverColor: "rgb(255, 177, 88)",
      buttonScrollTo: "popular", // Scrolls to Popular section
      buttonText: "Popular Items"
    },
    {
      title: "Winter Specials",
      subtitle: "Cozy",
      description: "  winter wear",
      additionalText: "in store",
      image: hero_img,
      bgColor: "rgb(200, 225, 255), rgb(235, 242, 255)",
      buttonColor: "rgb(86, 140, 255)",
      buttonHoverColor: "rgb(107, 155, 255)",
      buttonScrollTo: "offer", // Scrolls to Offer section
      buttonText: "Special Offers"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);


  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? heroData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === heroData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const scrollToSection = (scrollTo) => {
    if (sectionRefs && sectionRefs[scrollTo] && sectionRefs[scrollTo].current) {
      sectionRefs[scrollTo].current.scrollIntoView({ behavior: 'smooth' });
    } else {
       console.error(`Ref for section ${scrollTo} not found or not a valid object.`)
    }
  };
  const currentHero = heroData[currentIndex];

  return (
    <div 
      className="hero"
      style={{
        background: `linear-gradient(180deg, ${currentHero.bgColor})`
      }}
    >
      <button className="nav-button left" onClick={handlePrevious}>
        <FaChevronLeft className="nav-icon" />
      </button>

      <button className="nav-button right" onClick={handleNext}>
        <FaChevronRight className="nav-icon" />
      </button>

      <div className="hero-left">
        <h2>{currentHero.title}</h2>
        <div>
          <div className="hand-icon">
            <p>{currentHero.subtitle}</p>
            <img src={hand_icon} alt=""/>
          </div>
          <p>{currentHero.description}</p>
          <p>{currentHero.additionalText}</p>
        </div>
        <div 
          className="hero-lastest-btn" 
          onClick={() => scrollToSection(currentHero.buttonScrollTo)} // Use scrollToSection function
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            background: isHovered ? currentHero.buttonHoverColor : currentHero.buttonColor
          }}
        >
          <div>{currentHero.buttonText}</div>
          <img src={arrow_icon} alt=""/>
        </div>
      </div>

      <div className="hero-right">
        <img src={currentHero.image} alt=""/>
      </div>

      <div className="nav-dots">
        {heroData.map((_, index) => (
          <button
            key={index}
            className={`nav-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;