import React, { useState } from 'react';
import axios from 'axios';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import httpAddress from '../../data/httpAddress';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'; 
import "../../components/kakao.css"


const WriteRequest = () => {

    const [requestContent, setRequestContent] = useState({
        title: "",
        content: "",
        category: "", 
    });

    const changeValue = (e) => {
        const {name, value} = e.target;
        setRequestContent({
            ...requestContent,
            [name]: value
        });  
    }

    const submitContent = (e) => {
        e.preventDefault(); 
        axios.post(httpAddress + "/api/user/request/", JSON.stringify(requestContent), { 
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
    }
    
    return (
        <div>
            <h1>게시글 작성</h1>

            <Form onSubmit={submitContent}>
                <Form.Group className="mb-3">
                    <Form.Label>제목</Form.Label>
                    <Form.Control  type="text" 
                                   placeholder="제목을 적어주세요" 
                                   onChange={changeValue} 
                                   name="title" />
                </Form.Group>

                <FloatingLabel className="mb-3" controlId="selectCategory" label="카테고리">
                    <Form.Select onChange={changeValue} 
                                 name="category" 
                                 aria-label="Floating label select">
                        <option value=''>카테고리</option>
                        <option value='addStore'>가게 추가</option>
                        <option value='updateStore'>정보 수정</option>
                        <option value='report'>신고</option>
                        <option value='etc'>기타</option>
                    </Form.Select>
                </FloatingLabel>

                <CKEditor 
                    editor={ ClassicEditor }
                    data=""
                    config={{
                        placeholder: "내용을 입력해주세요"
                    }} 
                    onReady={ editor => {
                    } }
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setRequestContent({
                          ...requestContent,
                          content: data
                        })
                      }}
                    onBlur={ ( event, editor ) => {
                    } }
                    onFocus={ ( event, editor ) => {
                    } }
                />

                <Button variant="primary" type="submit">
                    등록
                </Button>
            </Form>
            
        </div>
    );
};



export default WriteRequest;