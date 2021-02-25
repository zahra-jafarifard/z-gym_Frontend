import React , {Component} from 'react'
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
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react';

class newMember extends Component {
    constructor(props){
        super(props);
        this.state = {
          collapsed:true,
          showCard:true,

          statusArray:[],
          groupArray:[],

          name:'',
          lastName:'',
          mobile:'',
          password:'',
          gender:'',
          birthDay:'',
          weight:'',
          height:'',
          status:'',
          group:'',
        }
      }
    
  componentDidMount=() => {
    fetch('http://localhost:5000/user_group/list' , {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(res =>{
        return res.json();
    })
    .then(result => {
        this.setState({groupArray: result.groups }, 
        ()=>{console.log(this.state.groupArray )})
    })
    .catch(e => {
      console.log(e);
    })

//--------------------------

    fetch('http://localhost:5000/user_status/list' , {
      method:'POST',
      headers:{
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
      return res.json()
    })
    .then(result => {
      console.log('reeeeees' , result.statuses)
      this.setState({
        statusArray:result.statuses,
      } , ()=>{
        console.log(this.state.statusArray);
    })
    })
    .catch(e => {
      console.log(e);
    })

  }

  changeHandler = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    this.setState({ [name] : value });
  }
  goBackHandler = (e)=>{
    e.preventDefault();
    this.props.history.push('/members/list')
  }

  newMemberHandler =(e) => {
    e.preventDefault();
    fetch('http://localhost:5000/members/create' , {
    method:'POST',
    headers:{
        'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      name:this.state.name,
      lastName:this.state.lastName,
      mobile:this.state.mobile,
      password:this.state.password,
      birthDay:this.state.birthDay,
      weight:this.state.weight,
      height:this.state.height,
      gender:this.state.gender,
      status:this.state.status,
      group:this.state.group,
  })
})
.then(res => {
  return res.json();
})
.then(result => {
  console.log('new member created...',result.user)
})
.catch(e => {
  console.log(e)
})

}


render(){
  return (
    <React.Fragment>
        <CCol xs="12" sm="6" md="4" style={{ margin:"auto"}} >
    <CCard borderColor="info" style={{width:'130%'}}>
      <CCardHeader >
        <CLink className="card-header-action" onClick={() => this.setState({collapsed:!this.state.collapsed}) }>
          <CIcon name="cil-library-add"  />
          <span style={{marginRight:'5px'}}>اضافه کردن عضو جدید</span>
          </CLink>
          <div className="card-header-actions">
            <CLink className="card-header-action" onClick={(e) => this.goBackHandler(e) }>
                بازگشت
              <CIcon name="cil-arrow-circle-left"  style={{marginRight:"3px"}} />
            </CLink>
            <CLink style={{marginRight:"13px"}} className="card-header-action" onClick={() => this.setState({collapsed:!this.state.collapsed}) }>
              <CIcon name={this.state.collapsed ? 'cil-chevron-bottom':'cil-chevron-top'} />
            </CLink>
          </div>
        </CCardHeader>
      <CCardBody>
    <CRow >
        <CCol xs="12" sm="6" md="4"  style={{textAlign:"center"}} >
        <CFade in={this.state.showCard} >
        <CCollapse show={this.state.collapsed}>
          <CCardBody style={{width:'240%' , marginRight:"40%"}}>
        <CForm  >
          <CFormGroup >
            <CInputGroup>
              <CInputGroupPrepend>
                <CInputGroupText><CIcon name="cil-user" /></CInputGroupText>
              </CInputGroupPrepend>
              <CInput  name="name" placeholder="نام" onChange={this.changeHandler}/>
            </CInputGroup>
          </CFormGroup>
          <CFormGroup>
            <CInputGroup>
              <CInputGroupPrepend>
                <CInputGroupText><CIcon name="cil-user" /></CInputGroupText>
              </CInputGroupPrepend>
              <CInput  name="lastName" placeholder="فامیلی" onChange={this.changeHandler} autoComplete="name"/>
            </CInputGroup>
          </CFormGroup>
          <CFormGroup>
            <CInputGroup>
              <CInputGroupPrepend>
                <CInputGroupText><CIcon name="cil-mobile" /></CInputGroupText>
              </CInputGroupPrepend>
              <CInput   name="mobile" placeholder="موبایل" autoComplete="username" onChange={this.changeHandler}/>
            </CInputGroup>
          </CFormGroup>
          <CFormGroup>
            <CInputGroup>
              <CInputGroupPrepend>
                <CInputGroupText><CIcon name="cil-lock-locked"/></CInputGroupText>
              </CInputGroupPrepend>
              <CInput   name="password" placeholder="رمز عبور"  onChange={this.changeHandler}/>
            </CInputGroup>
          </CFormGroup>
          <CFormGroup>
            <CInputGroup>
              <CInputGroupPrepend>
                <CInputGroupText><CIcon name="cil-group" /></CInputGroupText>
              </CInputGroupPrepend>
              <CSelect name="gender" placeholder="جنسیت" onChange={this.changeHandler}>
              <option value="" selected disabled hidden>جنسیت</option>
                <option  value="زن"  > زن</option>
                <option value='مرد' > مرد</option>
              </CSelect>
            </CInputGroup>
          </CFormGroup>
          <CFormGroup>
            <CInputGroup>
              <CInputGroupPrepend>
                <CInputGroupText><CIcon name="cil-birthday-cake" /></CInputGroupText>
              </CInputGroupPrepend>
              <CInput   name="birthDay" placeholder="تاریخ تولد" onChange={this.changeHandler} />
            </CInputGroup>
          </CFormGroup>
          <CFormGroup>
            <CInputGroup>
              <CInputGroupPrepend>
                <CInputGroupText><CIcon name="cil-chevron-double-left" /></CInputGroupText>
              </CInputGroupPrepend>
              <CInput   name="weight" placeholder="وزن" onChange={this.changeHandler} />
            </CInputGroup>
          </CFormGroup>
          <CFormGroup>
            <CInputGroup>
              <CInputGroupPrepend>
                <CInputGroupText><CIcon name="cil-chevron-double-left" /></CInputGroupText>
              </CInputGroupPrepend>
              <CInput   name="height" placeholder="قد" onChange={this.changeHandler} />
            </CInputGroup>
          </CFormGroup>
          <CFormGroup>
            <CInputGroup>
              <CInputGroupPrepend>
                <CInputGroupText><CIcon name="cil-chevron-double-left" /></CInputGroupText>
              </CInputGroupPrepend>
              <CSelect name='status' type='select'  onChange={this.changeHandler} >
              <option value="" selected disabled hidden>وضعیت</option>
                {this.state.statusArray.map(opt =>{
                        return <option key={opt.id} value={opt.id}>
                          {opt.status_name}
                            </option>
                          })
                }
            </CSelect>
            </CInputGroup>
          </CFormGroup>
          <CFormGroup>
            <CInputGroup>
              <CInputGroupPrepend>
                <CInputGroupText><CIcon name="cil-group" /></CInputGroupText>
              </CInputGroupPrepend>
              <CSelect name='group' type='select'   onChange={this.changeHandler} >
              <option value="" selected disabled hidden>گروه</option>
                {this.state.groupArray.map((opt , index) =>{
                        return <option key={opt.id} value={opt.id} >
                          {opt.group_name}
                            </option>
                          })
                  }
            </CSelect>
            </CInputGroup>
          </CFormGroup>
          <CFormGroup className="form-actions">
            <CButton block onClick={(e)=>this.newMemberHandler(e)}  size="md"  color="success">
                اضافه کردن
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
  )
}
}
    
export default newMember;
         