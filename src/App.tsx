import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import './App-mobile.css'
import Board from './components/Board/Board';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import { AppState } from './redux/store';

function App() {

  const dispatch = useDispatch()
  const { auth, cards } = useSelector((state: AppState) => ({
    auth: state.auth,
    cards: state.cards
  }))

  return (
    <div className="App">
      <Header 
        currentUsername={auth.currentUsername} 
        isLogged={auth.isLogged} 
        dispatch={dispatch} 
      />
      {!auth.isLogged && 
      <Login 
        currentUsername={auth.currentUsername}
        authError={auth.authError} 
        regError={auth.regError} 
        dispatch={dispatch} 
      />}
      {auth.isLogged && 
      <Board 
        cards={cards} 
        dispatch={dispatch} 
        token={auth.token as string} 
      />}
    </div>
  );
}

export default App;
