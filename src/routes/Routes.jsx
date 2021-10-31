import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import MovieSelected from "../pages/MovieSelected";
import PersonSelected from "../pages/PersonSelected";
import TVSelected from "../pages/TVSelected";


function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/movie/:id">
          <MovieSelected />
        </Route>
        <Route path="/tv/:id">
          <TVSelected/>
        </Route>

        <Route path="/person/:id">
          <PersonSelected />
        </Route>
        <Route>
          <Home/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
