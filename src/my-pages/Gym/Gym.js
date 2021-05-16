import React, { Component } from "react";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CCollapse,
  CLink,
  CButton,
  CFade,
  CSelect,
  CForm,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import Modal from ".././UI Components/Modal";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import * as displayAction from "../../store/actions/index";

const getBadge = (status) => {
  switch (status) {
    case "فعال":
      return "success";
    case "غیرفعال":
      return "danger";
    default:
      return "warning";
  }
};

class Gym extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gymState: [],
      details: [],

      managerState: [],
      gymsTypsState:[],

      id: "",
      name: "",
      location: "",
      address: "",
      status: "",
      phoneNumber: "",
      gender: "",
      manager: "",
      gymsType: "",
    };
  }
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

    /////////////////////////////
    fetch(process.env.REACT_APP_API_ADDRESS + "/gym/list", {
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
        // console.log('resultgymState' , result.gyms)
        this.setState(
          {
            gymState: result.gyms,
          },
          () => {
            // console.log('gymState',this.state.gymState);
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
  delHandler = (event, id) => {
    event.preventDefault();
    this.setState({ id: id });
    this.props.onDeleteModal(true);
  };

  searchHandler = (e) => {
    e.preventDefault();
    fetch(process.env.REACT_APP_API_ADDRESS + "/gym/search", {
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
        console.log("resultgymState", result.gyms);
        this.setState({ gymState: result.gyms });
        this.props.onCollapsedFalse();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  editHandler = (event, item) => {
    event.preventDefault();
    this.props.history.push({
      pathname: "/gym/update",
      state: { idItem: item.id },
    });
  };

  render() {
    const { t, i18n } = this.props;

    const fields = [
      {
        key: "name",
        label: t("Name"),
      },
      {
        key: "location",
        label: t("Location"),
      },
      {
        key: "address",
        label: t("Address"),
      },
      {
        key: "status",
        label: t("Status"),
      },
      {
        key: "phoneNumber",
        label: t("Phone Number"),
      },
      {
        key: "gender",
        label: t("gender"),
      },
      {
        key: "manager",
        label: t("manager"),
      },
      {
        key: "gymsType",
        label: t("gymsType"),
      },
      {
        key: "show_details",
        label: "",
        _style: { width: "1%" },
        sorter: false,
        filter: false,
      },
    ];

    const toggleDetails = (index) => {
      const position = this.state.details.indexOf(index);
      let newDetails = this.state.details.slice();
      if (position !== -1) {
        newDetails.splice(position, 1);
      } else {
        newDetails = [...this.state.details, index];
      }
      this.setState({ details: newDetails });
    };
    return (
      <React.Fragment>
        {this.props.deleteModal && (
          <Modal
            token={this.props.token}
            item={document.getElementById("hiddenId_" + this.state.id).value}
            name="gym"
          />
        )}
        <CLink to="/gym/create">
          <CButton size="md" color="success">
            {t("Add New")}
          </CButton>
        </CLink>
        <CRow>
          <CCol xs="12" sm="6" md="4">
            <CFade in={this.props.showCard}>
              <CCard
                style={{ width: "120%", marginRight: "0%", marginTop: "8%" }}
              >
                <CCardHeader>
                  <CLink
                    className="card-header-action"
                    onClick={() => this.props.onCollapsedToggle()}
                  >
                    <CIcon name="cil-search" />
                    <span style={{ marginRight: "5px" }}> {t("Search")} </span>
                  </CLink>
                  <div className="card-header-actions">
                    <CLink
                      className="card-header-action"
                      onClick={() => this.props.onCollapsedToggle()}
                    >
                      <CIcon
                        name={
                          this.props.collapsed
                            ? "cil-chevron-bottom"
                            : "cil-chevron-top"
                        }
                      />
                    </CLink>
                  </div>
                </CCardHeader>
                <CCollapse show={this.props.collapsed}>
                  <CCardBody>
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
                            name="status"
                            placeholder={t("Status")}
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
                      <CFormGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-group" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CSelect name="gender" onChange={this.changeHandler}>
                            <option value="">{t("Gender")}</option>
                            <option value="0"> زنانه</option>
                            <option value="1"> مردانه</option>
                          </CSelect>
                        </CInputGroup>
                      </CFormGroup>

                     
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
                              name="gymsType"
                              onSelect={this.handleOnSelectGym}
                              value={this.state.gymsType}
                            />
                          </div>
                          


                      <div style={{ marginBottom: "13px" }}>
                        <ReactSearchAutocomplete
                          items={this.state.managerState.map((opt) => {
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
                          placeholder="**Type Manager**"
                          onSelect={this.handleOnSelect}
                          value={this.state.manager}
                          name="manager"
                        />
                      </div>

                      <CFormGroup className="form-actions">
                        <CButton
                          onClick={(e) => this.searchHandler(e)}
                          block
                          size="lg"
                          color="success"
                        >
                          {t("Search")}
                        </CButton>
                      </CFormGroup>
                    </CForm>
                  </CCardBody>
                </CCollapse>
              </CCard>
            </CFade>
          </CCol>
        </CRow>

        <CRow style={{ width: "50rem" }}>
          <CCol>
            <CCard>
              <CCardHeader>{t("Gyms")}</CCardHeader>
              <CCardBody>
                <CDataTable
                  items={this.state.gymState.map((gym) => {
                    return {
                      id: gym.id,
                      name: gym.name,
                      status: gym.status === true ? "فعال" : "غیرفعال",
                      location: gym.location,
                      phoneNumber: gym.phoneNumber,
                      address: gym.address,
                      gender: gym.gender,
                      manager: gym.User.name,
                      gymsType: gym.gymType.name,
                    };
                  })}
                  fields={fields}
                  hover
                  striped
                  bordered
                  size="lg"
                  itemsPerPage={5}
                  pagination
                  scopedSlots={{
                    status: (item) => (
                      <td>
                        <CBadge
                          color={getBadge(item.status)}
                          style={{ padding: "8px", fontSize: "0.8rem" }}
                        >
                          {item.status}
                        </CBadge>
                      </td>
                    ),
                    show_details: (item, index) => {
                      return (
                        <td className="py-2">
                          <CButton
                            color="primary"
                            variant="outline"
                            shape="square"
                            size="sm"
                            onClick={() => {
                              toggleDetails(index);
                            }}
                          >
                            {this.state.details.includes(index)
                              ? "Hide"
                              : "Show"}
                          </CButton>
                        </td>
                      );
                    },
                    details: (item, index) => {
                      return (
                        <CCollapse show={this.state.details.includes(index)}>
                          <CCardBody>
                            <h4>
                              {item.name} {item.lastName}
                            </h4>
                            <p className="text-muted">
                              {" "}
                              {t("Edit")} / {t("Delete")}{" "}
                            </p>
                            <input
                              type="hidden"
                              id={`hiddenId_${item.id}`}
                              value={item.id}
                            />
                            <CButton
                              style={{ marginLeft: "5px" }}
                              size="sm"
                              color="info"
                              onClick={(e) => this.editHandler(e, item)}
                            >
                              {t("Edit")}
                            </CButton>
                            <CButton
                              size="sm"
                              color="danger"
                              className="ml-1"
                              onClick={(e) => this.delHandler(e, item.id)}
                            >
                              {t("Delete")}
                            </CButton>
                          </CCardBody>
                        </CCollapse>
                      );
                    },
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log("main map state", state);
  return {
    token: state.authReducer.token,
    showCard: state.displayReducer.showCard,
    collapsed: state.displayReducer.collapsed,
    deleteModal: state.displayReducer.deleteModal,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onCollapsedToggle: () => {
      dispatch(displayAction.collapsedToggle());
    },
    onCollapsedFalse: () => {
      dispatch(displayAction.collapsedFalse());
    },
    onDeleteModal: (val) => {
      dispatch(displayAction.deleteModal(val));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation("translations")(Gym));
