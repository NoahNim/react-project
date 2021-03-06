import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage/index';
import SignupFormPage from './components/SignUpFormPage';
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Homepage from "./components/Homepage";
import AlbumsPage from './components/Albums/index';
import Album from './components/Albums/album';
import CreateAlbum from './components/Albums/createAlbum';
import EditAlbum from './components/Albums/editAlbum';
// import Photo from './components/Photos/index';
import NewPhoto from './components/Photos/createPhoto';
// import EditPhoto from './components/Photos/editPhoto';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
     dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
  }, [dispatch])
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {
        isLoaded && (
          <Switch>
            <Route path="/" exact={true}>
              <Homepage />
            </Route>
            <Route path="/login" exact={true}>
              <LoginFormPage />
            </Route>
            <Route path="/signup" exact={true}>
              <SignupFormPage />
            </Route>
            <Route path="/album" exact={true}>
              <AlbumsPage />
            </Route>
            <Route path="/album/new" exact={true}>
              <CreateAlbum />
            </Route>
            <Route path="/album/:id" exact={true}>
              <Album />
            </Route>
            <Route path="/album/:id/edit" exact={true}>
              <EditAlbum />
            </Route>
            {/* <Route path="/photo/:id" exact={true}>
              <Photo />
            </Route>
            <Route path="/photo/:id/edit" exact={true}>
              <EditPhoto />
            </Route> */}
            <Route path="/photo/album/:id/new-photo" exact={true}>
              <NewPhoto />
            </Route>
          </Switch>
        )
      }
    </>
  );
}

export default App;
