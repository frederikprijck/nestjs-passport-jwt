import React from 'react';

import styles from './app.module.css';

import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';

import { Route, Link, useHistory } from 'react-router-dom';
import { ProtectedPage } from './protected-page';
import { AppState, Auth0Provider, useAuth0 } from '@auth0/auth0-react';

export function AppWrapper() {
  const history = useHistory();
  const onRedirectCallback = (appState: AppState) => {
    // If using a Hash Router, you need to use window.history.replaceState to
    // remove the `code` and `state` query parameters from the callback url.
    // window.history.replaceState({}, document.title, window.location.pathname);
    history.replace((appState && appState.returnTo) || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain="frdrkprck.eu.auth0.com"
      clientId="IJ1pIAk1G4Fd5D0elgte3EifRwfIscVx"
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <App />
    </Auth0Provider>
  );
}

export function App() {
  const history = useHistory();
  const onRedirectCallback = (appState: AppState) => {
    // If using a Hash Router, you need to use window.history.replaceState to
    // remove the `code` and `state` query parameters from the callback url.
    // window.history.replaceState({}, document.title, window.location.pathname);
    history.replace((appState && appState.returnTo) || window.location.pathname);
  };

  return (
    <div className={styles.app}>

      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Route
        path="/"
        exact
        render={() => (
          <div>
            This is the generated root route.{' '}
            <Link to="/page-2">Click here for page 2.</Link>
          </div>
        )}
      />
      <Route
        path="/page-2"
        exact
        render={() => (
          <ProtectedPage />
        )}
      />
      {/* END: routes */}
    </div>
  );
}

export default App;
