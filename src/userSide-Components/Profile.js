import React , {Component} from 'react';
import {
  CCard,
  CCardBody,
  CCol,
} from  '@coreui/react';


class Profile extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return(
            <React.Fragment>
        <CCol xs="12" sm="6" md="4">
            <CCard color="danger" className="text-white text-center" >
            <CCardBody>
                    <img style={{width:'100px' , height:'100px' , borderRadius:'50px'}}
                    src='https://asset.bloomnation.com/c_pad,d_vendor:global:catalog:product:image.png,f_auto,fl_preserve_transparency,q_auto/v1605431246/vendor/6996/catalog/product/2/0/20200518104315_file_5ec30f83a4843_5ec30fadb7669.png'></img>
                <blockquote className="card-bodyquote">
                    </blockquote>
                <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
            </CCardBody>
            </CCard>
        </CCol>
            </React.Fragment>
        )
    }
};

export default Profile;

