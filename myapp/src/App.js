import "./App.css";
import Upload from "./Upload/Upload";
import Table from "./Table/Table";
import NavBar from "./NavBar/NavBar";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/upload">
            <Upload />
          </Route>
          <Route exact path="/query">
            <Table />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
