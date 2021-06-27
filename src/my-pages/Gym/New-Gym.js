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

import { ReactSearchAutocomplete } from "react-search-autocomplete";
import {
  Map,
  GoogleApiWrapper,
  Marker,
  GoogleMapReact,
} from "google-maps-react";

class newGym extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      location: "",
      address: "",
      status: "",
      phoneNumber: "",
      gender: "",
      manager: "",
      gymsType: "",
      managerState: [],
      gymsTypsState: [],
    };
  }

  handleOnSelect = (item) => {
    this.setState({ manager: item.id }, () => {
      console.log("this.state.manager", this.state.manager);
    });
  };

  handleOnSelectGym = (item) => {
    this.setState({ gymsType: item.id }, () => {
      console.log("this.state.gymsType", this.state.gymsType);
    });
  };
  componentDidMount = () => {
    fetch(process.env.REACT_APP_API_ADDRESS + "/members/list", {
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
        // console.log("managerstate::", result.members);
        this.setState({ managerState: result.members }, () => {
          console.log("managerState::", this.state.managerState);
        });
      });

    ///////////gymsTypes
    fetch(process.env.REACT_APP_API_ADDRESS + "/gymType/list", {
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
        console.log("gymtupestate:;", result.gymsTypes);
        this.setState({ gymsTypsState: result.gymsTypes }, () => {
          // console.log('gymsTypsState::',this.state.gymsTypsState);
        });
      });
  };

  changeHandler = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    this.setState({ [name]: value });
  };
  goBackHandler = (e) => {
    e.preventDefault();
    this.props.history.push("/gym/list");
  };
  newGroupHandler = (e) => {
    e.preventDefault();
    fetch(process.env.REACT_APP_API_ADDRESS + "/gym/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.token,
      },
      body: JSON.stringify({
        name: this.state.name,
        status: this.state.status,
        location: this.state.location,
        gender: this.state.gender,
        phoneNumber: this.state.phoneNumber,
        address: this.state.address,
        gymsType: this.state.gymsType,
        manager: this.state.manager,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return new Error(response.statusText, response.status);
        } else {
          return response.json();
        }
      })
      .then((result) => {
        console.log("frontend:::", result.message);
        this.props.history.push("/gym/list");
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
                                name="address"
                                placeholder={t("Address")}
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
                                name="location"
                                placeholder={t("Location")}
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
                                name="phoneNumber"
                                placeholder={t("Phone Number")}
                                onChange={this.changeHandler}
                              />
                            </CInputGroup>
                          </CFormGroup>
                          <CInputGroup className="mb-3">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-group" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CSelect
                              name="gender"
                              onChange={this.changeHandler}
                            >
                              <option value="">{t("Gender")}</option>
                              <option value="0"> زنانه</option>
                              <option value="1"> مردانه</option>
                            </CSelect>
                          </CInputGroup>
                          <CFormGroup>
                            <CInputGroup>
                              <CInputGroupPrepend>
                                <CInputGroupText>
                                  <CIcon name="cil-chevron-double-left" />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                              <CSelect
                                name="status"
                                onChange={this.changeHandler}
                              >
                                <option
                                  value=""
                                  selected="selected"
                                  disabled
                                  hidden
                                >
                                  {t("Status")}
                                </option>
                                <option value="1">فعال</option>
                                <option value="0">غیرفعال</option>
                              </CSelect>
                            </CInputGroup>
                          </CFormGroup>

                          <div style={{ marginBottom: "13px" }}>
                            <ReactSearchAutocomplete
                              items={this.state.managerState.map((opt) => {
                                return {
                                  id: opt.id,
                                  name: opt.name +' '+opt.lastName,
                                };
                              })}
                              styling={{
                                height: "34px",
                                borderRadius: "9px",
                                fontSize: "13px",
                                zIndex: "1200",
                              }}
                              placeholder="**Type Manager**"
                              onSelect={this.handleOnSelect}
                              value={this.state.manager}
                              name="manager"
                            />
                          </div>
                          <div style={{ marginBottom: "13px" }}>
                            <ReactSearchAutocomplete
                              items={this.state.gymsTypsState.map((opt) => {
                                return {
                                  id: opt.id,
                                  name: opt.name,
                                };
                              })}
                              styling={{
                                height: "34px",
                                borderRadius: "9px",
                                fontSize: "13px",
                              }}
                              placeholder="**Type gym'sTyps**"
                              // onSelect={this.changeHandler}
                              name="gymsType"
                              onSelect={this.handleOnSelectGym}
                              value={this.state.gymsType}
                            />
                          </div>

                          <CFormGroup className="form-actions">
                            <CButton
                              onClick={(e) => this.newGroupHandler(e)}
                              block
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
  withTranslation("translations")(newGym)
);
