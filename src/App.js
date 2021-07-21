import React, { useState, useMemo, useEffect } from "react";
import { HeadCounter } from "./Components/Counter";
import { FabButton } from "./Components/FabButton";
import Navbar from "./Components/Navbar";
import { RepositoryList } from "./Components/RepositortList";
import { likesCounter } from "./Services/expensiveCalculation";

const SEARCH = "https://api.github.com/search/repositories";

function App() {
  const [totalLikes, setTotalLikes] = useState(0);
  const [dark, setDark] = useState(false);

  const getRepositories = React.useCallback((query) => {
    return fetch(`${SEARCH}?q=${query}`);
  }, []);

  const toogleDarkmode = () => setDark(!dark);

  const likes = useMemo(() => likesCounter(totalLikes), [totalLikes]);

  const theme = useMemo(() => ({
    color: dark ? "#fff" : "#333",
    navbar: dark ? "#1a202c" : "#e5e7eb",
    backgroundColor: dark ? "#333" : "#fff",
  }), [dark]);



  useEffect(() => console.log('Theme has changed !'), [theme]);

  return (
    <div style={theme} className="App">
      <Navbar theme={theme.navbar} toogleDarkmode={toogleDarkmode} />
      <HeadCounter likes={likes} />
      <RepositoryList getRepositories={getRepositories} />
      <FabButton totalLikes={totalLikes} setTotalLikes={setTotalLikes} />
    </div>
  );
}

export default App;
