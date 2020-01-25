import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import FormikTest from "./FormTest";
import FormikYupForm from "./FormikYupForm";
import FormikYupMaterialForm from "./FormikYupMaterialForm";
import FormikYupMaterialCustomForm from "./FormikYupMaterialCustomForm";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <br />
            {/* <li>
              <Link to="/">Home</Link>
            </li> */}
            <li>
              <Link to="/FormikTest">
                Formik with Yup Validator and Material-UI Custom Test
              </Link>
            </li>
            
            <li>
              <Link to="/FormikYupForm">
                Formik with Yup Validator with Native Form
              </Link>
            </li>
            
            <li>
              <Link to="/FormikYupMaterialForm">
                Formik with Yup Validator used with Material-UI
              </Link>
            </li>
            <li>
              <Link to="/FormikYupMaterialCustomForm">
                Formik with Yup Validator used with Custom Material-UI
              </Link>
            </li>
          </ul>
          <br />
          <hr />
        </nav>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/FormikTest">
            <FormikTest />
          </Route>

          <Route path="/FormikYupForm">
            <FormikYupForm />
          </Route>

          <Route path="/FormikYupMaterialForm">
            <FormikYupMaterialForm />
          </Route>

          <Route path="/FormikYupMaterialCustomForm">
            <FormikYupMaterialCustomForm />
          </Route>

          {/* <Route path="/">
            <Home />
          </Route> */}
        </Switch>
      </div>
    </Router>
  );
}
// function Home() {
//   return <h2>Home</h2>;
// }
