import Navigationbar from '../../Student/Navbar/navbar_student';
import React, { Component } from 'react';
import { CardImg, Button } from 'react-bootstrap';
import Comp from '../component';
import CompanyOverview from '../CompanyOverview/companyOverview';
import ReviewTab from '../Reviews/ReviewTab';
import AddSalary from '../Salary/AddSalary';
import Interview from '../Interview/InterviewList';

class HomeTabs extends Component {
  constructor(props) {
    super(props);

    this.loadComp = this.loadComp.bind(this);
    console.log('props:', this.props);
    if (this.props.location.category) {
      if (this.props.location.category === 'reviews') {
        console.log('in if condition');
        this.state = {
          loadComponent: (
            <ReviewTab
              companyName={this.props.location.companyName}
            ></ReviewTab>
          ),
        };
      } else if (this.props.location.category === 'overview') {
        this.state = {
          loadComponent: (
            <CompanyOverview
              companyID={this.props.location.companyID}
            ></CompanyOverview>
          ),
        };
      } else if (this.props.location.category === 'salaries') {
        this.state = {
          loadComponent: (
            <AddSalary
              companyName={this.props.location.companyName}
            ></AddSalary>
          ),
        };
      }
    } else if (this.props.location.category === 'interviews') {
      this.state = {
        loadComponent: (
          <Interview id={this.props.location.companyID}></Interview>
        ),
      };
    } else {
      this.state = {
        loadComponent: <Comp str='This is Overview'></Comp>,
      };
    }
  }

  componentWillReceiveProps(nextProp) {
    console.log('Received: ', nextProp);
  }

  componentDidMount() {
    if (
      this.props.location.category &&
      this.props.location.category === 'interviews'
    ) {
      this.setState({
        loadComponent: (
          <Interview id={this.props.location.companyID}></Interview>
        ),
      });
    }
    console.log('this.state');
    console.log(this.state);
  }
  loadComp(param) {
    console.log('Button clicked', param);
    this.setState({ loadComponent: param });
    this.forceUpdate();
  }

  render() {
    // TODO add image link
    // var imgSrc = `${backendServer}company/imageUpload/${fileName}`;
    let loadComponent = null;
    let addButton = null;
    if (this.state && this.state.loadComponent) {
      loadComponent = this.state.loadComponent;
      if (
        this.props.location &&
        this.props.location.category === 'interviews'
      ) {
        addButton = (
          <Button
            href='/student/interview/add'
            style={{
              float: 'right',
              marginLeft: '470px',
              backgroundColor: '#1861bf',
              border: '#1861bf',
            }}
          >
            {' '}
            Add an Interview
          </Button>
        );
      }
    }
    return (
      <React.Fragment>
        <Navigationbar />
        <div style={{ margin: '5px' }}>
          <div class='jumbotron' style={{ paddingBottom: '0px' }}>
            <div class='row'>
              <div
                class='col-xs-3 card profilePic'
                style={{ position: 'absolute' }}
              >
                <card>
                  <CardImg
                    style={{ height: '200px', width: '175px' }}
                    // src={imgSrc}
                    className='profileImg'
                  />
                </card>
              </div>
              <div class='col-xs-4 profileName' style={{ marginLeft: '200px' }}>
                <h1>
                  <b>{this.props.location.companyName}</b>
                </h1>

                <br />
                <Button
                  onClick={() =>
                    this.loadComp(
                      <CompanyOverview
                        companyID={this.props.location.companyID}
                      ></CompanyOverview>
                    )
                  }
                  style={{
                    backgroundColor: 'transparent',
                    color: 'green',
                    border: 'none',
                    fontSize: '25px',
                  }}
                >
                  {' '}
                  Overview{' '}
                </Button>
                <Button
                  onClick={() => this.loadComp(<Comp str='sfsdg'></Comp>)}
                  style={{
                    backgroundColor: 'transparent',
                    color: 'green',
                    border: 'none',
                    borderLeft: '1px solid #e6e6e6',
                    fontSize: '25px',
                  }}
                >
                  {' '}
                  Jobs{' '}
                </Button>
                <Button
                  onClick={() =>
                    this.loadComp(
                      <ReviewTab
                        companyName={this.props.location.companyName}
                      ></ReviewTab>
                    )
                  }
                  href=''
                  style={{
                    backgroundColor: 'transparent',
                    color: 'green',
                    border: 'none',
                    borderLeft: '1px solid #e6e6e6',
                    fontSize: '25px',
                  }}
                >
                  {' '}
                  Reviews{' '}
                </Button>
                <Button
                  onClick={() =>
                    this.loadComp(<Comp str='This is Interviews'></Comp>)
                  }
                  style={{
                    backgroundColor: 'transparent',
                    color: 'green',
                    border: 'none',
                    borderLeft: '1px solid #e6e6e6',
                    fontSize: '25px',
                  }}
                >
                  {' '}
                  Interviews{' '}
                </Button>
                <Button
                  onClick={() =>
                    this.loadComp(
                      <AddSalary
                        companyName={this.props.location.companyName}
                      ></AddSalary>
                    )
                  }
                  style={{
                    backgroundColor: 'transparent',
                    color: 'green',
                    border: 'none',
                    borderLeft: '1px solid #e6e6e6',
                    fontSize: '25px',
                  }}
                >
                  {' '}
                  Salaries{' '}
                </Button>
                <Button
                  style={{
                    backgroundColor: 'transparent',
                    color: 'green',
                    border: 'none',
                    borderLeft: '1px solid #e6e6e6',
                    fontSize: '25px',
                  }}
                >
                  {' '}
                  Photos{' '}
                </Button>
                {addButton}
              </div>
            </div>
          </div>
          <div class='row' style={{ marginLeft: '10px' }}>
            <div
              class='col-xs-3'
              style={{
                textAlign: 'left',
                height: '100%',
                marginLeft: '40%',
                marginTop: '5%',
              }}
            ></div>
            <hr />
          </div>
        </div>
        {loadComponent}
      </React.Fragment>
    );
  }
}

export default HomeTabs;