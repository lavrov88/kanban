//CARDS

export type CardItemResponse = {
  id: number
  row: ColumnNumber
  seq_num: number
  text: string
}
export type ColumnNumber = '0' | '1' | '2' | '3'

export type UpdateCardResponse= {
  id: number
  row: ColumnNumber
  seq_num: number
  text: string
}


export type DeleteCardResponse = {
  status: number
}


// AUTH

export type LoginResponse = {
  token: string
}

export type CreateUserResponse = {
  username: string
  email: string
  password: string
  token: string
}

// ERROR

export type AxiosErrorObject = {
  errorName: string
  errorMessage: string
}