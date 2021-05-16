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

class updateWorkOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
        personState: [],

        id: "",
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        createdBy: "",
        user: "",
    };
  }

  componentDidMount = () => {
    const idItem = this.props.location.state.idItem;

    // console.log('iddd' , idItem)
    fetch(process.env.REACT_APP_API_ADDRESS + "/workOut/fetchForUpdate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.token,
      },
      body: JSON.stringify({
        id: idItem,
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
        console.log("frontend", result.data);
        this.setState(
          {
            id: result.data.id,
            name: result.data.name,
            description: result.data.description,
            startDate: result.data.startDate,
            endDate: result.data.endDate,
            createdBy: result.data.createdBy,
            user: result.data.user,
          },
          () => {
            console.log("fetch for update state", this.state);
          }
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };
  handleOnSelect = (item) => {
    this.setState({ createdBy: item.id }, () => {
      console.log("this.state.creator", this.state.createdBy);
    });
  };

  handleOnSelectUser = (item) => {
    this.setState({ user: item.id }, () => {
      console.log("this.state.user", this.state.user);
    });
  };
  changeHandler = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    this.setState({ [name]: value });
  };
  goBackHandler = (e) => {
    e.preventDefault();
    this.props.history.push("/workOut/list");
  };
  updateHandler = (e) => {
    e.preventDefault();
    fetch(process.env.REACT_APP_API_ADDRESS + "/workOut/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.token,
      },
      body: JSON.stringify({
        id: this.state.id,
        name: this.state.name,
        description: this.state.description,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        createdBy: this.state.createdBy,
        user: this.state.user,
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
        console.log(" workout updated...", result.message);
        this.props.history.push("/workOut/list");
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
              <span style={{ marginRight: "5px" }}> {t("Edit")} </span>
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
                                value={this.state.name}
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
                                name="description"
                                value={this.state.description}
                                placeholder={t("Description")}
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
                              type="date"
                                value={this.state.startDate}
                                name="startDate"
                                placeholder={t("Start Date")}
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
                              type="date"
                                name="endDate"
                                value={this.state.endDate}
                                placeholder={t("End Date")}
                                onChange={this.changeHandler}
                              />
                            </CInputGroup>
                          </CFormGroup>

                         

                          <div style={{ marginBottom: "13px" }}>
                            <ReactSearchAutocomplete
                              items={this.state.personState.map((opt) => {
                                return {
                                  id: opt.id,
                                  name: opt.name + opt.lastName,
                                };
                              })}
                              styling={{
                                height: "34px",
                                borderRadius: "9px",
                                fontSize: "13px",
                                zIndex: "1200",
                              }}
                              placeholder="**Type Creator**"
                              name="createdBy"
                              value={this.state.createdBy}
                              onSelect={this.handleOnSelect}
                            />
                          </div>
                          <div style={{ marginBottom: "13px" }}>
                            <ReactSearchAutocomplete
                              items={this.state.personState.map((opt) => {
                                return {
                                  id: opt.id,
                                  name: opt.name + opt.lastName,
                                };
                              })}
                              styling={{
                                height: "34px",
                                borderRadius: "9px",
                                fontSize: "13px",
                              }}
                              placeholder="**Type User**"
                              name="user"
                              value={this.state.user}
                              onSelect={this.handleOnSelectUser}
                            />
                          </div>

                          <CFormGroup className="form-actions">
                            <CButton
                              onClick={(e) => this.updateHandler(e)}
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
  withTranslation("translations")(updateWorkOut)
);
