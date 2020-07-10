import React, { Component } from 'react';

import documentImage from './Address_Change_Document.pdf';

import FileViewer from 'react-file-viewer';

import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';

import axios from 'axios';



const file = documentImage

const type = 'pdf'

const validationClassForComment = 'default' ;

const validationClassForPin = 'default' ;

class CreateInstance extends Component {
  constructor(props) {
      super(props);
      this.state = {
        user : props.match.params.user,
        selectedFile : null,
        applicantName:'',
        accountNumber: '',
        contactNumber: '',
        addressLine1: '',
        addressLine2: '',
        pincode: '',
        city: '',
        state: '',
        country: '',
        comments: '',
        reliability: '',
        checkerAction: '',
        checkerComments: '',
        auditHistory : [],
        selectedFile: null,
        error : ''

      };
  };
  
  changeHandler = (e) => {
      this.setState({ [e.target.name]: e.target.value }); 
  };

  submitHandler = (e) =>{
      e.preventDefault();
  };

  onClickHandler = (e) => {
    e.preventDefault();
    console.log(this.state);
    var pinRGEX = /^[1-9]{1}[0-9]{4}[0-9]{1}$/;
    var validationResultForPin = pinRGEX.test(this.state.pincode);
    var validationResultForComment = true;
    if(this.state.comments == '' || this.state.comments == null || this.state.comments == undefined ){
      console.log(this.state.comments);
      var validationResultForComment = false;
    }

    var validationResultForPin = pinRGEX.test(this.state.pincode);
    console.log (validationClassForComment);
    if (validationResultForPin == false || validationResultForComment == false){
      this.setState({error : '*Please Check the data entered'});
     
      if (validationResultForPin == false){
        this.validationClassForPin = "notValid";
      }else {
        this.validationClassForPin = "default";
      }

      if ( validationResultForComment== false){
        this.validationClassForComment = "notValid";
      }else {
        this.validationClassForComment = "default";
      }
    }   
    
    else {

      this.validationClassForPin = "default";
      this.validationClassForComment = "default";
      this.setState({error : ''})
      var date = new Date();
      date = date.toString();
      const req = {
        applicantName: String(this.state.applicantName),
        accountNumber: Number(this.state.accountNumber),
        contactNumber: Number(this.state.contactNumber),
        addressLine1: String(this.state.addressLine1),
        addressLine2: String(this.state.addressLine2),
        pincode: Number(this.state.pincode),
        city: String(this.state.city),
        state: String(this.state.state),
        country: String(this.state.country),
        comments: '',//String(this.state.comments),
        reliability: String(this.state.reliability),
        checkerAction: String(this.state.checkerAction),
        checkerComments: String(this.state.checkerComments),
        auditHistory: [{
          comment:String(this.state.comments),
          username: String(this.state.user),
          rolename: 'Initiator',
          commentedDate: date
        }]
      }
     
      const urlepv = process.env.REACT_APP_CREATE_INSTANCE;
      const url = urlepv.replace('#CONTAINERID#',process.env.REACT_APP_CONTAINER_ID).replace('#PROCESSID#',process.env.REACT_APP_PROCESS_ID);
      console.log (url);
      axios
        .post(url, req)
        .then((res) => {
            console.log(res);
            
            alert ("Created Instance Id : "+res.data);
            this.setState({
              selectedFile : null,
              applicantName:'',
              accountNumber: '',
              contactNumber: '',
              addressLine1: '',
              addressLine2: '',
              pincode: '',
              city: '',
              state: '',
              country: '',
              comments: '',
              reliability: '',
              checkerAction: '',
              checkerComments: '',

              error : ''
            });
        })

        .catch((error) => {
            alert(error);
        });
    }
  };


  render() {
      return (
        <div className="Middle">
        <div className="Title">
          <h1 className="h1-style">Initiate Trade</h1>
       </div>

       <div className="MainBody">
          <div className="customer-details">
                  <form onSubmit={this.submitHandler}>
                      <div className="start-instance-layout">
                          <div className="start-instance-layout-full">
                              <h4 className="sub-section-header">Applicant Details</h4>
                                <p className = "validation-message"><b>{this.state.error}</b></p>
                              <div className="start-instance-three-coloum">
                                
                              <div className="start-instance-side-one">
                                  <label>Applicant Name</label>
                                  <br />
                                  <input className ={this.validationClassForName} type="text" name= 'applicantName' value={this.state.applicantName} onChange={(e) => this.changeHandler(e)} />
                                  <br />
                                  <br />
                                  <label>Address Line 1</label>
                                  <br />
                                  <input type="text" name ="addressLine1" value={this.state.addressLine1} onChange={(e) => this.changeHandler(e)} />
                                  <br />
                                  <br />
                                  <label>State</label>
                                  <br />
                                  <input type="text" name="state" value={this.state.state} onChange={(e) => this.changeHandler(e)} />
                                  <br />
                                  <br />
                              </div>
                              <div className="start-instance-side-two">
                                  <label>Account Number</label>
                                  <br />
                                  <input type="number" className ={this.validationClassForAcc} name = 'accountNumber' value={this.state.accountNumber} onChange={(e) => this.changeHandler(e)} />
                                  <br />
                                  <br />
                                  <label>Address Line2</label>
                                  <br />
                                  <input type="text" name="addressLine2" value={this.state.addressLine2} onChange={(e) => this.changeHandler(e)} />
                                  <br />
                                  <br />
                                  <label>Country</label>
                                  <br />
                                  <input type="text" name="country" value={this.state.country} onChange={(e) => this.changeHandler(e)} />
                                  <br />
                                  <br />
                              </div>
                              <div className="start-instance-side-three">
                                  <label>Contact Number</label>
                                  <br />
                                  <input type="number" name = 'contactNumber' value={this.state.contactNumber} onChange={(e) => this.changeHandler(e)} />
                                  <br />
                                  <br />
                                  <label>City</label>
                                  <br />
                                  <input type="text" name="city" value={this.state.city} onChange={(e) => this.changeHandler(e)} />
                                  <br />
                                  <br />
                                 
                                  <label>Pincode</label>
                                  <br />
                                  <input type="number" className ={this.validationClassForPin} name="pincode" value={this.state.pincode} onChange={(e) => this.changeHandler(e)} />
                                  <br />
                                  <br />
                              </div>
                              
                         
                      </div>
                      <div className = "start-instance-comment">
                              <label>Comments</label>
                              <br />
                              <textarea className= {this.validationClassForComment} name="comments" value={this.state.comments} onChange={(e) => this.changeHandler(e)} />
                              <br />
                              <br />
                          </div>

                      <div className="form-button">
                          <input name="startInstance" type="submit" value="Create" className="form-approve-button" onClick={(e) => this.onClickHandler(e)} />
                          <br />
                          <br />
                      </div>
                    </div>
                    </div>
                  </form>
          </div>
          </div>
          </div>
      );
  }
}

export default CreateInstance;

