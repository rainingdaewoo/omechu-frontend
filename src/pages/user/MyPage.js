import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode  from 'jwt-decode'
import httpAddress from '../../data/httpAddress';
import { Button } from 'react-bootstrap';


const MyPage = () => {

    const [userDetail, setUserDetail] = useState({
        id: "",
        email: "",
        role: ""
    });

    useEffect(() => {
        const token = jwt_decode(localStorage.getItem("token"));
        axios.get(
            httpAddress + "/api/user/user/" + token.id,
            { headers: { 
                Authorization: "Bearer " + localStorage.getItem("token"),
                                "Content-Type": "application/json",
                                },
                })
            .then( (result) => {
                setUserDetail(result.data);
            })
            .catch( (error) => {
                console.log("fail");
                if( error.response.status === 401 ) {
                    localStorage.clear();
                    window.location.replace("/");
                } 
            });
    }, []);


    return (
        <div className="d-flex justify-content-center">
            <br/>
            <br/>
            <br/>
            { userDetail.nickname }님 안녕하세요!!<br/>
            오늘도 맛있는 한끼되세요!!
        </div>
    );
};

export default MyPage;