import React from 'react'
import { cardsAPI, usersAPI } from '../../api/api'
import { LoginResponse } from '../../types/api-types'

const  Board = () => {
  const loginAndGetCards = async () => {
    const loginResponse = await usersAPI.login('a_lavrov', 'zxczxctrello')
    console.log(loginResponse)
    if (typeof (loginResponse as LoginResponse).token === 'string') {
      const cards = await cardsAPI.getCards((loginResponse as LoginResponse).token)
      console.log(cards)
    }
  }
  loginAndGetCards()

  return (
    <div>Board</div>
  )
}

export default Board