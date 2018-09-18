import React, { Component } from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';

import { Collapse, DropdownItem, DropdownMenu, DropdownToggle, Fade, Form, FormGroup, FormText, FormFeedback, Input, InputGroup, InputGroupAddon, InputGroupText, Label, CardFooter, Button, Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { format } from 'url';

var count=0;
var page_cnt=0;
class Tables extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emps: [],
      datas: [],
		}
    this.submitClick = this.submitClick.bind(this);
    this.myfun = this.myfun.bind(this);
    
  }
  componentDidMount() {
    this.myfun();
  }

  myfun = (e) => {
		fetch('/api/attendance', {
			
	 		method: 'POST',
      body: JSON.stringify(
        {
          search: document.getElementById("search").value,
          date: document.getElementById("date").value
        }),
      headers: { "Content-Type": "application/json" }
    })
      .then(function (res) {
        return res.json();
      })
      .then((data) => {
				var mydata = data.data;

        this.setState({
          emps: mydata
        })
        this.setState({		
          datas:mydata				
        })
    
      })
      .catch((err) => {
        console.log(err)
      })
  }
  submitClick() {
	  this.myfun();
  }
  
	render() {
  	
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Attendance
              </CardHeader>
              <CardBody>
                <a href="http://localhost:3000/#/buttons">Hr</a>
                <FormGroup row>
                  <Col md="4">
                    <Input name="search" type="text" id="search" placeholder="Search" value={this.state.search} />
                  </Col>
                  <Col md="4">
                    <Input type="date" id="date" name="date" placeholder="date" value={this.state.date} />
                  </Col>
                  <Col md="3">
                    <Button type="submit" size="sm" color="primary" onClick={this.submitClick} ><i className="fa fa-dot-circle-o"></i> Submit</Button>
                  </Col>
                </FormGroup>
                {/* </Form> */}
                {/* <Button onClick={this.myfun}> Click me </Button> */}
                <Table responsive bordered>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>IN TIME</th>
                      <th>OUT TIME</th>
                      <th>WORKING HOURS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(this.state.emps).map(key =>
                      <DisplayData key={key} meta={this.state.emps[key]}/>
                    )}
                  </tbody>
                </Table>
                {/* <Pagination>
                  <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem className="page-item"><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                </Pagination> */}
              </CardBody>
            </Card>
          </Col>

        </Row>
       </div>

    );
  }
}
class DisplayData extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <tr>
        <td>{this.props.meta.Emp_Id}</td>
        <td>{this.props.meta.Emp_First_Name} {this.props.meta.Emp_Last_Name}</td>
        <td>{this.props.meta.For_Date}</td>
        <td>{this.props.meta.For_Date}</td>
        <td>{this.props.meta.For_Date}</td>
        <td>{this.props.meta.In_Duration}</td>
      </tr>
    );
  }
}
export default Tables;
