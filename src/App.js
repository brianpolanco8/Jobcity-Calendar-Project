import React from "react";
import Calendar from "components/Calendar";
import "./App.css";
import { HashRouter, Switch, Route } from "react-router-dom";
import MonthView from "containers/MonthView";

const App = () => {
  return (
    <Calendar>
      <HashRouter>
        <Switch>
          <Route path="/:year/:month" component={MonthView} />
          <Route path="/" exact component={MonthView} />
        </Switch>
      </HashRouter>
    </Calendar>
  );
};

export default App;
