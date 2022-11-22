import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './Login';
import Register from './Register';
import ListUser from './ListUser.component';
import CreateUser from './CreateUser.component';
import EditUser from './EditUser.component';

export default class UserTableRow extends Component {
    render() {
        return (
            <div>
                <Nav variant="tabs" defaultActiveKey="/login">
                    <Nav.Item>
                        <Nav.Link as={Link} to="/login" eventKey="/login">Login</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/register" eventKey="/register">Register</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/list-user" eventKey="/list-user">List User</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/list-user" element={<ListUser />} />
                    <Route path="/create-user" element={<CreateUser />} />
                    <Route path="/edit-user/:id" element={<EditUser />} />
                </Routes>
            </div>
        );
    }
}