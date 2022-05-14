import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Board from './components/Board/Board';
import Header from './components/Header/Header';
import { logIn } from './redux/actions/auth-actions';
import { AppState } from './redux/store';

function App() {
  React.useEffect(() => {
    dispatch(logIn('a_lavrov', 'zxczxctrello'))
  }, [])

  const dispatch = useDispatch()
  const { auth, cards } = useSelector((state: AppState) => ({
    auth: state.auth,
    cards: state.cards
  }))

  return (
    <div className="App">
      <Header />
      <Board cards={cards} dispatch={dispatch} />
    </div>
  );
}

export default App;
