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
  CForm,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CSelect,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

import { connect } from "react-redux";
import * as displayAction from "../../store/actions/index";
import { withTranslation } from "react-i18next";
import i18nContext from "../../Shared-Component/i18n-Context";
import { deleteHandler } from "../../Shared-Component/deleteHandler";

const getBadge = (status) => {
  switch (status) {
    case "فعال":
      return "success";
    case "غیرفعال":
      return "secondary";
    case "در انتظار":
      return "warning";
    case "مسدود":
      return "danger";
    default:
      return "primary";
  }
};

class Members extends Component {
  constructor(props) {
    super(props);
    this.state = {
      membersState: [],
      // collapsed:false,
      // showCard:true,
      details: [],

      id: "",
      name: "",
      lastName: "",
      mobile: "",
      gender: "",
      birthDay: "",
      weight: "",
      height: "",
    };
  }
  static contextType = i18nContext;

  componentDidMount = () => {
    fetch(process.env.REACT_APP_API_ADDRESS + "/members/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': 'Bearer ' + token
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
        this.setState(
          {
            membersState: result.members,
          },
          () => {
            console.log(this.state.membersState);
          }
        );
      })
      .catch((e) => {
        console.log("catch", e.message);
      });
  };

  changeHandler = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    this.setState({ [name]: value });
  };

  editHandler = (event, item) => {
    event.preventDefault();
    this.props.history.push({
      pathname: "/members/update",
      state: { item: item },
    });
  };

  delHandler = (event, item) => {
    event.preventDefault();
    deleteHandler(item, "members");
  };

  searchHandler = (e) => {
    e.preventDefault();
    fetch(process.env.REACT_APP_API_ADDRESS + "/members/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        lastName: this.state.lastName,
        mobile: this.state.mobile,
        birthDay: this.state.birthDay,
        weight: this.state.weight,
        height: this.state.height,
        gender: this.state.gender,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        this.setState({ membersState: result.members });
        this.props.onCollapsedFalse();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  render() {
    const { t, i18n } = this.props;
    const fields = [
      {
        key: "id",
        label: t("Id"),
        _style: { width: "1%" },
      },
      {
        key: "name",
        label: t("Name"),
        _style: { width: "1%" },
      },
      {
        key: "lastName",
        label: t("Last Name"),
      },
      {
        key: "mobile",
        label: t("Mobile"),
      },
      {
        key: "status",
        label: t("Status"),
      },
      {
        key: "weight",
        label: t("Weight"),
      },
      {
        key: "height",
        label: t("Height"),
      },
      {
        key: "birthDay",
        label: t("BirthDay"),
      },
      {
        key: "gender",
        label: t("Gender"),
      },
      {
        key: "group",
        label: t("User Group"),
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
        <CLink to="/members/create">
          <CButton size="md" color="success">
            {t("Add New")}
          </CButton>
        </CLink>

        <CRow style={{ width: "150%", marginTop: "3%" }}>
          <CCol xs="12" sm="6" md="4">
            <CFade in={this.props.showCard}>
              <CCard>
                <CCardHeader>
                  <CLink
                    className="card-header-action"
                    onClick={() => this.props.onCollapsedToggle()}
                    // onClick={() => this.setState({collapsed:!this.state.collapsed}) }
                  >
                    <CIcon name="cil-search" />
                    <span style={{ marginRight: "5px" }}> {t("Search")} </span>
                  </CLink>
                  <div className="card-header-actions">
                    <CLink
                      className="card-header-action"
                      onClick={() => this.props.onCollapsedToggle()}
                      // onClick={() => this.setState({collapsed:!this.state.collapsed}) }
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
                      <CRow>
                        <CFormGroup>
                          <CInputGroup style={{ padding: "0 20px" }}>
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
                          <CInputGroup style={{ padding: "0 20px" }}>
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
                      </CRow>
                      <CRow>
                        <CFormGroup>
                          <CInputGroup style={{ padding: "0 20px" }}>
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
                          <CInputGroup style={{ padding: "0 20px" }}>
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-group" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CSelect
                              name="gender"
                              onChange={this.changeHandler}
                            >
                              <option value="" disabled hidden>
                                {" "}
                                {t("Gender")}{" "}
                              </option>
                              {/* <option value="" selected disabled hidden> {t('Gender')} </option> */}
                              <option value="زن"> زن</option>
                              <option value="مرد"> مرد</option>
                            </CSelect>
                          </CInputGroup>
                        </CFormGroup>
                      </CRow>

                      <CRow>
                        <CFormGroup>
                          <CInputGroup style={{ padding: "0 20px" }}>
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
                          <CInputGroup style={{ padding: "0 20px" }}>
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
                      </CRow>
                      <CRow>
                        <CFormGroup>
                          <CInputGroup style={{ padding: "0 20px" }}>
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-birthday-cake" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              name="birthDay"
                              placeholder={t("BirthDay")}
                              onChange={this.changeHandler}
                            />
                          </CInputGroup>
                        </CFormGroup>
                      </CRow>
                      <CFormGroup className="form-actions">
                        <CButton
                          block
                          onClick={(e) => this.searchHandler(e)}
                          size="lg"
                          color="success"
                        >
                          {" "}
                          {t("Search")}{" "}
                        </CButton>
                      </CFormGroup>
                    </CForm>
                  </CCardBody>
                </CCollapse>
              </CCard>
            </CFade>
          </CCol>
        </CRow>

        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>{t("Members")}</CCardHeader>
              <CCardBody>
                <CDataTable
                  items={this.state.membersState.map((member) => {
                    <input type="hidden" name="id" value={member.id}></input>;
                    return {
                      id: member.id,
                      name: member.name,
                      lastName: member.lastName,
                      mobile: member.mobile,
                      birthDay: member.birthDay,
                      gender: member.gender,
                      height: member.height,
                      weight: member.weight,
                      group: member.userGroup.group_name,
                      status: member.userStatus.status_name,
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
                              onClick={(e) => this.delHandler(e, item)}
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
  console.log("main map state", state);
  return {
    showCard: state.showCard,
    collapsed: state.collapsed,
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
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation("translations")(Members));
