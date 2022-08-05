import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode  from 'jwt-decode'


const MyPage = () => {

    const [userDetail, setUserDetail] = useState({
        id: "",
        email: "",
        role: ""
    });

    useEffect(() => {
        const token = jwt_decode (localStorage.getItem("token"));
        //console.log("teste4st", localStorage.getItem("token"));
        axios.get(
            "http://localhost:5000/user/" + token.id,
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
           
        console.log(userDetail); 
    }, []);


    return (
        <div>
            { userDetail.username }님 안녕하세요!!<br/>
            오늘도 맛있는 한끼되세요!!

            
        </div>
    );
};

export default MyPage;