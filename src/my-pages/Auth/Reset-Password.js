import React, { Component } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CInputGroupPrepend,
  CInputGroupText,
  CInput,
  CInputGroup
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { withTranslation } from "react-i18next";

class resetPassword extends Component {
    constructor(props){
        super(props);
        this.state ={
            newPassword:'',
            repeatNewPassword:''
        }
    }

    
    
    setNewPassHandler = (e) =>{

        e.preventDefault();
        fetch('http://localhost:5000/setNewPassword/:resetToken' , {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                newPassword : this.state.newPassword,
                repeatNewPassword:this.state.repeatNewPassword
            })
        }).then(response =>{
            if (!response.ok){
                return new Error('res not ok ...');
            }
            this.props.history.replace('/login');
            return response.json();
        }).then(result => {
            console.log(result.message);
        })
    .catch(e => {
      console.log(e)
    })
    }
   

    render(){ 
  const { t, i18n } = this.props;

    return (
   
           
      <CCol xs="12" sm="6" md="4" >
          <CCard borderColor="danger" style={{width:'200%'}}>
            <CCardHeader>
            {t('Forget Password')}
            </CCardHeader>
            <CCardBody>
              
              <CInputGroup className="mb-4">
                  <CInputGroupPrepend>
                      <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder={t('New Password')} name="newPassword" onChange={(e)=>this.setState({newPassword:e.target.value})}  />
              </CInputGroup>
              <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder={t('Repeat Password')} name="repeatNewPassword" onChange={(e)=>this.setState({repeatNewPassword:e.target.value})} />
                    </CInputGroup>
              <CButton  color="primary" onClick={(e) =>this.setNewPassHandler(e)}>
                   {t('Set New Password')}
                 </CButton>
                 
            </CCardBody>
          </CCard>
        </CCol>
      
      
      
    

            
  )}
}

export default (withTranslation("translations")(resetPassword));
