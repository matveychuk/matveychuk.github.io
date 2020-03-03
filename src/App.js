import React, { useEffect } from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import { Header, Footer } from "./components/common";
import About from "./components/about/About";
import Portfolio from "./components/portfolio/Portfolio";
import Project from "./components/portfolio/Project";
import Testimonials from "./components/testimonials/Testimonials";
import Contacts from "./components/contacts/Contacts";

function App({ location, history }) {
  useEffect(() => {
    if (location.pathname === "/") {
      history.push("/about");
    }
  });
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/about" component={About} />
        <Route exact path="/portfolio" component={Portfolio} />
        <Route exact path="/portfolio/:project" component={Project} />
        <Route exact path="/testimonials" component={Testimonials} />
        <Route exact path="/contacts" component={Contacts} />
        <Route path="/*" component={About} />
      </Switch>
      <Footer />
    </>
  );
}

export default withRouter(App);
