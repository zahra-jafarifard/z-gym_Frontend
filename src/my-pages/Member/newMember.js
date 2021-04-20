import React, { Component } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CFade,
  CForm,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CSelect,
  CRow,
  CLink,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import * as displayAction from "../../store/actions/index";

class newMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusArray: [],
      groupArray: [],

      name: "",
      lastName: "",
      mobile: "",
      password: "",
      gender: "",
      birthDay: "",
      weight: "",
      height: "",
      status: "",
      group: "",
    };
  }

  componentDidMount = () => {
    fetch(process.env.REACT_APP_API_ADDRESS + "/user_group/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return new Error(response.statusText, response.status);
        }
        return response.json();
      })
      .then((result) => {
        this.setState({ groupArray: result.groups }, () => {
          console.log(this.state.groupArray);
        });
      })
      .catch((e) => {
        console.log(e);
      });

    //--------------------------

    fetch(process.env.REACT_APP_API_ADDRESS + "/user_status/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return new Error(response.statusText, response.status);
          // return console.log(response.statusText , response.status);
        }
        return response.json();
      })
      .then((result) => {
        console.log("reeeeees", result.statuses);
        this.setState(
          {
            statusArray: result.statuses,
          },
          () => {
            console.log(this.state.statusArray);
          }
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  changeHandler = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    this.setState({ [name]: value });
  };
  goBackHandler = (e) => {
    e.preventDefault();
    this.props.history.push("/members/list");
  };

  newMemberHandler = (e) => {
    e.preventDefault();
    fetch(process.env.REACT_APP_API_ADDRESS + "/members/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.token,
      },
      body: JSON.stringify({
        name: this.state.name,
        lastName: this.state.lastName,
        mobile: this.state.mobile,
        password: this.state.password,
        birthDay: this.state.birthDay,
        weight: this.state.weight,
        height: this.state.height,
        gender: this.state.gender,
        status: this.state.status,
        group: this.state.group,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return new Error(response.statusText, response.status);
          // return console.log(response.statusText , response.status);
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        this.props.history.push("/members/list");
        
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    const { t, i18n } = this.props;

    return (
      <React.Fragment>
        <CCol xs="12" sm="6" md="4" style={{ margin: "auto" }}>
          <CCard borderColor="info" style={{ width: "130%" }}>
            <CCardHeader>
              <CIcon name="cil-library-add" />
              <span style={{ marginRight: "5px" }}> {t("Add New")} </span>
              <div className="card-header-actions">
                <CLink
                  className="card-header-action"
                  onClick={(e) => this.goBackHandler(e)}
                >
                  {t("Back")}
                  <CIcon
                    name="cil-arrow-circle-left"
                    style={{ marginRight: "3px" }}
                  />
                </CLink>
              </div>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs="12" sm="6" md="4" style={{ textAlign: "center" }}>
                  <CFade in={this.props.showCard}>
                    <CCollapse show={this.props.showCard}>
                      <CCardBody style={{ width: "240%", marginRight: "40%" }}>
                        <CForm>
                          <CFormGroup>
                            <CInputGroup>
                              <CInputGroupPrepend>
                                <CInputGroupText>
                                  <CIcon name="cil-user" />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                              <CInput
                                name="name"
                                placeholder={t("Name")}
                                onChange={this.changeHandler}
                              />
                            </CInputGroup>
                          </CFormGroup>
                          <CFormGroup>
                            <CInputGroup>
                              <CInputGroupPrepend>
                                <CInputGroupText>
                                  <CIcon name="cil-user" />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                              <CInput
                                name="lastName"
                                placeholder={t("Last Name")}
                                onChange={this.changeHandler}
                                autoComplete="name"
                              />
                            </CInputGroup>
                          </CFormGroup>
                          <CFormGroup>
                            <CInputGroup>
                              <CInputGroupPrepend>
                                <CInputGroupText>
                                  <CIcon name="cil-mobile" />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                              <CInput
                                name="mobile"
                                placeholder={t("Mobile")}
                                autoComplete="username"
                                onChange={this.changeHandler}
                              />
                            </CInputGroup>
                          </CFormGroup>
                          <CFormGroup>
                            <CInputGroup>
                              <CInputGroupPrepend>
                                <CInputGroupText>
                                  <CIcon name="cil-lock-locked" />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                              <CInput
                                name="password"
                                placeholder={t("Password")}
                                onChange={this.changeHandler}
                              />
                            </CInputGroup>
                          </CFormGroup>
                          <CFormGroup>
                            <CInputGroup>
                              <CInputGroupPrepend>
                                <CInputGroupText>
                                  <CIcon name="cil-group" />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                              <CSelect
                                name="gender"
                                onChange={this.changeHandler}
                              >
                                <option value="" selected disabled hidden>
                                  {" "}
                                  {t("Gender")}{" "}
                                </option>
                                <option value="زن"> زن</option>
                                <option value="مرد"> مرد</option>
                              </CSelect>
                            </CInputGroup>
                          </CFormGroup>
                          <CFormGroup>
                            <CInputGroup>
                              <CInputGroupPrepend>
                                <CInputGroupText>
                                  <CIcon name="cil-birthday-cake" />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                              <CInput
                              type="date"
                                name="birthDay"
                                placeholder={t("BirthDay")}
                                onChange={this.changeHandler}
                              />
                            </CInputGroup>
                          </CFormGroup>
                          <CFormGroup>
                            <CInputGroup>
                              <CInputGroupPrepend>
                                <CInputGroupText>
                                  <CIcon name="cil-chevron-double-left" />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                              <CInput
                                name="weight"
                                placeholder={t("Weight")}
                                onChange={this.changeHandler}
                              />
                            </CInputGroup>
                          </CFormGroup>
                          <CFormGroup>
                            <CInputGroup>
                              <CInputGroupPrepend>
                                <CInputGroupText>
                                  <CIcon name="cil-chevron-double-left" />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                              <CInput
                                name="height"
                                placeholder={t("Height")}
                                onChange={this.changeHandler}
                              />
                            </CInputGroup>
                          </CFormGroup>
                          <CFormGroup>
                            <CInputGroup>
                              <CInputGroupPrepend>
                                <CInputGroupText>
                                  <CIcon name="cil-chevron-double-left" />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                              <CSelect
                                name="status"
                                type="select"
                                onChange={this.changeHandler}
                              >
                                <option value="" selected disabled hidden>
                                  {t("Status")}
                                </option>
                                {this.state.statusArray.map((opt) => {
                                  return (
                                    <option key={opt.id} value={opt.id}>
                                      {opt.status_name}
                                    </option>
                                  );
                                })}
                              </CSelect>
                            </CInputGroup>
                          </CFormGroup>
                          <CFormGroup>
                            <CInputGroup>
                              <CInputGroupPrepend>
                                <CInputGroupText>
                                  <CIcon name="cil-group" />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                              <CSelect
                                name="group"
                                type="select"
                                onChange={this.changeHandler}
                              >
                                <option value="" selected disabled hidden>
                                  {t("User Group")}
                                </option>
                                {this.state.groupArray.map((opt, index) => {
                                  return (
                                    <option key={opt.id} value={opt.id}>
                                      {opt.group_name}
                                    </option>
                                  );
                                })}
                              </CSelect>
                            </CInputGroup>
                          </CFormGroup>
                          <CFormGroup className="form-actions">
                            <CButton
                              block
                              onClick={(e) => this.newMemberHandler(e)}
                              size="md"
                              color="success"
                            >
                              {t("Insert")}
                            </CButton>
                          </CFormGroup>
                        </CForm>
                      </CCardBody>
                    </CCollapse>
                  </CFade>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log("main map state", state);
  return {
    showCard: state.displayReducer.showCard,
    token: state.authReducer.token,
  };
};

export default connect(mapStateToProps)(
  withTranslation("translations")(newMember)
);
