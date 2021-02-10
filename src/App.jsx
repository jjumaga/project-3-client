import React from "react";
import { Switch, Route } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
//import { faReact } from "@fortawesome/free-brands-svg-icons";
import {
  faEdit,
  faTrash,
  faFileUpload,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";

import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import CreateDocument from "./pages/CreateDocument";
import UpdateDocument from "./pages/UpdateDocument";
import PatientList from "./pages/PatientList";
import MyPatients from "./pages/MyPatients";

library.add(faEdit, faTrash, faFileUpload, faCoffee);

function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <ProtectedRoute
          exact
          path="/CreateDocument/:id"
          component={CreateDocument}
        />
        <ProtectedRoute
          exact
          path="/UpdateDocument/:id"
          component={UpdateDocument}
        />
        <ProtectedRoute exact path="/PatientList" component={PatientList} />
        <ProtectedRoute exact path="/MyPatients" component={MyPatients} />
        <ProtectedRoute exact path="/Profile/:id" component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
