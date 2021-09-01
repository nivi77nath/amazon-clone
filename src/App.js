import React, { useEffect, useContext } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import Orders from "./Orders";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "./firebase";
import { StateContext } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51JCOY7AQAlFbdgBe2PtZMIZVrdBAtdvBVwtaGbDHLR7orAPUR8fTq6PpQs4RHNjNqxq5acvOpZlIigRS60fbgyjj009PmpzQgD"
);

function App() {
  const { userDispatch } = useContext(StateContext);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("The USER IS >>>> ", authUser);

      if (authUser) {
        userDispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        userDispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;