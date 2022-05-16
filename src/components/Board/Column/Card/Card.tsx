import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { deleteCard } from '../../../../redux/actions/cards-actions'
import { CardProps } from '../../../../types/props-types'
import './Card.css'

const Card = ({ index, id, text, token, dispatch }: CardProps) => {
  const deleteCardHandler = () => {
    dispatch(deleteCard(id, token))
  }

  return (
  <>
    <Draggable
      key={id}
      draggableId={id + ''}
      index={index}
    >
      {(provided) => {
        return (
          <li
            ref={provided.innerRef}
            className='card'
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{ ...provided.draggableProps.style }}
          >
            <div className="card_id"><strong>id:</strong> {id}</div>
            <div className="card_text">{text}</div>
            <button onClick={deleteCardHandler} className='card_close_btn'>x</button>
          </li>
        )
      }}
    </Draggable>
  </>
  )
}

export default Card