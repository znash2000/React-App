import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default class UserTableRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.username}</td>
                <td>{this.props.obj.email}</td>
                <td>{this.props.obj.password}</td>
                <td>{this.props.obj.role}</td>
                <td>{this.props.obj.status}</td>
                <td>
                    <Link className="edit-link" to={"/edit-user/" + this.props.obj._id}>
                        <Button size="sm" variant="info">Edit</Button>
                    </Link>

                </td>
            </tr>
        );
    }
}