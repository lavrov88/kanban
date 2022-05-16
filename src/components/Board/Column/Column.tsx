import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { useSelector } from 'react-redux'
import { addNewCard, closeNewCardMenu, editNewCardText, openNewCardMenu } from '../../../redux/actions/cards-actions'
import { AppState } from '../../../redux/store'
import { ColumnProps } from '../../../types/props-types'
import Card from './Card/Card'
import './Column.css'

function Column({ data, name, color, columnId, dispatch }: ColumnProps) {
  const token = useSelector((state: AppState ) => state.auth.token)

  const openNewCardEditorHandler = () => {
    dispatch(openNewCardMenu(columnId))
  }
  
  const closeNewCardEditorHandler = () => {
    dispatch(closeNewCardMenu(columnId))
  }

  const newCardTextChangeHandler = (e: any) => {
    dispatch(editNewCardText(columnId, e.target.value))
  }

  const addNewCardHandler = (e: any) => {
    e.preventDefault()
    if (data.newCardText) {
      dispatch(addNewCard(columnId, data.newCardText, token as string))
    }
  }

  return (
    <div className='column'>
      <div className={"column_header column_header_" + color}>
        {`${name} (${data.cards.length})`}
      </div>
      <div className="column_main">
        <Droppable droppableId={columnId}>
          {(provided, snapshot) => {
            return (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  background: snapshot.isDraggingOver
                    ? '#ffffff10'
                    : 'transparent'
                }}
              >
                {data.cards.map((c, i) => {
                  return (
                    <Card 
                      key={c.id}
                      index={i}
                      id={c.id}
                      text={c.text}
                      token={token as string}
                      dispatch={dispatch}
                    />
                  )
                })}
                {provided.placeholder}
              </ul>
            )
          }}
        </Droppable>
      </div>
      <div className="column_footer">
        { data.newCardIsOpened && 
        <form>
          <textarea 
            className="column_new_card_text"
            placeholder='Введите название для этой карточки'
            value={data.newCardText}
            onChange={newCardTextChangeHandler}
          />
          <div className="column_new_card_btns">
            <button 
              className='column_btn column_new_card_add_btn'
              onClick={addNewCardHandler}
            >
              Добавить карточку
            </button>
            <button
              className='column_btn column_new_card_cancel_btn'
              onClick={closeNewCardEditorHandler}
            >
              X
            </button>
          </div>
        </form>}
        { !data.newCardIsOpened && 
        <button 
          className='column_btn column_add_card_btn'
          onClick={openNewCardEditorHandler}
        >
          + Добавить карточку
        </button>}
      </div>
    </div>
  )
}

export default Column