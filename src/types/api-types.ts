//CARDS

export type CardItemResponse = {
  id: number
  row: ColumnNumber
  seq_num: number
  text: string
}
export type ColumnNumber = '0' | '1' | '2' | '3'

export type DeleteCardResponse = {
  status: number
}


// AUTH

export type CreateUserObj = {
  username: string
  email?: string
  password: string
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