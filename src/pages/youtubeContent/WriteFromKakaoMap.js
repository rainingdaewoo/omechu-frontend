import React, { useState } from 'react';
import axios from 'axios';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import DaumPostcode from 'react-daum-postcode';
import styled from 'styled-components';
import httpAddress from '../../data/httpAddress';


const WriteFromKakaoMap = (props) => {

    const [boardFromYoutube, setBoardFromYoutube] = useState({
        storeName: "",
        youTuber: "",
        category: "",
        hashtag: "",
        youtubeURL: "",
        storeNaverURL: "",
        storeAddress: "",
    });

    const [kakaoAddress, setKakaoAddress] = useState('');

    const changeValue = (e) => {
        const {name, value} = e.target;
        setBoardFromYoutube({
            ...boardFromYoutube,
            [name]: value
        });  
    }

    const submitContent = (e) => {
        e.preventDefault(); 

        let requestData = {...boardFromYoutube, 
                           storeAddress: kakaoAddress};

        axios.post(httpAddress + "/api/admin/store/", JSON.stringify(requestData), { 
            headers: { 
                Authorization: "Bearer " + localStorage.getItem("token"),
                               "Content-Type": "application/json",
                },
            })
            .then( (result) => {
                window.location.href = "/";
            })
            .catch( (error) => {
                console.log(error.response.data.validation);
                if( error.response.data.message === "잘못된 요청입니다."){
                    let validation = error.response.data.validation;

                    if(Object.keys(validation).length > 1) { // 2개 이상 빠진 항목이 있을 때
                        alert("빠진 내용이 있나 확인해주세요");
                    } else{                                 //1개만 빠졌을 때    
                        alert(validation[(Object.keys(error.response.data.validation))]);   
                    }
                    
                    
                }
            });;
    }
    
    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
        fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }

        setKakaoAddress(fullAddress);          // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    };


    return (
        <div>
            <h1>새로운 맛집 등록</h1>
            <Form onSubmit={submitContent}>
                <Form.Group className="mb-3">
                    <Form.Label>가게 이름</Form.Label>
                    <Form.Control  type="text" 
                                   placeholder="가게 이름을 적어주세요" 
                                   onChange={changeValue} 
                                   name="storeName" />
                </Form.Group>

                <FloatingLabel className="mb-3" controlId="selectYoutuber" label="유튜버">
                    <Form.Select onChange={changeValue} 
                                 name="youTuber" 
                                 aria-label="Floating label select">
                        <option value=''>어떤 유튜버인가요?</option>
                        <option value='성시경 SUNG SI KYUNG'>성시경 SUNG SI KYUNG</option>
                        <option value='먹보스 쭈엽이'>먹보스 쭈엽이</option>
                        <option value='김사원세끼'>김사원세끼</option>
                    </Form.Select>
                </FloatingLabel>

                <FloatingLabel className="mb-3" controlId="selectCategory" label="카테고리">
                    <Form.Select onChange={changeValue} 
                                 name="category" 
                                 aria-label="Floating label select">
                        <option value=''>카테고리</option>
                        <option value='koreanFood'>한식</option>
                        <option value='chineseFood'>중식</option>
                        <option value='japaneseFood'>일식</option>
                        <option value='westernFood'>양식</option>
                        <option value='etc'>기타</option>
                    </Form.Select>
                </FloatingLabel>

                <Form.Group className="mb-3">
                    <Form.Label>해쉬 태그</Form.Label>
                    <Form.Control  type="text" 
                                   placeholder="태그(메뉴명, 지역명 등을 #지역, #맛집과 같은 형식으로 구분해서 입력해주세요)" 
                                   onChange={changeValue} 
                                   name="hashtag"/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>영상 링크</Form.Label>
                    <Form.Control  type="text" 
                                   placeholder="유튜브 링크(ex, https://www.youtube.com/watch?...)" 
                                   onChange={changeValue} 
                                   name="youtubeURL"/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>가게 링크(네이버)</Form.Label>
                    <Form.Control  type="text" 
                                   placeholder="네이버 링크(ex, https://map.naver.com/...)" 
                                   onChange={changeValue} 
                                   name="storeNaverURL"/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>가게 주소(아래에서 주소를 검색해주세요.)</Form.Label>
                    <Form.Control type="text" 
                                  placeholder="가게 주소" 
                                  onChange={changeValue} 
                                  value={kakaoAddress}
                                  name="storeAddress" 
                                  readOnly />
                </Form.Group>

                <Div>
                    <DaumPostcode 
                        onComplete={handleComplete}                     // 값 선택 시 실행되는 이벤트
                        autoClose={false}                               // 값 선택 시 자동 닫힘 설정
                        {...props}                       
                    />
                </Div>
                
                <Button variant="primary" type="submit">
                    등록
                </Button>
            </Form>
            
        </div>
    );
};

const Div = styled.div`
   border:1px solid silver;
   margin-bottom: 10;
`;

export default WriteFromKakaoMap;