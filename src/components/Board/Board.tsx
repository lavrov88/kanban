import React from 'react'
import Column from './Column/Column'
import './Board.css'
import { BoardProps, ColumnColors } from '../../types/props-types'
import { ColumnNumber } from '../../types/api-types'

const  Board = ({ cards, dispatch }: BoardProps) => {
  const columns = [
    { id: '0', data: cards[0], name: 'On hold', color: 'red' },
    { id: '1', data: cards[1], name: 'In progress', color: 'blue' },
    { id: '2', data: cards[2], name: 'Needs review', color: 'yellow' },
    { id: '3', data: cards[3], name: 'Approved', color: 'green' }
  ]

  return (
    <div className='main'>
      {columns.map(c => <Column 
                          key={c.id}
                          columnId={c.id as ColumnNumber}
                          data={c.data}
                          dispatch={dispatch}
                          name={c.name} 
                          color={c.color as ColumnColors} />)}
    </div>
  )
}

export default Board