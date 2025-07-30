// import { useState } from 'react'
import './Card.css'
import more from './more.png'
import { Link } from 'react-router-dom'


const Card = (props) =>  {
  return (
      <div className="Card">
          <Link to={'edit/'+ props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
          <h2 className="name">{props.name}</h2>
          <h3 className="description">{"Speed: " + props.speed}</h3>
          <p className="description">{"Strength: " + props.strength}</p>
      </div>
  );
};

export default Card