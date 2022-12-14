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
            httpAddress + "/api/admin/store/" + id,        
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

        axios.patch(httpAddress + "/api/admin/store/" + id, JSON.stringify(requestData), { 
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
                if( error.response.data.message === "????????? ???????????????."){
                    alert("?????? ?????? ???????????????. ?????? ??????????????????.");
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

        setKakaoAddress(fullAddress);          // e.g. '?????? ????????? ????????????2??? 20 (?????????1???)'
    };

    return (
        <div>
            <h1>?????? ?????? ??????</h1>
            <Form onSubmit={updateContent}>
                <Form.Group className="mb-3">
                    <Form.Label>?????? ??????</Form.Label>
                    <Form.Control type="text" 
                                  placeholder="?????? ????????? ???????????????" 
                                  onChange={changeValue} 
                                  name="storeName"
                                  value={boardFromYoutube.storeName} />
                </Form.Group>

                <FloatingLabel className="mb-3" controlId="selectYoutuber" label="?????????">
                    <Form.Select onChange={changeValue} name="youTuber" value={boardFromYoutube.youTuber} aria-label="Floating label select">
                        <option value=''>?????? ???????????????????</option>
                        <option value='????????? SUNG SI KYUNG'>????????? SUNG SI KYUNG</option>
                        <option value='????????? ?????????'>????????? ?????????</option>
                        <option value='???????????????'>???????????????</option>
                    </Form.Select>
                </FloatingLabel>

                <FloatingLabel className="mb-3" controlId="selectCategory" label="????????????">
                    <Form.Select onChange={changeValue} name="category" value={boardFromYoutube.category} aria-label="Floating label select">
                        <option value=''>????????????</option>
                        <option value='koreanFood'>??????</option>
                        <option value='chineseFood'>??????</option>
                        <option value='japaneseFood'>??????</option>
                        <option value='westernFood'>??????</option>
                        <option value='etc'>??????</option>
                    </Form.Select>
                </FloatingLabel>

                <Form.Group className="mb-3">
                    <Form.Label>?????? ??????</Form.Label>
                    <Form.Control  type="text" 
                                   placeholder="??????(?????????, ????????? ?????? #??????, #????????? ?????? ???????????? ???????????? ??????????????????)" 
                                   onChange={changeValue} 
                                   name="hashtag"
                                   value={boardFromYoutube.hashtag || ''}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>?????? ??????</Form.Label>
                    <Form.Control  type="text" 
                                   placeholder="????????? ??????(ex, https://www.youtube.com/watch?...)" 
                                   onChange={changeValue} 
                                   name="youtubeURL"
                                   value={boardFromYoutube.youtubeURL || ''}  />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>?????? ??????(?????????)</Form.Label>
                    <Form.Control  type="text" 
                                   placeholder="????????? ??????(ex, https://map.naver.com/...)" 
                                   onChange={changeValue} 
                                   name="storeNaverURL"
                                   value={boardFromYoutube.storeNaverURL || ''}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>?????? ??????(???????????? ????????? ??????????????????.)</Form.Label>
                    <Form.Control type="text" 
                                  placeholder="?????? ??????" 
                                  onChange={changeValue} 
                                  value={kakaoAddress}
                                  name="storeAddress" 
                                  readOnly />
                </Form.Group>

                <Div>
                    <DaumPostcode 
                        onComplete={handleComplete}                     // ??? ?????? ??? ???????????? ?????????
                        autoClose={false}                               // ??? ?????? ??? ?????? ?????? ??????
                        {...props}                       
                    />
                </Div>
                
                <Button variant="primary" type="submit">
                    ??????
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