import React , {Component} from 'react';
import {Link} from 'react-router-dom'
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
} from '@coreui/react'

import CIcon from '@coreui/icons-react'


// import usersData from '../views/users/UsersData'

const getBadge = status => {
  switch (status) {
    case 'فعال': return 'success'
    case 'غیرفعال': return 'secondary'
    case 'در انتظار': return 'warning'
    case 'مسدود': return 'danger'
    default: return 'primary'
  }
}
const fields = [
  {
  key: 'name',
  label: 'نام',
  _style: { width: '1%' },
  sorter: false,
  filter: false
},
{
  key: 'lastName',
  label: 'فامیلی',
  _style: { width: '1%' },
  sorter: false,
  filter: false
}, 
{
  key: 'mobile',
  label: 'موبایل',
},
{
  key: 'status',
  label: 'وضعیت',
}, 
{
  key: 'weight',
  label: 'وزن',
},
{
  key: 'height',
  label: 'قد',
},
{
  key: 'birthDay',
  label: 'تاریخ تولد',
},
{
  key: 'gender',
  label: 'جنسیت',
},
{
  key: 'group',
  label: 'گروه کاربر',
},
{
  key: 'show_details',
  label: '',
  _style: { width: '1%' },
  sorter: false,
  filter: false
}]


class Members extends Component {
  constructor(props){
    super(props);
    this.state = {
      membersState:[],
      memberState:[],
      collapsed:false,
      showCard:true,
      details:[],

      name:'',
      lastName:'',
      mobile:'',
      gender:'',
      birthDay:'',
      weight:'',
      height:''
    }
  }

