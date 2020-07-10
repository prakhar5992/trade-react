import React, { Component } from "react";

import axios from "axios";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import maker from "./maker";

import checker from "./checker";


class SearchSR extends Component {
    
    constructor(props) {
        console.log(props.match);

        super(props);

        this.state = {
            user: props.match.params.user,
            group: props.match.params.group,
            task_list: [],

            process_details: [],
        };
    }

    onClickHandler = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
        if(this.state.group == "Maker"){
            this.props.history.push("/maker/" +e.target.value+"/"+ this.state.group + "/" + this.state.user );
        } else if(this.state.group == "Checker") {
            this.props.history.push("/checker/" + e.target.value+ "/" +this.state.group + "/" + this.state.user);
        }
    }
    
    componentDidMount() {
        axios
            .get(process.env.REACT_APP_TASKLIST+'/'+this.state.group)

            .then((response) => {
                this.setState({ task_list: response.data.data['task-summary']});
                console.log(this.state.task_list);
                console.log(this.state.task_list[0]['task-created-on']['java.util.Date'])
            })

            .catch((error) => {
                console.log(error);
            });
    }


    render() {

        function convertToDate(milliseconds) {
            var convertedDate = new Date(milliseconds).toDateString();
            return convertedDate;
        }
        return (
            <div className="Middle">
                     <div className="Title">
                                    <h1 className="h1-style">Work</h1>
                                </div>

                    <div className="MainBody">
            <div className="sr-div">
                <form className="sr-form">
                    <table className="task-list">
                        <thead className="task-list-thead">
                            <th>Name</th>
                            <th>Subject</th>
                            <th>Task Status</th>
                            <th>Start Date</th>
                            <th>Work on it</th>
                        </thead>
                        <tbody className="task-list-tbody">
                            {this.state.task_list.length
                                ? this.state.task_list.map((task_list) => (
                                      <tr>
                                          <td>
                                            <label for="Title">{task_list['task-name']}</label>
                                              
                                          </td>
                                            
                                          <td>
                                            <label for="Title">{task_list['task-subject']} {task_list['task-id']}</label>
                                          </td>
                                          <td>
                                            <label for="Title">{task_list['task-status']}</label>
                                          </td>

                                          <td>
                                            <label for="Title">{convertToDate(task_list['task-created-on']['java.util.Date'])}</label>
                                          </td>

                                          <td>
                                              <div className="align-center-div">
                                                  <div className="search-button">
                                                      <button className="claim-task" name="task_id" value={task_list['task-id']} onClick={(e) => this.onClickHandler(e)}>
                                                          Open task
                                                      </button>
                                                  </div>
                                              </div>
                                          </td>
                                      </tr>
                                  ))
                                : null}
                        </tbody>
                    </table>
                </form>
            </div>
            </div>
            </div>
        );
    }
}

export default SearchSR;
