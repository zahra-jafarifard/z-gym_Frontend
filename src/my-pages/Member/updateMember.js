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
import {connect} from 'react-redux';
import CIcon from '@coreui/icons-react';
import { withTranslation } from "react-i18next";
import * as displayAction from '../../store/actions/index'

class updateMember extends Component {
    constructor(props){
        super(props);
        this.state = {
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
    this.setState({
        name:this.props.location.state.item.name,
        lastName:this.props.location.state.item.lastName,
        mobile:this.props.location.state.item.mobile,
        height:this.props.location.state.item.height,
        weight:this.props.location.state.item.weight,
        gender:this.props.location.state.item.gender,
        birthDay:this.props.location.state.item.birthDay,
        status:this.props.location.state.item.status,
        group:this.props.location.state.item.group,
    })
    fetch(process.env.REACT_APP_API_ADDRESS + '/user_group/list' , {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(response =>{
      if (!response.ok){
        return new Error(response.statusText , response.status );
      // return console.log(response.statusText , response.status);

    }
    return response.json()    })
    .then(result => {
        this.setState({groupArray: result.groups }, 
        ()=>{console.log(this.state.groupArray )})
    })
    .catch(e => {
      console.log(e);
    })

//--------------------------

    fetch(process.env.REACT_APP_API_ADDRESS + '/user_status/list' , {
  method:'POST',
    headers:{
        'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok){
      return new Error(response.statusText , response.status );
    // return console.log(response.statusText , response.status);

  }
  return response.json()
  })
  .then(result => {
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
  updateHandler =(e) => {
  e.preventDefault();
  fetch(process.env.REACT_APP_API_ADDRESS + '/members/update' , {
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
  .then(response => {
    if (!response.ok){
      return new Error(response.statusText , response.status );
    // return console.log(response.statusText , response.status);

  }
  return response.json()
  })
  .then(result => {
    console.log(' member updated...',result.updatedMember)
  })
  .catch(e => {
    console.log(e)
  })
  }

render(){
  const { t, i18n } = this.props;

  return (
    <React.Fragment>
        <CCol xs="12" sm="6" md="4" style={{ margin:"auto"}} >
    <CCard borderColor="info" style={{width:'130%'}}>
      <CCardHeader >
        
          <CIcon name="cil-library-add"  />
          <span style={{marginRight:'5px'}}> {t('Edit')} </span>
          <div className="card-header-actions">
            <CLink className="card-header-action" onClick={(e) => this.goBackHandler(e) }>
                {t('Back')}
              <CIcon name="cil-arrow-circle-left"  style={{marginRight:"3px"}} />
            </CLink>
          </div>
        </CCardHeader>

      <CCardBody>
        
      <CRow >
    <CCol xs="12" sm="6" md="4"  style={{textAlign:"center"}} >
    <CFade in={this.props.showCard} >
        <CCollapse show={this.props.showCard}>
          <CCardBody style={{width:'240%' , marginRight:"40%"}}>
        <CForm  >
          <CFormGroup >
            <CInputGroup>
              <CInputGroupPrepend>
                <CInputGroupText><CIcon name="cil-user" /></CInputGroupText>
              </CInputGroupPrepend>
              <CInput  name="name"  value={this.state.name}
              onChange={this.changeHandler}/>
            </CInputGroup>
          </CFormGroup>
          <CFormGroup>
            <CInputGroup>
              <CInputGroupPrepend>
                <CInputGroupText><CIcon name="cil-user" /></CInputGroupText>
              </CInputGroupPrepend>
              <CInput  name="lastName"  value={this.state.lastName}
                onChange={this.changeHandler} autoComplete="name"/>
            </CInputGroup>
          </CFormGroup>
          <CFormGroup>
            <CInputGroup>
              <CInputGroupPrepend>
                <CInputGroupText><CIcon name="cil-mobile" /></CInputGroupText>
              </CInputGroupPrepend>
              <CInput   name="mobile"  value={this.state.mobile}
                autoComplete="username" onChange={this.changeHandler}/>
            </CInputGroup>
          </CFormGroup>
          <CFormGroup>
            <CInputGroup>
              <CInputGroupPrepend>
                <CInputGroupText><CIcon name="cil-lock-locked"/></CInputGroupText>
              </CInputGroupPrepend>
              <CInput   name="password" 
                onChange={this.changeHandler}/>
            </CInputGroup>
          </CFormGroup>
          <CFormGroup>
            <CInputGroup>
              <CInputGroupPrepend>
                <CInputGroupText><CIcon name="cil-group" /></CInputGroupText>
              </CInputGroupPrepend>
              <CSelect name="gender" 
                onChange={this.changeHandler}>
              {this.state.gender && 
              <option value={this.state.gender} selected="selected" disabled hidden>{this.state.gender} </option>
              }
              <option value='مرد' > مرد</option>
              <option  value="زن"  > زن</option>
              </CSelect>
            </CInputGroup>
          </CFormGroup>
          <CFormGroup>
            <CInputGroup>
              <CInputGroupPrepend>
                <CInputGroupText><CIcon name="cil-birthday-cake" /></CInputGroupText>
              </CInputGroupPrepend>
              <CInput   name="birthDay"  value={this.state.birthDay}
              onChange={this.changeHandler} />
            </CInputGroup>
          </CFormGroup>
          <CFormGroup>
            <CInputGroup>
              <CInputGroupPrepend>
                <CInputGroupText><CIcon name="cil-chevron-double-left" /></CInputGroupText>
              </CInputGroupPrepend>
              <CInput   name="weight"  value={this.state.weight}
              onChange={this.changeHandler} />
            </CInputGroup>
          </CFormGroup>
          <CFormGroup>
            <CInputGroup>
              <CInputGroupPrepend>
                <CInputGroupText><CIcon name="cil-chevron-double-left" /></CInputGroupText>
              </CInputGroupPrepend>
              <CInput   name="height"  value={this.state.height}
                onChange={this.changeHandler} />
            </CInputGroup>
          </CFormGroup>
          <CFormGroup>
            <CInputGroup>
              <CInputGroupPrepend>
                <CInputGroupText><CIcon name="cil-chevron-double-left" /></CInputGroupText>
              </CInputGroupPrepend>
              <CSelect name='status' type='select'  onChange={this.changeHandler} >
              {/* <option value="" selected disabled hidden>وضعیت</option> */}
              {this.state.status && 
              <option  selected="selected" disabled hidden>{this.state.status}</option>
              }
                {this.state.statusArray.map(opt =>{
                        return <option key={opt.id} value={opt.status_name != this.state.status && opt.id }>
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
                <CInputGroupText><CIcon name="cil-user" /></CInputGroupText>
              </CInputGroupPrepend>
              <CSelect name='group' type='select'   onChange={this.changeHandler} >
              <option value="" selected disabled hidden>گروه</option>
              {this.state.group && 
              <option  selected="selected" disabled hidden>{this.state.group}</option>
              }
                {this.state.groupArray.map(opt =>{
                        return <option key={opt.id}  value={opt.id} >
                          {opt.group_name}
                            </option>
                    })
              }
            </CSelect>
            </CInputGroup>
          </CFormGroup>
          <CFormGroup className="form-actions">
            <CButton  onClick={(e)=>this.updateHandler(e)} block  size="md"  color="success">
                {t('Update')}
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
    
const mapStateToProps = (state)=>{
  console.log('main map state' , state);
  return{
      showCard:state.showCard
  };
}

export default (connect(mapStateToProps)(withTranslation("translations")(updateMember)));
         