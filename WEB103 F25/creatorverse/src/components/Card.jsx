import './Card.css'
import more from '../assets/more.png'
import { Link } from 'react-router-dom'

const Card = (props) =>  {
  return (
      <div className="Card">
          <Link to={'/creator/'+ props.id + '/edit'}><img className="moreButton" alt="edit button" src={more} /></Link>
          <h2 className="name">{props.name}</h2>
          <h4 className='link'>{props.url}</h4>
          <p className="description">{props.desc}</p>
      </div>
  );
};

export default Card