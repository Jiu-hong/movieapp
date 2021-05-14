import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from "./components/Nav/Nav";
import Movies from "./components/Movies/Movies";
import UCMovies from "./components/UCMovies/UCMovies";
import PPMovies from "./components/PPMovies/PPMovies";
import RCMovies from "./components/RCMovies/RCMovies";
import TOPMovies from "./components/TOPMovies/TOPMovies";
import Detail from "./components/Detail/Detail";

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [uccurrentPage, setUccurrentPage] = useState(1);
  const [ppcurrentPage, setPpcurrentPage] = useState(1);
  const [rccurrentPage, setRccurrentPage] = useState(1);
  const [topcurrentPage, setTopcurrentPage] = useState(1);
  return (
    <div>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/">
            <Movies currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </Route>
          <Route path="/upcoming">
            <UCMovies
              uccurrentPage={uccurrentPage}
              setUccurrentPage={setUccurrentPage}
            />
          </Route>
          <Route path="/popular">
            <PPMovies
              ppcurrentPage={ppcurrentPage}
              setPpcurrentPage={setPpcurrentPage}
            />
          </Route>
          <Route path="/recommendations/:movieid">
            <RCMovies
              rccurrentPage={rccurrentPage}
              setRccurrentPage={setRccurrentPage}
            />
          </Route>
          <Route path="/top">
            <TOPMovies
              topcurrentPage={topcurrentPage}
              setTopcurrentPage={setTopcurrentPage}
            />
          </Route>
          <Route path="/detail/:movieid">
            <Detail />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
