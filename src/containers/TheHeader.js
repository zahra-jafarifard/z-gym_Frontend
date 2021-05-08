import React, { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router";
import {BrowserRouter} from 'react-router-dom'
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import * as authActions from "../store/actions/index";

import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink,
  CDropdown,
  CSelect,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import i18nCtx from "../Shared-Component/i18n-Context";

// routes config
import routes from "../routes";

import {
  TheHeaderDropdown,
  TheHeaderDropdownMssg,
  TheHeaderDropdownNotif,
  TheHeaderDropdownTasks,
} from "./index";

const TheHeader = (props) => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);
  const history = useHistory();

  useEffect(() => {
    props.onAuthCheckState();
   
  }, []);
  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  const usersHandler = (e) => {
    e.preventDefault()
    history.push("/users");
  };
  const dashboardHandler = (e) => {
    e.preventDefault()
    history.push("/dashboard");
  };

  const logOutHandler = () => {
    history.replace("/login");
    props.onLogOut();
  };
  const i18nContext = useContext(i18nCtx);

  return (
    <BrowserRouter>
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />

      <CSelect
        onChange={i18nContext.handleChange}
        style={{
          width: "65px",
          height: "26px",
          marginTop: "15px",
          paddingTop: "0",
        }}
      >
        <option value="en">En</option>
        <option value="fa">Fa</option>
      </CSelect>

      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo" />
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        {props.isLoggedIn && (
          <CHeaderNavItem className="px-3">
            <CHeaderNavLink onClick={logOutHandler}>Log Out</CHeaderNavLink>
          </CHeaderNavItem>
        )}

        <CHeaderNavItem className="px-3">
          <CHeaderNavLink onClick={(e)=>dashboardHandler(e)} >Dashboard</CHeaderNavLink>
        </CHeaderNavItem>

        <CHeaderNavItem className="px-3">
          <CHeaderNavLink onClick={(e)=>usersHandler(e)} >Users</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink>Settings</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <TheHeaderDropdownNotif />
        <TheHeaderDropdownTasks />
        <TheHeaderDropdownMssg />
        <TheHeaderDropdown />
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
        <div className="d-md-down-none mfe-2 c-subheader-nav">
          <CLink className="c-subheader-nav-link" href="#">
            <CIcon name="cil-speech" alt="Settings" />
          </CLink>
          <CLink
            className="c-subheader-nav-link"
            aria-current="page"
            to="/dashboard"
          >
            <CIcon name="cil-graph" alt="Dashboard" />
            &nbsp;Dashboard
          </CLink>
          <CLink className="c-subheader-nav-link" href="#">
            <CIcon name="cil-settings" alt="Settings" />
            &nbsp;Settings
          </CLink>
        </div>
      </CSubheader>
    </CHeader>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  console.log("header map state", state);
  return {
    isLoggedIn: state.authReducer.isLoggedIn,
    token: state.authReducer.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogOut: () => {
      dispatch(authActions.Logout());
    },
    onAuthCheckState: () => {
      dispatch(authActions.authCheckState());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation("translations")(TheHeader));
