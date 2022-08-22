import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import jwt_decode  from 'jwt-decode'
import axios from 'axios';
import httpAddress from '../../data/httpAddress';


const YoutubeContentDetail = (props) => {
    const propsParam = useParams();
    const storeId = propsParam.id;

    const [store, setStore] = useState([]);
    const [youtubeContents, setYoutubeContents] = useState([]);

    useEffect( () => {

        axios.get(
            httpAddress + "/store/" + storeId,        
            { headers: { 
                "Content-Type": "application/json",
                },
            })
        .then( (result) => {
            setStore(result.data);
            setYoutubeContents(result.data.youtubeContents[0]);
        })
        .catch( (error) => {
            console.log("fail");
            console.log( error );
        });
       
    }, [])

    const deleteStore = () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {

            axios.delete(
                "http://" + httpAddress + "/api/admin/store/" + storeId,        
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

    const likeStore = () => {
        console.log(jwt_decode ("Bearer " +localStorage.getItem("token")));
        axios.post(
            httpAddress + "/like/" + storeId, JSON.stringify(), { 
                headers: { 
                    Authorization: "Bearer " + localStorage.getItem("token"),
                                   "Content-Type": "application/json",
                    },
                })
            .then( (result) => {
                    window.location.href = "/";
            })
            .catch( (error) => {
                console.log(error);
                if( error.response.data.message === "잘못된 요청입니다."){
                    alert("필수 값이 빠졌습니다. 다시 확인해주세요.");
                }
            });;
      
    };

    return (
        <div>
            <h1>상세보기</h1>
            <hr />
            <h3>가게 이름: {store.storeName}</h3>
            <h5>위치: {store.address} </h5>
            유튜버: {youtubeContents.youtuber}
            <br />
            <a>
                <img src={youtubeContents.imageURL}/>
            </a>
            <br /> <br />
            <Link to={`/updateForm/${storeId}`}>
                <Button>수정</Button>
            </Link>
            {" "}
            <Button onClick={ deleteStore }>삭제</Button>
            <Button onClick={ likeStore }>좋아요</Button>
        </div>
    );
};

export default YoutubeContentDetail;