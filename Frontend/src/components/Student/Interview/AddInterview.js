import React, { Component } from "react";
import Navbar from "../../Student/Navbar/navbar_student";
import { Link } from "react-router-dom";
import { Form, Button, ButtonGroup } from "react-bootstrap";
import backendServer from "../../../webConfig";
import axios from "axios";

class AddInterview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.changeHandler = this.changeHandler.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleCheckboxChange(e) {
    this.setState({ workType: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const jobData = {
      companyName: this.state.companyName,
      title: this.state.title,
      description: this.state.description,
      responsibilities: this.state.responsibilities,
      qualification: this.state.qualification,
      industry: this.state.industry,
      country: this.state.country,
      workType: this.state.workType,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      zipcode: this.state.zipcode,
      sql_company_id: 1,
    };
    console.log(jobData);
    /*axios
    .post(`${backendServer}/glassdoor/jobs/`, jobData)
    .then((response) =>
      dispatch({
        type: NEW_JOB_POSTING,
        payload: response.data,
      }),
    )
    .catch((error) => {
      console.log(error);
    });*/
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-md-5 ml-5 mb-5 mt-3">
              <h4 style={{ color: "#3BB143", float: "left" }}>
                Tell us about a recent job interview
              </h4>
              <br />
              <hr className="mb-3"></hr>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Label>
                    <strong>Employer *</strong>
                  </Form.Label>
                  <Form.Control
                    required={true}
                    type="text"
                    name="companyName"
                    onChange={this.changeHandler}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <strong>Rate Overall Experience *</strong>
                  </Form.Label>
                  <Form.Control
                    required={true}
                    type="text"
                    name="overall_experience"
                    onChange={this.changeHandler}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <strong>Job Title *</strong>
                  </Form.Label>
                  <Form.Control
                    required={true}
                    type="text"
                    name="job_title"
                    onChange={this.changeHandler}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <strong>Describe the Interview Process *</strong>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    aria-label="With textarea"
                    required={true}
                    type="text"
                    name="description"
                    onChange={this.changeHandler}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <strong>Interview Difficulty *</strong>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    aria-label="With textarea"
                    required={true}
                    type="text"
                    name="difficulty"
                    onChange={this.changeHandler}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <strong>Did you get an offer? *</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    name="offer_status"
                    onChange={this.changeHandler}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <strong>Interview Questions *</strong>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    aria-label="With textarea"
                    required={true}
                    type="text"
                    name="question"
                    onChange={this.changeHandler}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    aria-label="With textarea"
                    required={true}
                    type="text"
                    name="answers"
                    onChange={this.changeHandler}
                  ></Form.Control>
                </Form.Group>
                <ButtonGroup aria-label="First group" className="mt-2">
                  <Button variant="success" type="submit">
                    Submit
                  </Button>
                </ButtonGroup>
                <Link to={{}}>
                  <a style={{ marginLeft: "15px" }}>Cancel</a>
                </Link>
              </Form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddInterview;
