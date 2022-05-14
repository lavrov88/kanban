import React from 'react'
import { deleteCard } from '../../../../redux/actions/cards-actions'
import { CardProps } from '../../../../types/props-types'
import './Card.css'

const Card = ({ id, text, token, dispatch }: CardProps) => {
  const deleteCardHandler = () => {
    dispatch(deleteCard(id, token))
  }

  return (
    <div className='card'>
      <div className="card_id"><strong>id:</strong> {id}</div>
      <div className="card_text">{text}</div>
      <button onClick={deleteCardHandler} className='card_close_btn'>x</button>
    </div>
  )
}

export default Card