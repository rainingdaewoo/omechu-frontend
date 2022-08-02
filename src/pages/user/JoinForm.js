import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const JoinForm = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });

    const changeValue = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    }

    const submitUser = (e) => {
        console.log("console:", e);
        e.preventDefault(); //submit이 action을 안 타고 자기 할일을 그만함.
        
        fetch("http://localhost:8080/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(user)
        })
            .then( res => {
                console.log(1, res);
                if( res.status === 201){
                    return res.json();     
                } else {
                   return null;
                }
            })
            .then( res => {
                console.log("res:", res);
                if( res !== null ){
                    window.location.href = "/";
                } else {
                    alert("회원가입에 실패하였습니다");
                }
        }).catch( (error) => {
            console.log(error);
        });
    }

    return (
        <div>
            <h1>회원 가입</h1>
            <Form onSubmit={submitUser}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>닉네임</Form.Label>
                    <Form.Control  type="text" placeholder="사용하실 닉네임을 적어주세요" onChange={changeValue} name="username" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>아이디</Form.Label>
                    <Form.Control  type="email" placeholder="이메일을 적어주세요" onChange={changeValue} name="email"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={changeValue} name="password"/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    회원가입
                </Button>
            </Form>
        </div>
    );
};

export default JoinForm;