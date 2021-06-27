import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import i18nContext from "../../Shared-Component/i18n-Context";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination
} from '@coreui/react'


const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

const Users = (props) => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage);
  const [membersState, setMembersState] = useState([]);

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
    
      fetch(process.env.REACT_APP_API_ADDRESS + "/members/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token,
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
          setMembersState(result.members)
        })
        .catch((e) => {
          console.log("catch", e.message);
        });
    

  }, [currentPage, page])
  
  const { t, i18n } = props;

  return (
    <CRow style={{width:'100rem'}}>
      <CCol xl={6}>
        <CCard>
          <CCardHeader>
            Users
            <small className="text-muted"> example</small>
          </CCardHeader>
          <CCardBody >
          <CDataTable
            items={membersState.map((member) => {
              <input type="hidden" name="id" value={member.id}></input>;
              return {
                id: member.id,
                name: member.name,
                lastName: member.lastName,
                mobile: member.mobile,
                birthDay: member.birthDay,
                gender: member.gender === "1"? "مردانه":"زنانه",
                height: member.height,
                weight: member.weight,
                group: member.userGroup.group_name,
                status: member.userStatus.status_name,
              };
            })}
             fields ={  [
              {
                key: "id",
                // label: t("Id"),
                _style: { width: "1%" },
              },
              {
                key: "name",
                // label: t("Name"),
                _classes: 'font-weight-bold',

                _style: { width: "1%" },
              },
              {
                key: "lastName",
                _classes: 'font-weight-bold',
                // label: t("Last Name"),
              },
              {
                key: "mobile",
                // label: t("Mobile"),
              },
              {
                key: "status",
                // label: t("Status"),
              },
              {
                key: "weight",
                // label: t("Weight"),
              },
              {
                key: "height",
                // label: t("Height"),
              },
              {
                key: "birthDay",
                // label: t("BirthDay"),
              },
              {
                key: "gender",
                _classes: 'font-weight-bold'
                // label: t("Gender"),
              },
              {
                key: "group",
                _classes: 'font-weight-bold'
                // label: t("User Group"),
              }
            ]}
            hover
            striped
            itemsPerPage={5}
            activePage={page}
            clickableRows
            onRowClick={(item) => history.push(`/users/${item.id}`)}
            scopedSlots = {{
              'status':
                (item)=>(
                  <td>
                    <CBadge color={getBadge(item.status)}>
                      {item.status}
                    </CBadge>
                  </td>
                )
            }}
          />
          <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={5}
            doubleArrows={false} 
            align="center"
          />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

const mapStateToProps = (state) => {
  // console.log("login state", state);
  return {
    mobile: state.authReducer.mobile,
    isLoggedIn: state.authReducer.isLoggedIn,
    token: state.authReducer.token,
    error: state.authReducer.error,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onLogin: (mobile, password, rememberMe) => {
//       dispatch(authActions.asyncLogin(mobile, password, rememberMe));
//     },
//   };
// };

export default connect(
  mapStateToProps,
  null
)(withTranslation("translations")(Users));