  componentDidMount = ()=>{
    // console.log('prooops',this.props)
    fetch('http://localhost:5000/members/list' , {
      method:'POST',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
      return res.json()
    })
    .then(result => {
      // console.log('reeeeees' , result.members)
      this.setState({
        membersState:result.members,
      } , ()=>{
        console.log(this.state.membersState);
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

  editHandler =(event , index , item )=>{
    event.preventDefault();
    this.props.history.push({
      pathname:'/members/update',
      state: { item: item }
    });
  }
  deleteHandler =(event)=>{
    event.preventDefault();
    console.log('deleeeete')
  }

  searchHandler = (e)=>{
    e.preventDefault();
    fetch('http://localhost:5000/members/search' , {
      method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          name:this.state.name,
          lastName:this.state.lastName,
          mobile:this.state.mobile,
          birthDay:this.state.birthDay,
          weight:this.state.weight,
          height:this.state.height,
          gender:this.state.gender
      })
    })
    .then(res => {
      return res.json();
    })
    .then(result => {
      this.setState({membersState:result.members  ,
      collapsed:false
      }, ()=> {
        console.log(this.state.membersState);
    });
    })
    .catch(e => {
      console.log(e);
    })
   
  }
  render(){
    
  const toggleDetails = (index) => {
  const position = this.state.details.indexOf(index)
  let newDetails = this.state.details.slice()
  if (position !== -1) {
    newDetails.splice(position, 1)
  } else {
    newDetails = [...this.state.details, index]
  }
  this.setState({details:newDetails})
  }
  return (
  <React.Fragment>
    
    <CLink to='/members/create'>
      <CButton  size="md" color="success">
        اضافه کردن کاربر جدید 
      </CButton>
    </CLink>
  <CRow style={{ width:"260%", marginTop:"3%"}}>
    <CCol xs="12" sm="6" md="4" >
          <CFade in={this.state.showCard} >
            <CCard>
              <CCardHeader >
              <CLink className="card-header-action" onClick={() => this.setState({collapsed:!this.state.collapsed}) }>
                <CIcon name="cil-search" />
                <span style={{marginRight:'5px'}}>جستجوی اعضا</span>
                </CLink>
                <div className="card-header-actions">
                  <CLink className="card-header-action" onClick={() => this.setState({collapsed:!this.state.collapsed}) }>
                    <CIcon name={this.state.collapsed ? 'cil-chevron-bottom':'cil-chevron-top'} />
                  </CLink>
                </div>
              </CCardHeader>
              <CCollapse show={this.state.collapsed}>
              <CCardBody>
              <CForm  >
                <CRow >
                <CFormGroup >
                  <CInputGroup style={{padding:'0 20px'}}>
                    <CInputGroupPrepend>
                      <CInputGroupText><CIcon name="cil-user" /></CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput  name="name" placeholder="نام" onChange={this.changeHandler}/>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup>
                  <CInputGroup style={{padding:'0 20px'}}>
                    <CInputGroupPrepend>
                      <CInputGroupText><CIcon name="cil-user" /></CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput  name="lastName" placeholder="فامیلی" onChange={this.changeHandler} autoComplete="name"/>
                  </CInputGroup>
                </CFormGroup>
                </CRow>
                  <CRow>
                <CFormGroup>
                  <CInputGroup style={{padding:'0 20px'}} >
                    <CInputGroupPrepend>
                      <CInputGroupText><CIcon name="cil-mobile" /></CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput   name="mobile" placeholder="موبایل" autoComplete="username" onChange={this.changeHandler}/>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup>
                  <CInputGroup style={{padding:'0 20px'}}>
                    <CInputGroupPrepend>
                      <CInputGroupText><CIcon name="cil-group" /></CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput   name="gender" placeholder="جنسیت" onChange={this.changeHandler} />
                  </CInputGroup>
                </CFormGroup>
                  </CRow>
                 
                <CRow>
                <CFormGroup>
                  <CInputGroup style={{padding:'0 20px'}}>
                    <CInputGroupPrepend>
                      <CInputGroupText><CIcon name="cil-chevron-double-left" /></CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput   name="weight" placeholder="وزن" onChange={this.changeHandler} />
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup>
                  <CInputGroup style={{padding:'0 20px'}}>
                    <CInputGroupPrepend>
                      <CInputGroupText><CIcon name="cil-chevron-double-left" /></CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput   name="height" placeholder="قد" onChange={this.changeHandler} />
                  </CInputGroup>
                </CFormGroup>
                </CRow>
                <CRow>
                <CFormGroup>
                  <CInputGroup style={{padding:'0 20px'}} >
                    <CInputGroupPrepend>
                      <CInputGroupText><CIcon name="cil-birthday-cake" /></CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput   name="birthDay" placeholder="تاریخ تولد" onChange={this.changeHandler} />
                  </CInputGroup>
                </CFormGroup>
                </CRow>
                <CFormGroup className="form-actions">
                  <CButton block onClick={(e)=>this.searchHandler(e)}  size="lg"  color="success">جستجو</CButton>
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
            <CCardHeader>
              جدول اعضا
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={ this.state.membersState.map(member => {
                return {
                 "name" : member.name,
                 "lastName" :member.lastName ,
                 "mobile":member.mobile,
                 "birthDay":member.birthDay,
                 "gender":member.gender,
                 "height":member.height,
                 "weight":member.weight,
                 "group":member.userGroup.group_name,
                 "status":member.userStatus.status_name,
                }
              }) }
              fields={fields}
              hover
              striped
              bordered
              size="lg"
              itemsPerPage={5}
              pagination
              scopedSlots = {{
                'status':
                  (item)=>(
                    <td>
                      <CBadge color={getBadge(item.status)} style={{padding:"8px" , fontSize:"0.8rem"}}>
                        {item.status}
                      </CBadge>
                    </td>
                  ),
                'show_details':
                (item, index)=>{
                 return (
                <td className="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={()=>{toggleDetails(index)}}
                >
                  {this.state.details.includes(index) ? 'Hide' : 'Show'}
                </CButton>
              </td>
              )
          },
        'details':
            (item, index)=>{
              return (
              <CCollapse show={this.state.details.includes(index)}>
                <CCardBody>
                  <h4>
                    {item.name}{' '}{item.lastName}
                  </h4>
                  <p className="text-muted">حذف / ویرایش کاربر :</p>
                  <CButton style={{marginLeft:"5px"}} size="sm" color="info" onClick={(e)=>this.editHandler(e , index , item)}>
                    ویرایش
                  </CButton>
                  <CButton size="sm" color="danger" className="ml-1" onClick={(e)=>this.deleteHandler(e , index)}>
                    حذف
                  </CButton>
                </CCardBody>
              </CCollapse>
            )
          }
              }}
            />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </React.Fragment>
  )
  }
}

export default Members;
