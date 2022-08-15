import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import httpAddress from '../../data/httpAddress';


const YoutubeContentDetail = (props) => {
    const propsParam = useParams();
    const id = propsParam.id;

    const [store, setStore] = useState([]);
    const [youtubeContents, setYoutubeContents] = useState([]);

    useEffect( () => {

        axios.get(
            "http://" + httpAddress + "/store/" + id,        
            { headers: { 
                Authorization: "Bearer " + localStorage.getItem("token"),
                                "Content-Type": "application/json",
                                },
                })
        .then( (result) => {
            console.log(result.data);
            setStore(result.data);
            setYoutubeContents(result.data.youtubeContents[0]);
        })
        .catch( (error) => {
            console.log("fail");
            console.log( error );
        });
       
    }, [])

    const deleteUser = () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {

            axios.delete(
                "http://" + httpAddress + "/store/" + id,        
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
            <Link to={`/updateForm/${id}`}>
                <Button>수정</Button>
            </Link>
            {" "}
            <Button onClick={ deleteUser }>삭제</Button>
        </div>
    );
};

export default YoutubeContentDetail;