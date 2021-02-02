import React, { Suspense, Fragment } from 'react';
import { Router, Switch, Route, HashRouter } from 'react-router-dom';
import { routes } from '../src/routes';
import { createBrowserHistory } from 'history';
import AuthContext from "../src/context/AuthContext";
import AuthGuard from '../src/AuthGaurd';
import './custom.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Common/Loader'

// const FOUNDATION_ADDRESS = 'TXdoGJ93xpjL6HZ53ZaN3ER7aUDDzyNaxV';
// const WEBSTORE_URL = 'https://chrome.google.com/webstore/detail/ibnejdfjmmkpcnlpebklmnkoeoihofec/';




const history = createBrowserHistory();

function App() {
  return (
    <div id="globalwrap">
      <AuthContext>
        <HashRouter history={history}>
          <RenderRoutes data={routes} />
        </HashRouter>
      </AuthContext>

    </div>
  );
}

export default App;

function RenderRoutes(props) {
  return (
    <Suspense
      fallback={
        <Loader active={true}></Loader>
      }>
      <Switch>
        {props.data.map((route, i) => {
          const Component = route.component;
          const Guard = route.guard ? AuthGuard : Fragment;
          return (
            <Route
              exact={route.exact}
              key={i}
              path={route.path}
              render={(props) => (
                <Guard>
                  {route.routes
                    ? <RenderRoutes data={route.routes} />
                    : <Component {...props} />}
                </Guard>
              )}
            />
          )
        })}
      </Switch>
    </Suspense>
  )
}
