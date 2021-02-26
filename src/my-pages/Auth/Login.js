import React,{Component} from 'react';
import { Link , Redirect } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CSelect,
  CInputCheckbox,
  CCardHeader
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { withTranslation } from "react-i18next";
import i18nCtx from '../../Shared-Component/i18n-Context';



class Login extends Component{
  constructor(props){
    super(props);
    this.state={
      rememberMe:false,
      mobile:'',
      password:'',

      showModal:false
    }
  }
   static contextType=i18nCtx;
  changeHandler = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    this.setState({ [name] : value });
  }

  // componentDidMount=() => {
  //   console.log('showModal' , this.state.showModal)
  // }
  forgetHandler = (e) => {
    e.preventDefault();
    this.props.history.push('/forget-password')
  }
  loginHandler = (e) => {
    e.preventDefault();
    console.log('loooogin');
    fetch('http://localhost:5000/login' , {
      method:'POST',
      headers:{
          'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        mobile:this.state.mobile,
        password:this.state.password,
        rememberMe:this.state.rememberMe,
    })
  })
  .then(res => {
    return res.json();
  })
  .then(result => {
    console.log('user logedIn',result.user , result.token);
    this.props.history.replace('/members/list');
    
  })
  .catch(e => {
    console.log(e)
  })
  }
  render(){
  const { t, i18n } = this.props;

  return (
    <div className="c-app c-default-layout flex-row align-items-center">

      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
           


            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  
            <CSelect onChange={this.context.handleChange} style={{width:"65px",height:"26px",
              paddingTop:"0",
              marginTop:"-8%",
              marginRight:"90%"
              
              }}>
              <option  value="en"  >En</option>
              <option value='fa' selected="selected">Fa</option>
            </CSelect>
                  <CForm>
                    <h3> {t('Login')} </h3>
                    <p className="text-muted">{t('Login')}</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-Mobile" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder={t('Mobile')} name="mobile" onChange={this.changeHandler}  />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder={t('Password')} name="password" onChange={this.changeHandler} />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                        <input type="checkbox" id="check" name="rememberMe" onChange={this.changeHandler} style={{margin:'0 4px'}} />
                        <label htmlFor="check"> {t('Remember Me')} </label><br></br>
                    </CInputGroup>
                        
                    
                    
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" onClick={(e) => this.loginHandler(e)} >
                          {t('Login')}
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                      
                      <CButton color="primary" onClick={(e)=>this.forgetHandler(e)}  className="px-0">
                      {t('Forget Password')}
                        </CButton>
                      

                      </CCol>
                    </CRow>
                  
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2> {t('Register')} </h2>
                    <p>
                      {t('Dear friend, if you have not registered yet, Choose not registered yet?')}
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" style={{textDecoration:"underLine"}}
                       active tabIndex={-1}> {t('not registered yet?')} </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>

    </div>
  )
  }
}

export default (withTranslation("translations")(Login));
