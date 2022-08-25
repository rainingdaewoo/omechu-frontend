import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import jwt_decode  from 'jwt-decode'
import httpAddress from '../../data/httpAddress';
import ReactHtmlParser from "react-html-parser";



const RequestDetail = (props) => {
    const propsParam = useParams();
    const requestId = propsParam.id;

    const [requestDetail, setRequestDetail] = useState([]);
    const [dateAndTime, setDateAndTime] = useState([]);
    const [isMyPost, setIsMyPost] = useState(false);

    useEffect( () => {

        if( localStorage.getItem("token") === null ) {
            alert("요청 게시판은 회원만 열람할 수 있습니다. 로그인 후 이용해주세요");      
            window.location.replace("/");
        }

        axios.get(
            httpAddress + "/api/user/request/" + requestId,        
            { headers: { 
                Authorization: "Bearer " + localStorage.getItem("token"),
                                   "Content-Type": "application/json",
                },
            })
        .then( (result) => {
            
            if( result.data.username === jwt_decode(localStorage.getItem("token")).username) {
                setIsMyPost(true);
            }
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
                httpAddress + "/api/user/request/" + requestId,        
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

            { isMyPost ?
            <>
            <Link to={`/updateRequestForm/${requestId}`}>
            <Button>수정</Button>
            </Link>
            {" "}
            <Button onClick={ deleteRequest }>삭제</Button>
            </>
            :
            null
            }
            
        </div>
    );
};

export default RequestDetail;