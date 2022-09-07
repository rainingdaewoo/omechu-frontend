import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button, InputGroup, Form } from 'react-bootstrap';
import jwt_decode  from 'jwt-decode';
import httpAddress from '../../data/httpAddress';
import axios from 'axios';


const KakaoLoginRedirect = () => {
  const params = useParams();
  const [userData, setUserData] = useState({
    nickname: "",
    gender: "",
  });
  const token = jwt_decode("Bearer " + params.token);
  const [isCheckedNickname, setIsCheckedNickname] = useState(false);

  useEffect(() => {
    if(token.nickname !== null) {
      localStorage.clear();
      localStorage.setItem("token", params.token);
      window.location.replace("/");
    }
  }, []);

  const changeValue = (e) => {
    const {name, value} = e.target;
    setUserData({
        ...userData,
        [name]: value
    });
    if( name === "nickname") {
      setIsCheckedNickname(false);
    }  
  };

  const checkSameNickname = (e) => {
    axios.get(httpAddress + "/api/user/checkNickname/" + userData.nickname, { 
        headers: { 
            Authorization: "Bearer " + params.token,
                           "Content-Type": "application/json",
            },
        })
        .then( (result) => {
            if(result.data === true) {
              setIsCheckedNickname(true);
            } else {
              alert("동일 닉네임이 존재합니다. 다른 이메일을 사용해주세요.");
              setIsCheckedNickname(false);
            }
        })
        .catch( (error) => {
            console.log(error);
            if( error.response.data.message === "잘못된 요청입니다."){
                alert("필수 값이 빠졌습니다. 다시 확인해주세요.");
            }
        });;
  };  


  const submitUserData = (e) => {
    e.preventDefault(); 

    if( !isCheckedNickname ) {
      alert("닉네임 중복 검사를 해주세요!!!");
      return;
    }
    
    axios.patch(httpAddress + "/api/user/checkNickname/" + token.id, JSON.stringify(userData), { 
        headers: { 
            Authorization: "Bearer " + params.token,
                           "Content-Type": "application/json",
            },
        })
        .then( (result) => {
          localStorage.clear();
          localStorage.setItem("token", params.token);
          window.location.replace("/");
        })
        .catch( (error) => {
            console.log(error);
            if( error.response.data.message === "잘못된 요청입니다."){
                alert("필수 값이 빠졌습니다. 다시 확인해주세요.");
            }
        });;
}

  return (<div>
    <h1>회원 가입</h1>

    <Form onSubmit={submitUserData}>
        <InputGroup className="mb-3">
                <Form.Control
                    placeholder="닉네임을 적어주세요." 
                    aria-label="요청 게시판 검색"
                    aria-describedby="basic-addon2"
                    onChange={changeValue}
                    name="nickname" />
                <Button variant="outline-secondary" id="button-addon" onClick={checkSameNickname}>
                    닉네임 중복 체크
                </Button>
            </InputGroup>

        {
          isCheckedNickname ?
          <div><a style= {{ color: "green"}}>해당 닉네임을 사용하실 수 있습니다.</a></div> :
          <div><a style= {{ color: "red"}}> 닉네임 중복 확인을 해주세요!! </a></div>
        }

        <br />
        <Form.Group controlId="genderSelect">
              <Form.Check
                inline
                label="남성"
                name="gender"
                type="radio"
                value="Man"
                onChange={changeValue} 
                id={`inline-radio-1`}
              />
              <Form.Check
                inline
                label="여성"
                name="gender"
                type="radio"
                value="Female"
                onChange={changeValue} 
                id={`inline-radio-2`}
              />
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">
            등록
        </Button>
    </Form>

  </div>);
}

export default KakaoLoginRedirect;