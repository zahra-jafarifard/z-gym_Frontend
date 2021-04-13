import React from "react";
import { useState, useEffect } from "react";

import { CCard, CCardBody, CCardHeader,CDataTable, CCol, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";

const User = ({ match }) => {
  const [membersState, setMembersState] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_ADDRESS + "/members/" + match.params.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + this.props.token,
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
        console.log('user' , result.user)
      setUser(result.user)
      })
      .catch((e) => {
        console.log("catch", e.message);
      });
  }, []);


  return (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>User id: {match.params.id}</CCardHeader>
          <CCardBody>
          <table>
            <tbody>

                  <tr>
                    <td>{user.id}</td> 
                    <td>{user.name}</td>
                    <td>{user.lastName}</td>
                    <td>{user.mobile}</td>
                  </tr>
            </tbody>
                </table>
          
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default User;
