import React, { useReducer } from 'react';
import { initialState, reducer } from './GameState';
import { TestButton } from './components/TestButton';
import { GameCtx } from './context/GameContext';
import { GlobalStyles } from './GlobalStyles';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <GlobalStyles />
      <GameCtx.Provider value={{state, dispatch}}>
        <TestButton />
      </GameCtx.Provider>
      <div>{state.screen}</div>
      <div>{state.points}</div>
      <div>{state.nickname}</div>
    </div>
  );
}

export default App;
