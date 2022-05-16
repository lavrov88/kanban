import React from 'react'
import Column from './Column/Column'
import { DragDropContext } from 'react-beautiful-dnd'
import './Board.css'
import { BoardProps, ColumnColors } from '../../types/props-types'
import { ColumnNumber } from '../../types/api-types'
import { fetchCards, moveCard } from '../../redux/actions/cards-actions'

const  Board = ({ cards, dispatch, token }: BoardProps) => {
  React.useEffect(() => {
    dispatch(fetchCards(token))
  }, [])

  const columns = [
    { id: '0', data: cards[0], name: 'On hold', color: 'red' },
    { id: '1', data: cards[1], name: 'In progress', color: 'blue' },
    { id: '2', data: cards[2], name: 'Needs review', color: 'yellow' },
    { id: '3', data: cards[3], name: 'Approved', color: 'green' }
  ]

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }
    if (destination.droppableId === source.droppableId
        && destination.index === source.index) {
      return
    }

    dispatch(moveCard(
      +draggableId,
      { column: source.droppableId, index: source.index },
      { column: destination.droppableId, index: destination.index },
      cards,
      token
    ))
  }

  return (
    <div className='main'>
      <DragDropContext
        onDragEnd={result => onDragEnd(result)}
      >
        {columns.map(c => <Column 
                            key={c.id}
                            columnId={c.id as ColumnNumber}
                            data={c.data}
                            dispatch={dispatch}
                            name={c.name} 
                            color={c.color as ColumnColors} />)}
      </DragDropContext>
    </div>
  )
}

export default Board