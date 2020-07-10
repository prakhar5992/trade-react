import React, { Component } from "react";
import documentImage from "./Address_Change_Document.pdf";
import FileViewer from "react-file-viewer";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";

const file = documentImage;
const type = "pdf";

class CustomerDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productCode: props.match.params.productCode,
            comment: "",
            productStatus: "",
            productDetails: {},
        };
    }
    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    submitHandler = (e) => {
        e.preventDefault();
        console.log(this.state);
        const productUpdate = {
            //productCode:this.state.productCode,
            pdStatus: this.state.productStatus,
            pdComment: this.state.comment,
        };

        console.log(productUpdate);

        // console.log({status});

        axios
            .put("http://localhost:3002/prodStatusUpdate/" + this.state.productCode, productUpdate)
            .then((res) => {
                console.log(res);
                // window.close();
                this.props.history.push("/");
            })

            .catch((error) => {
                alert(error);
            });

        // this.props.history.push('/thankyou')
    };
    onClickHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    componentDidMount() {
        axios
            .get("http://localhost:3002/productDetails/code/" + this.state.productCode)
            //https://jsonplaceholder.typicode.com/posts
            .then((response) => {
                console.log(response);
                this.setState({ productDetails: response.data[0] });
                console.log(this.state.productDetails);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="customer-details">
                <div className="details-section">
                    <form onSubmit={this.submitHandler}>
                        <div className="form-layout">
                            <div className="layout-full">
                                <h4 className="sub-section-header">Product details</h4>
                                <div className="form-side-one">
                                    <label>Product name</label>
                                    <br />
                                    <input type="text" value={this.state.productDetails.productname} onChange={(e) => this.changeHandler(e)} />
                                    <br />
                                    <br />
                                    <label>Channels PRD available</label>
                                    <br />
                                    <input type="text" value={this.state.productDetails.channelsPrdAvailable} onChange={(e) => this.changeHandler(e)} />
                                    <br />
                                    <br />
                                    <label>Change in UW guidelines</label>
                                    <br />
                                    <input type="text" value={this.state.productDetails.isChangeInUWGuidelines} onChange={(e) => this.changeHandler(e)} />
                                    <br />
                                    <br />
                                </div>
                                <div className="form-side-two">
                                    <label>Product code</label>
                                    <br />
                                    <input type="text" value={this.state.productDetails.productCode} onChange={(e) => this.changeHandler(e)} />
                                    <br />
                                    <br />
                                    <label>Agent training reqd.?</label>
                                    <br />
                                    <input type="text" value={this.state.productDetails.isAgentTraningRequired} onChange={(e) => this.changeHandler(e)} />
                                    <br />
                                    <br />
                                    <label>New UW guidelines</label>
                                    <br />
                                    <input type="text" value={this.state.productDetails.newUWGuidelinesBriefDescription} onChange={(e) => this.changeHandler(e)} />
                                    <br />
                                    <br />
                                </div>
                            </div>

                            <div className="layout-full">
                                <h4 className="sub-section-header">Plan details</h4>
                                <div className="form-side-one">
                                    <label>Name</label>
                                    <br />
                                    <input type="text" value={this.state.productDetails.planname} onChange={(e) => this.changeHandler(e)} />
                                    <br />
                                    <br />
                                    <label>Policy term (min)</label>
                                    <br />
                                    <input type="text" value={this.state.productDetails.minPolicyTerm} onChange={(e) => this.changeHandler(e)} />
                                    <br />
                                    <br />
                                    <label>Sum assured (min)</label>
                                    <br />
                                    <input type="text" value={this.state.productDetails.minSumAssured} onChange={(e) => this.changeHandler(e)} />
                                    <br />
                                    <br />
                                    <label>Is surrender allowed?</label>
                                    <br />
                                    <input type="text" value={this.state.productDetails.isSurrenderAllowed} onChange={(e) => this.changeHandler(e)} />
                                    <br />
                                    <br />
                                    <label>Is Optional?</label>
                                    <br />
                                    <input type="text" value={this.state.productDetails.isOptional} onChange={(e) => this.changeHandler(e)} />
                                    <br />
                                    <br />
                                </div>
                                <div className="form-side-two">
                                    <label>Code</label>
                                    <br />
                                    <input type="text" value={this.state.productDetails.code} onChange={(e) => this.changeHandler(e)} />
                                    <br />
                                    <br />
                                    <label>Policy term (max)</label>
                                    <br />
                                    <input type="text" value={this.state.productDetails.maxPolicyTerm} onChange={(e) => this.changeHandler(e)} />
                                    <br />
                                    <br />
                                    <label>Sum assured (max)</label>
                                    <br />
                                    <input type="text" value={this.state.productDetails.maxSumAssured} onChange={(e) => this.changeHandler(e)} />
                                    <br />
                                    <br />
                                    <label>Surrender duration</label>
                                    <br />
                                    <input type="text" value={this.state.productDetails.surrenderDuration} onChange={(e) => this.changeHandler(e)} />
                                    <br />
                                    <br />
                                    <label>Min locking period</label>
                                    <br />
                                    <input type="text" value={this.state.productDetails.minLockingPeriod} onChange={(e) => this.changeHandler(e)} />
                                    <br />
                                    <br />
                                </div>
                            </div>
                            <div className="layout-full">
                                <h4 className="sub-section-header">STP Rules</h4>
                                <div className="form-side-one">
                                    <label>Rule Id</label>
                                    <br />
                                    <input type="text" value={this.state.productDetails.ruleID} onChange={(e) => this.changeHandler(e)} />
                                    <br />
                                    <br />
                                    <label>Is Optional?</label>
                                    <input type="text" value={this.state.productDetails.isOptional} onChange={(e) => this.changeHandler(e)} />
                                    <br />
                                    <br />
                                </div>
                                <div className="form-side-two">
                                    <label>Rule name</label>
                                    <br />
                                    <input type="text" value={this.state.productDetails.stprulename} onChange={(e) => this.changeHandler(e)} />
                                    <br />
                                    <br />
                                    <label>Rule description</label>
                                    <br />
                                    <input type="text" value={this.state.productDetails.description} onChange={(e) => this.changeHandler(e)} />
                                    <br />
                                    <br />
                                </div>
                            </div>
                            <div className="layout-full">
                                <h4 className="sub-section-header">Medical Tests</h4>
                                <div className="form-side-one">
                                    <label>Test ID</label>
                                    <br />
                                    <input type="text" value={this.state.productDetails.medicalTests} onChange={(e) => this.changeHandler(e)} />
                                    <br />
                                    <br />
                                </div>
                                <div className="form-side-two">
                                    <label>Test name</label>
                                    <br />
                                    <input type="text" value={this.state.productDetails.testName} onChange={(e) => this.changeHandler(e)} />
                                    <br />
                                    <br />
                                </div>
                            </div>
                            <div>
                                <label>Comments</label>
                                <br />
                                <textarea name="comment" defaultValue={this.state.comment} onChange={(e) => this.changeHandler(e)} />
                                <br />
                                <br />
                            </div>
                        </div>

                        <div className="form-button">
                            <input name="productStatus" type="submit" value="Approve" className="form-approve-button" onClick={(e) => this.onClickHandler(e)} />
                            <br />
                            <br />
                        </div>
                    </form>
                </div>
                <div className="image-section">
                    <FileViewer fileType={type} filePath={file} onError={this.onError} />
                </div>
            </div>
        );
    }
    // onError(e) {
    //   console.log(e, 'error in file-viewer');
    // }
}

export default CustomerDetails;
