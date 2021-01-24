import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import Navbarheader from "./components/layout/Navbar";

import './App.css';
import { Provider } from "react-redux";
import store from "./store";

import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import MasterPart from "./components/master/Part";
import MasterGoods from "./components/master/Goods";
import MasterSite from "./components/master/Site";
import MasterSupplier from "./components/master/Supplier";
import PurchasingRequest from "./components/purchasing/Request";
import PurchasingQuotation from "./components/purchasing/Quotation";
import PurchasingInvoice from "./components/purchasing/Invoice";
import PurchasingPo from "./components/purchasing/Po";
import PurchasingReceipt from "./components/purchasing/Receipt";
import SalesOrder from "./components/sales/Order";
import SalesInvoice from "./components/sales/Invoice";
import SalesReceipt from "./components/sales/Receipt";
import SalesSentitem from "./components/sales/Sentitem";
import RequestUse from "./components/request/Use";
import RequestMutation from "./components/request/Mutation";
import RequestDeliverynote from "./components/request/Deliverynote";

if (localStorage.jwtToken) {  
  const token = localStorage.jwtToken;  
  setAuthToken(token);  
  const decoded = jwt_decode(token);  
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000; // to get in milliseconds  
  if (decoded.exp < currentTime) {    
    store.dispatch(logoutUser());    
    window.location.href = "./login";
  }
}

 class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <Router>
              <Switch>
              <div className="App">              
              <Navbarheader /> 
                  <Route exact path="/" component={Landing} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />                  
                  <PrivateRoute path="/dashboard" component={Dashboard} />
                  <PrivateRoute path="/master/part" component={MasterPart} />
                  <PrivateRoute path="/master/goods" component={MasterGoods} />
                  <PrivateRoute path="/master/site" component={MasterSite} />
                  <PrivateRoute path="/master/supplier" component={MasterSupplier} />
                  <PrivateRoute path="/purchasing/request" component={PurchasingRequest} />
                  <PrivateRoute path="/purchasing/quotation" component={PurchasingQuotation} />
                  <PrivateRoute path="/purchasing/invoice" component={PurchasingInvoice} />
                  <PrivateRoute path="/purchasing/sendpo" component={PurchasingPo} />
                  <PrivateRoute path="/purchasing/receipt" component={PurchasingReceipt} />
                  <PrivateRoute path="/sales/order" component={SalesOrder} />
                  <PrivateRoute path="/sales/invoice" component={SalesInvoice} />
                  <PrivateRoute path="/sales/receipt" component={SalesReceipt} />
                  <PrivateRoute path="/sales/sentitem" component={SalesSentitem} />
                  <PrivateRoute path="/request/use" component={RequestUse} />
                  <PrivateRoute path="/request/mutation" component={RequestMutation} />              
                  <PrivateRoute path="/request/deliverynote" component={RequestDeliverynote} />
              </div>
              </Switch>                
          </Router>
      </Provider>    
    );
  }
}

export default App;
