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
  CInputCheckbox
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import ForgetPassModal from './Forget-Password';



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
  return (
    <div className="c-app c-default-layout flex-row align-items-center">

      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h3>ورود</h3>
                    <p className="text-muted">ورود به حساب کاربری</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-Mobile" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="موبایل" name="mobile" onChange={this.changeHandler}  />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="رمز عبور" name="password" onChange={this.changeHandler} />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                        <input type="checkbox" id="check" name="rememberMe" onChange={this.changeHandler} style={{margin:'0 4px'}} />
                        <label htmlFor="check"> مرا به خاطر بسپار</label><br></br>
                    </CInputGroup>
                        
                    
                    
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" onClick={(e) => this.loginHandler(e)} >
                          ورود
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                      
                      <CButton color="primary" onClick={(e)=>this.forgetHandler(e)}  className="px-0">
                      فراموشی رمز عبور؟
                        </CButton>
                      

                      </CCol>
                    </CRow>
                  
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>ثبت نام</h2>
                    <p>
                    دوست عزیز، در صورتی که تاکنون ثبت‌نام نکرده‌اید، جهت ثبت نام پروفایل گزینه تاکنون ثبت نام نکرده‌اید؟ را انتخاب کنید.

                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>تاکنون ثبت نام نکرده‌اید؟</CButton>
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

export default Login
