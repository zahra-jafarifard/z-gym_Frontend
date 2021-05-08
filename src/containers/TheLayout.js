import React from 'react';
import {Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation, Trans } from "react-i18next";

import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'

const TheLayout = (props) => {

  return (
    <React.Fragment>
      {(!props.isLoggedIn && !props.token) && <Redirect to="/login" />}
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
    </div>
    </React.Fragment>
  )
}


const mapStateToProps = (state) => {
  console.log("layout mapStateToProps", state);
  return {
    mobile: state.authReducer.mobile,
    isLoggedIn: state.authReducer.isLoggedIn,
    token: state.authReducer.token,
    error: state.authReducer.error,
  };
};



export default connect(
  mapStateToProps,
  null
)(withTranslation("translations")(TheLayout));
