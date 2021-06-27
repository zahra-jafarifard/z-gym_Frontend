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

class workOutDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],

      workOutState: [],

      id: "",
      reps: "",
      set: "",
      weight: "",
      description: "",
    };
  }
  componentDidMount = () => {
    fetch(process.env.REACT_APP_API_ADDRESS + "/workOutDetails/list", {
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
        console.log("workOutStateresultresult::", result.workOutDetails);
        this.setState({ workOutState: result.workOutDetails }, () => {
          console.log("workOutState::", this.state.workOutState);
        });
      });
  };

  changeHandler = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    this.setState({ [name]: value });
  };
  handleOnSelect = (item) => {
    this.setState({ user: item.id }, () => {
      console.log("this.state.user", this.state.user);
    });
  };
  handleOnSelectCreatedBy = (item) => {
    this.setState({ createdBy: item.id }, () => {
      console.log("this.state.createdBy", this.state.createdBy);
    });
  };
  delHandler = (event, id) => {
    event.preventDefault();
    this.setState({ id: id });
    this.props.onDeleteModal(true);
  };

  searchHandler = (e) => {
    e.preventDefault();
    fetch(process.env.REACT_APP_API_ADDRESS + "/workOutDetails/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.token,
      },
      body: JSON.stringify({
        id: this.state.id,
        description: this.state.description,
        reps: this.state.reps,
        set: this.state.set,
        weight: this.state.weight,
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
        console.log("workOutStateseeearch", result.workOutDetails);
        this.setState({ workOutState: result.workOutDetails });
        this.props.onCollapsedFalse();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  editHandler = (event, item) => {
    event.preventDefault();
    this.props.history.push({
      pathname: "/workOutDetails/update",
      state: { idItem: item.id },
    });
  };

  render() {
    const { t, i18n } = this.props;

    const fields = [
      {
        key: "reps",
        label: t("Reps"),
      },
      {
        key: "set",
        label: t("Set"),
      },
      {
        key: "weight",
        label: t("Weight"),
      },
      {
        key: "description",
        label: t("Description"),
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
            name="workOutDetails"
          />
        )}
        <CLink to="/workOutDetails/create">
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
                            name="reps"
                            placeholder={t("Reps")}
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
                            name="set"
                            placeholder={t("Set")}
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
                              <CIcon name="cil-user" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            name="description"
                            placeholder={t("Description")}
                            onChange={this.changeHandler}
                          />
                        </CInputGroup>
                      </CFormGroup>

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
              <CCardHeader>{t("WorkOutDetails")}</CCardHeader>
              <CCardBody>
                <CDataTable
                  items={this.state.workOutState.map((work) => {
                    return {
                      id:work.id,
                      weight: work.weight,
                      reps: work.reps,
                      set: work.set,
                      description: work.description,
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
)(withTranslation("translations")(workOutDetails));
