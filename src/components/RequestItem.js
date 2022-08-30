import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RequestItem = ({request}) => {

    const [dateAndTime, setDateAndTime] = useState([]);

    useEffect(() => {
        const createdDate = new Date(request.createdDate);
        const date = createdDate.toISOString().split("T")[0]
        const time = createdDate.toTimeString().split(" ")[0];
        setDateAndTime(date + ' ' + time);
    }, []); 

    return (
        <Card>
            
            <Card.Body>
                <Card.Title>{request.title}</Card.Title>
                <Card.Text className="text-right">
                    {dateAndTime}
                    <br />
                    {request.nickname}
                </Card.Text>
                
                <br/>
                <Link to={"/request/" + request.requestId} className="btn btn-primary">
                    상세보기
                </Link>
            </Card.Body>
        </Card>
    );
};

export default RequestItem;