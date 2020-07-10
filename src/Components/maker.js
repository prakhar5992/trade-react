import React, { Component } from 'react';

import documentImage from './Address_Change_Document.pdf';

import FileViewer from 'react-file-viewer';

import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';

import axios from 'axios';



const file = documentImage

const type = 'pdf'

const validationClassForComment = 'default' ;

const validationClassForPin = 'default' ;


class maker extends Component {
  constructor(props) {
      super(props);
      this.state = {
        user : props.match.params.user,
        group : props.match.params.group,
        taskid : props.match.params.taskid,
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
        taskdata: {}
      };
  }
  changeHandler = (e) => {
      this.setState({ [e.target.name]: e.target.value });
  };
  
  submitHandler = (e) => {
      if(this.state.close == 'Postpone'){ 
        this.props.history.push("/MainPage/" + this.state.group + "/" + this.state.user );
      } else {


        e.preventDefault();
        console.log(this.state);
        var pinRGEX = /^[1-9]{1}[0-9]{4}[0-9]{1}$/;
        var validationResultForPin = pinRGEX.test(this.state.pincode);
        var validationResultForComment = true;
        console.log(this.state.pincode);
        console.log(validationResultForPin);
        if(this.state.comments == '' || this.state.comments == null || this.state.comments == undefined ){
          var validationResultForComment = false;
        }
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
      }  else {
            var date = new Date();
            date = date.toString();
            var audit ={};
            audit.comment = String(this.state.comments);
            audit.username = String(this.state.user);
            audit.rolename = 'Maker';
            audit.commentedDate = date;
           
            var alen = 0;
            alen = this.state.auditHistory ? this.state.auditHistory.length : 0;
            var auditHistoryTemp = this.state.auditHistory;
            auditHistoryTemp[alen] = audit;
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
                checkerAction: "",
                checkerComments: "",
                auditHistory: auditHistoryTemp


        }
     
        const urlepv = process.env.REACT_APP_TASK_COMPLETE;
        const url = urlepv.replace('#CONTAINERID#',process.env.REACT_APP_CONTAINER_ID)+'/'+this.state.taskid+'/'+this.state.user;
        console.log (url);
        axios
          .post(url, req)
          .then((res) => {
              console.log(res);
              alert ("Task id "+ this.state.taskid + " completed");
              this.props.history.push("/MainPage/" + this.state.group + "/" + this.state.user );
          })

          .catch((error) => {
              alert(error);
          });
        }}

  };
  onClickHandler = (e) => {
      this.setState({ [e.target.name]: e.target.value });
      console.log(this.state);
  };

  componentDidMount() {
    const taskUrlepv = process.env.REACT_APP_TASK_DETAILS;
    const taskurl = taskUrlepv.replace('#CONTAINERID#',process.env.REACT_APP_CONTAINER_ID)+'/'+this.state.taskid;
    axios
        .get(taskurl)
        .then((response) => {
            console.log(response);
            this.setState({taskdata: response.data.taskData.tradeDO["com.s_space.trademanagementprocess.tradeDO"]});// taskdata: response.data.data.tradeDO});
            this.state.applicantName =  this.state.taskdata.applicantName;
            
            if (this.state.taskdata.accountNumber == 0){
              this.state.accountNumber = '';
              this.state.taskdata.accountNumber = '';
            } else {
              this.state.accountNumber = this.state.taskdata.accountNumber;
            }
            
            if (this.state.taskdata.contactNumber == 0){
              this.state.contactNumber = '';
              this.state.taskdata.contactNumber ='';
            } else {
              this.state.contactNumber = this.state.taskdata.contactNumber;
            }

            this.state.addressLine1= this.state.taskdata.addressLine1;
            this.state.addressLine2= this.state.taskdata.addressLine2;
            this.state.pincode= this.state.taskdata.pincode;
            this.state.city= this.state.taskdata.city;
            this.state.state= this.state.taskdata.state;
            this.state.country= this.state.taskdata.country;
            this.state.comments= this.state.taskdata.comments;
            this.state.reliability= this.state.taskdata.reliability;
            this.setState({auditHistory : this.state.taskdata.auditHistory});          
        })
        .catch((error) => {
            console.log(error);
        });
}

  render() {
    function showCheckerComment(checkerComments){
          if (checkerComments != null && checkerComments != ''){
            
            return (
                  <div>
                    <label>Checker Comments : {checkerComments}</label>
                    <br />
                    <br />
                </div>
                 );
          }
     }
      return (
        <div className="Middle">
        <div className="Title">
      <h1 className="h1-style">Maker Task Id : {this.state.taskid}</h1>
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
                                  <input type="text" name= 'applicantName' value={this.state.applicantName} onChange={(e) => this.changeHandler(e)} />
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
                                  <input type="number" name = 'accountNumber' value={this.state.accountNumber} onChange={(e) => this.changeHandler(e)} />
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
                                  <input className = {this.validationClassForPin} type="number" name="pincode" value={this.state.pincode} onChange={(e) => this.changeHandler(e)} />
                                  <br />
                                  <br />
                              </div>
                              
                         
                      </div>
                      <div className = "start-instance-comment">
                            {/* {showCheckerComment(this.state.taskdata.checkerComments)} */}
                              <label>Comments</label>
                              <br />
                              <textarea className = {this.validationClassForComment} name="comments" value={this.state.comments} onChange={(e) => this.changeHandler(e)} />
                              <br />
                              <br />
                          </div>
                          <table className="task-list">
                                        <thead className="task-list-thead">
                                            <th>Comment</th>
                                            <th>User</th>
                                            <th>Role</th>
                                            <th>Date</th>
                                        </thead>
                                        <tbody className="task-list-tbody">
                                            {(this.state.auditHistory && this.state.auditHistory.length)
                                                ? this.state.auditHistory.map((auditHistory) => (
                                                      <tr>
                                                          <td>{auditHistory["com.s_space.trademanagementprocess.auditHistory"]?auditHistory["com.s_space.trademanagementprocess.auditHistory"]['comment']:auditHistory['comment']}</td>
                                                          <td>{auditHistory["com.s_space.trademanagementprocess.auditHistory"]?auditHistory["com.s_space.trademanagementprocess.auditHistory"]['username']:auditHistory['username']}</td>
                                                          <td>{auditHistory["com.s_space.trademanagementprocess.auditHistory"]?auditHistory["com.s_space.trademanagementprocess.auditHistory"]['rolename']:auditHistory['rolename']}</td>
                                                          <td>{auditHistory["com.s_space.trademanagementprocess.auditHistory"]?auditHistory["com.s_space.trademanagementprocess.auditHistory"]['commentedDate'].substring(4,15):auditHistory['commentedDate'].substring(4,15)}</td>
                                                      </tr>
                                                  ))
                                              : null}
                                        </tbody>
                                    </table>
                      <div className="form-button">
                          <input name="sentToChecker" type="submit" value="Send to Checker" className="form-approve-button" onClick={(e) => this.onClickHandler(e)} />
                          {/* <input name="close" type="submit" value="Postpone" className="form-approve-button" onClick={(e) => this.onClickHandler(e)} /> */}
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

export default maker;

