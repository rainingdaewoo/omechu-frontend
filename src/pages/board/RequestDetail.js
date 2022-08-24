import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import httpAddress from '../../data/httpAddress';
import ReactHtmlParser from "react-html-parser";



const RequestDetail = (props) => {
    const propsParam = useParams();
    const requestId = propsParam.id;

    const [requestDetail, setRequestDetail] = useState([]);
    const [dateAndTime, setDateAndTime] = useState([]);

    useEffect( () => {

        axios.get(
            httpAddress + "/api/user/request/" + requestId,        
            { headers: { 
                Authorization: "Bearer " + localStorage.getItem("token"),
                                   "Content-Type": "application/json",
                },
            })
        .then( (result) => {
            console.log(result.data);
            setRequestDetail(result.data);
            const createdDate = new Date(result.data.createdDate);
            const date = createdDate.toISOString().split("T")[0]
            const time = createdDate.toTimeString().split(" ")[0];
            setDateAndTime(date + ' ' + time);
        })
        .catch( (error) => {
            console.log("fail");
            console.log( error );
        });
       
    }, [])

    const deleteRequest = () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {

            axios.delete(
                "http://" + httpAddress + "/api/user/store/" + requestId,        
                { headers: { 
                    Authorization: "Bearer " + localStorage.getItem("token"),
                                    "Content-Type": "application/json",
                                    },
                    })
            .then( (result) => {
                alert("삭제되었습니다.");
                window.location.href = "/";
            })
            .catch( (error) => {
                console.log("fail");
                console.log( error );
            });
      
          } else {
            
          }
    };

    

    return (
        <div>
            
            <h3>{requestDetail.title}</h3>
            {dateAndTime}
            <hr />
            <br />
            <a>
                {ReactHtmlParser(requestDetail.content)}
            </a>
            <hr />
            <br />
            <Link to={`/updateRequestForm/${requestId}`}>
                <Button>수정</Button>
            </Link>
            {" "}
            <Button onClick={ deleteRequest }>삭제</Button>
        </div>
    );
};

export default RequestDetail;