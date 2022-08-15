import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';
import httpAddress from '../../data/httpAddress';
import styled from 'styled-components';

const UpdateForm = (props) => {
    const propsParam = useParams();
    const id = propsParam.id;

    const [boardFromYoutube, setBoardFromYoutube] = useState({
        storeName: "",
        youTuber: "",
        category: "",
        hashtag: "",
        youtubeURL: "",
        storeNaverURL: "",
        storeAddress: "",
        youtubeContentId: "",
    });
    const [kakaoAddress, setKakaoAddress] = useState('');

    useEffect( () => {

        axios.get(
            "http://" + httpAddress + "/store/" + id,        
            { headers: { 
                Authorization: "Bearer " + localStorage.getItem("token"),
                                "Content-Type": "application/json",
                                },
                })
        .then( (result) => {
            let storeName = result.data.storeName;
            let youTuber = result.data.youtubeContents[0].youtuber;
            let youtubeURL = result.data.youtubeContents[0].url;
            let storeNaverURL = result.data.storeNaverURL;
            let storeAddress = result.data.address;
            let youtubeContentId = result.data.youtubeContents[0].id;
            let hashtag = result.data.hashtag;
            let category = result.data.category;
            setKakaoAddress(storeAddress); 

            setBoardFromYoutube({
                storeName: storeName,
                category: category,
                hashtag: hashtag,
                youTuber: youTuber,
                youtubeURL: youtubeURL,
                storeNaverURL: storeNaverURL,
                storeAddress: storeAddress,
                youtubeContentId: youtubeContentId,
            });
            
        })
        .catch( (error) => {
            console.log("fail");
            console.log( error );
        });
    }, [])

    const changeValue = (e) => {
        const {name, value} = e.target;
        setBoardFromYoutube({
            ...boardFromYoutube,
            [name]: value
        });  
    }

    const updateContent = (e) => {
        e.preventDefault(); 

        let requestData = {...boardFromYoutube, 
            storeAddress: kakaoAddress};

        console.log(requestData);    
        axios.patch("http://" + httpAddress + "/store/" + id, JSON.stringify(requestData), { 
            headers: { 
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
            })
            .then( (result) => {
                    console.log(result);
                    window.location.href = "/";
            })
            .catch( (error) => {
                console.log(error);
                if( error.response.data.message === "잘못된 요청입니다."){
                    alert("필수 값이 빠졌습니다. 다시 확인해주세요.");
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
            <h1>가게 정보 변경</h1>
            <Form onSubmit={updateContent}>
                <Form.Group className="mb-3">
                    <Form.Label>가게 이름</Form.Label>
                    <Form.Control type="text" 
                                  placeholder="가게 이름을 적어주세요" 
                                  onChange={changeValue} 
                                  name="storeName"
                                  value={boardFromYoutube.storeName} />
                </Form.Group>

                <FloatingLabel className="mb-3" controlId="selectYoutuber" label="유튜버">
                    <Form.Select onChange={changeValue} name="youTuber" value={boardFromYoutube.youTuber} aria-label="Floating label select">
                        <option value=''>어떤 유튜버인가요?</option>
                        <option value='성시경 SUNG SI KYUNG'>성시경 SUNG SI KYUNG</option>
                        <option value='먹보스 쭈엽이'>먹보스 쭈엽이</option>
                        <option value='김사원세끼'>김사원세끼</option>
                    </Form.Select>
                </FloatingLabel>

                <FloatingLabel className="mb-3" controlId="selectCategory" label="카테고리">
                    <Form.Select onChange={changeValue} name="category" value={boardFromYoutube.category} aria-label="Floating label select">
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
                                   name="hashtag"
                                   value={boardFromYoutube.hashtag || ''}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>영상 링크</Form.Label>
                    <Form.Control  type="text" 
                                   placeholder="유튜브 링크(ex, https://www.youtube.com/watch?...)" 
                                   onChange={changeValue} 
                                   name="youtubeURL"
                                   value={boardFromYoutube.youtubeURL || ''}  />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>가게 링크(네이버)</Form.Label>
                    <Form.Control  type="text" 
                                   placeholder="네이버 링크(ex, https://map.naver.com/...)" 
                                   onChange={changeValue} 
                                   name="storeNaverURL"
                                   value={boardFromYoutube.storeNaverURL || ''}/>
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

export default UpdateForm;