import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserItem = (props) => {
    console.log( props.user);
    const {id, username, email } = props.user;

    return (
        <Card>
            <Card.Body>
                <Card.Title>{username}</Card.Title>
                이메일: {email}
                <br/>
                <Link to={"/user/" + id} className="btn btn-primary">
                    상세보기
                </Link>
            </Card.Body>
        </Card>
    );
};

export default UserItem;