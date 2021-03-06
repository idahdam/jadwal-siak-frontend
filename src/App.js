import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Main from './pages/main';
import Page404 from './pages/404';
import About from './pages/about';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main}/>
            <Route exact path="/about" component={About}/>
            <Route component={Page404}/>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
