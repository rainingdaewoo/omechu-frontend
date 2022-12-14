import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import httpAddress from '../../data/httpAddress';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'; 
import "../../components/kakao.css"

const UpdateRequestForm = (props) => {
    const propsParam = useParams();
    const requestId = propsParam.id;
    const [content, setContent] = useState('');
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
    };

    useEffect( () => {

        axios.get(
            httpAddress + "/api/user/request/" + requestId,        
            { headers: { 
                Authorization: "Bearer " + localStorage.getItem("token"),
                                "Content-Type": "application/json",
                                },
                })
        .then( (result) => {
            setRequestContent({
                title: result.data.title,
                category: result.data.category,
                content: result.data.content
            });
            setContent(result.data.content);
        })
        .catch( (error) => {
            console.log("fail");
            console.log( error );
        });
    }, [])

    const submitContent = (e) => {
        e.preventDefault(); 
        axios.patch(httpAddress + "/api/user/request/" + requestId, JSON.stringify(requestContent), { 
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
                if( error.response.data.message === "????????? ???????????????."){
                    alert("?????? ?????? ???????????????. ?????? ??????????????????.");
                }
            });;
    }

    return (
        <div>
            <h1>????????? ??????</h1>

            <Form onSubmit={submitContent}>
                <Form.Group className="mb-3">
                    <Form.Label>??????</Form.Label>
                    <Form.Control  type="text" 
                                   placeholder="????????? ???????????????" 
                                   onChange={changeValue} 
                                   name="title"
                                   value={requestContent.title} />
                </Form.Group>

                <FloatingLabel className="mb-3" controlId="selectCategory" label="????????????">
                    <Form.Select onChange={changeValue} 
                                 name="category" 
                                 aria-label="Floating label select"
                                 value={requestContent.category}>
                        <option value=''>????????????</option>
                        <option value='addStore'>?????? ??????</option>
                        <option value='updateStore'>?????? ??????</option>
                        <option value='report'>??????</option>
                        <option value='etc'>??????</option>
                    </Form.Select>
                </FloatingLabel>

                <CKEditor 
                    editor={ ClassicEditor }
                    data= ""
                    config={{
                        placeholder: "????????? ??????????????????"
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
                    ??????
                </Button>
            </Form>
            
        </div>
    );
};

export default UpdateRequestForm;