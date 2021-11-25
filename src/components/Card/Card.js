import React from 'react'
import typeColors from '../../forColors/color'
import './Card.css';

export const Card = ({pokeymon}) => {
  return (
      <div className="Card">
          <div className="Card__img">
              <img src={pokeymon.sprites.front_default} alt="" />
          </div>
          <div className="Card__name">
              {pokeymon.name}
          </div>
          <div className="Card__types">
              {
                  pokeymon.types.map(type => {
                      return (
                          <div className="Card__type" style={{ backgroundColor: typeColors[type.type.name] }}>
                              {type.type.name}
                          </div>
                      )
                  })
              }
          </div>
          <div className="Card__info">
              <div className="Card__data Card__data--weight">
                  <p className="title">Weight</p>
                  <p>{pokeymon.weight}</p>
              </div>
              <div className="Card__data Card__data--weight">
                  <p className="title">Height</p>
                  <p>{pokeymon.height}</p>
              </div>
              <div className="Card__data Card__data--ability">
                  <p className="title">Ability</p>
                  <p>{pokeymon.abilities[0].ability.name}</p>
              </div>
          </div>
      </div>
  ); 
}
export default Card;
