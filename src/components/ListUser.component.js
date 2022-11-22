import React, { Component } from "react"
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import UserTableRow from './UserTableRow';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
;
export default class ListUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3500/users/')
      .then(res => {
        this.setState({
          users: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }
  DataTable() {
    return this.state.users.map((res, i) => {
      return <UserTableRow obj={res} key={i} />;
    });
  }

  render() {
    return (
      <div className="table-wrapper">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Eamil</th>
              <th>Password</th>
              <th>Role</th>
              <th>Status</th>
              <th>
                <Link className="create-link" to={"/create-user"}>
                  <Button size="sm" variant="success">Create</Button>
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.DataTable()}
          </tbody>
        </Table>
      </div>
    );
  }
}