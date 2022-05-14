export type CardItemResponse = {
  id: number
  row: string
  seq_num: '0' | '1' | '2' | '3'
  text: string
}

export type CreateUserResponse = {
  username: string
  email: string
  password: string
  token: string
}

export type LoginResponse = {
  token: string
}

export type AxiosErrorObject = {
  errorName: string
  errorMessage: string
}