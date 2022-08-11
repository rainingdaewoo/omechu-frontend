import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const YoutubeContentItem = ({youtubeContents}) => {
    
    useEffect(() => {
        
    }, []); 

    return (
        <Card>
            <Card.Body>
                <Card.Title>{youtubeContents.storeName}({youtubeContents.youtubeContents[0].youtuber})</Card.Title>
                <br/>
                <Link to={"/youtubeContent/" + youtubeContents.id} className="btn btn-primary">
                    상세보기
                </Link>
            </Card.Body>
        </Card>
    );
};

export default YoutubeContentItem;