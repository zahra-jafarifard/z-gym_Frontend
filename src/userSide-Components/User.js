import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation, Trans } from "react-i18next";
import classes from './User.module.css'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CCol,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { render } from "enzyme/build";

class User extends Component {
  constructor(props){
    super(props);
    this.state = {
      user:{},
      st:'',
      grp:''
    }
  }
  componentDidMount = () => {
    fetch(process.env.REACT_APP_API_ADDRESS + "/users/" + this.props.match.params.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return new Error(response.statusText, response.status);
        } else {
          return response.json();
        }
      })
      .then((result) => {
        console.log("user", result.user,'ssss',result.status ,'gggg', result.group);
        this.setState({
          user:result.user,
          st:result.status ,
          grp:result.group
        })
      })
      .catch((e) => {
        console.log("catch", e.message);
      });
     }

     render(){
       
       console.log('props.match.params.id' , this.props.match.params.id)
       
       return (
    <CRow className={classes.card}>
      <CCol xs="12" sm="6" md="4" >
        <CCard color="warning" className="text-white"  >
          {/* <CCardHeader>User : {match.params.id}</CCardHeader> */}
          <CCardHeader>
            <span>کاربر : {this.state.user.name} {this.state.user.lastName}</span>
          </CCardHeader>
          <CCardBody>
              <div className={classes.div}>
              <span className={classes.label}>نام</span>
            <span className={classes.value}>{this.state.user.name}</span>
              </div>

              <div className={classes.div}>
              <span className={classes.label}> فامیلی</span>
            <span className={classes.value}>{this.state.user.lastName}</span>
              </div>
              <div className={classes.div}>
              <span className={classes.label}> موبایل</span>
            <span className={classes.value}>{this.state.user.mobile}</span>
              </div>
              <div className={classes.div}>
              <span className={classes.label}>جنسیت</span>
            <span className={classes.value}>{this.state.user.gender}</span>
              </div>
              <div className={classes.div}>
              <span className={classes.label}>تاریخ تولد</span>
            <span className={classes.value}>{this.state.user.birthDay}</span>
              </div>
              <div className={classes.div}>
              <span className={classes.label}> وزن</span>
            <span className={classes.value}>{this.state.user.weight}</span>
              </div>
              <div className={classes.div}>
              <span className={classes.label}> قد</span>
            <span className={classes.value}>{this.state.user.height}</span>
              </div>
              <div className={classes.div}>
              <span className={classes.label}> وضعیت</span>
            {/* <span className={classes.value}>{this.state.user.userStatus.status_name}</span> */}
            <span className={classes.value}>{this.state.st}</span>
              </div>
              <div className={classes.div}>
              <span className={classes.label}> گروه</span>
            {/* <span className={classes.value}>{this.state.user.userGroup.group_name}</span> */}
            <span className={classes.value}>{this.state.grp}</span>
              </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}
};


const mapStateToProps = (state) => {
  console.log("App mapStateToProps", state);
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
)(withTranslation("translations")(User));
