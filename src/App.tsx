import React, { useReducer, useEffect, useState } from "react";
import styled from "styled-components/macro";
import { initialState, reducer } from "./GameState";
import { GameCtx } from "./context/GameContext";
import { SfxCtx } from "./context/SfxContext";
import { Intro } from "./views/Intro";
import { Menu } from "./views/Menu";
import { Info } from "./views/Info";
import { Game } from "./views/Game";
import { Nick } from "./views/Nick";
import { Highscores } from "./views/Highscores";
import SFX from "./lib/sfx/SFX";


// Atari 2600 emulation wrapper
const Wrapper = styled.div`
  width: var(--native-width);
  height: var(--native-height);
  background-color: var(--color-background);
  color: var(--color-text);
  transform: scale(3);
  transform-origin: top left;
`;

const sfxEngine = new SFX();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [view, setView] = useState(<></>);

  // Pseudo routing
  useEffect(() => {
    switch(state.screen) {
      case "intro":
        setView(<Intro />);
        break;
      case "menu":
        setView(<Menu />);
        break;
      case "info":
        setView(<Info />);
        break;
      case "game":
        setView(<Game />);
        break;
      case "nick":
        setView(<Nick />);
        break;
      case "highscores":
        setView(<Highscores />);
        break;
    }
  }, [state.screen]);

  // Sfx dispatcher
  const playSfx = (sample: string, force?: boolean): void => {
    if (force || state.sound)
      sfxEngine.playSample(sample);
  }

  return (
    <Wrapper className="App">
      <SfxCtx.Provider value={{playSfx}}>
        <GameCtx.Provider value={{state, dispatch}}>
          {view}
        </GameCtx.Provider>
      </SfxCtx.Provider>
    </Wrapper>
  );
}

export default App;
