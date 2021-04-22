import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./scss/style.scss";
import i18nContext from "./Shared-Component/i18n-Context";
import AuthContext from "./Shared-Component/Auth-Context";
import { connect } from "react-redux";
import * as authActions from "./store/actions/index";
import { withTranslation, Trans } from "react-i18next";
require("dotenv").config();

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./my-pages/Auth/Login"));
const Register = React.lazy(() => import("./my-pages/Auth/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "en",
    };
  }

  
  
  handleChange = (event) => {
    let newlang = event.target.value;
    this.setState((prevState) => ({ value: newlang }));
    this.props.i18n.changeLanguage(newlang);
  };
  loginHandler = (u,p,r) => {
    this.props.onLogin(u,p,r)
  };
 
  render() {
    const { t, i18n } = this.props;

    return (
      <React.Fragment>
      <AuthContext.Provider
        value={{
          token: this.props.token,
          isLoggedIn: this.props.isLoggedIn,
          login: this.loginHandler,
        }}
        >
        <i18nContext.Provider
          value={{
            value: this.state.value,
            handleChange: (event) => this.handleChange(event),
          }}
          >
          <BrowserRouter>
            <React.Suspense fallback={loading}>
              <Switch>
                <Route
                  exact
                  path="/login"
                  name="Login Page"
                  render={(props) => <Login {...props} />}
                />
                <Route
                  exact
                  path="/register"
                  name="Register Page"
                  render={(props) => <Register {...props} />}
                />
                <Route
                  exact
                  path="/404"
                  name="Page 404"
                  render={(props) => <Page404 {...props} />}
                />
                <Route
                  exact
                  path="/500"
                  name="Page 500"
                  render={(props) => <Page500 {...props} />}
                />
                <Route
                  path="/"
                  name="Home"
                  render={(props) => <TheLayout {...props} />}
                />
              </Switch>
            </React.Suspense>
          </BrowserRouter>
        </i18nContext.Provider>
      </AuthContext.Provider>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("App mapStateToProps", state);
  return {
    mobile: state.authReducer.mobile,
    isLoggedIn: state.authReducer.isLoggedIn,
    token: state.authReducer.token,
    error: state.authReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (mobile, password, rememberMe) => {
      dispatch(authActions.asyncLogin(mobile, password, rememberMe));
    },
  
    // onAuthCheckState: () => {
    //   dispatch(authActions.authCheckState());
    // },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation("translations")(App));
