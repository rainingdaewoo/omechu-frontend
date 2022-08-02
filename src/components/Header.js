/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { Button, Container, Form, FormControl, Navbar, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import youtuberData from '../data/youtuberData';

const CATEGORY = [
  { id: null, value: '카테고리' },
  { id: '0001', value: '한식' },
  { id: '0002', value: '중식' },
  { id: '0003', value: '일식' },
];

const Header = () => {
  const [loginCheck, setLoginCheck] = useState('');
  const [searchCategory, setSearchCategory] = useState('카테고리');
  const [stores, setStores] = useState([]);

  
  const handleDropCategory = e => {  // onChange 이벤트가 발생한 target을 받아와 value값 할당
    const { value } = e.target;
    setSearchCategory(CATEGORY.filter(el => el.value === value)[0].id);     // 카테고리에 넣을 데이터
  };

  const goMypage = () => {
    // 토큰이 없거나 토큰 유효기간이 만료되었을 때는 로그인 화면으로 이동
    if (localStorage.getItem("token") === null) {
      alert("로그인 해주세요.");
      document.location.href = "/loginForm";
      };
    };

  const search = (e) => {
    console.log("체크체큰");
  }  

    

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
          setLoginCheck(true);
        } else {
          setLoginCheck(false);
        }

        axios.get(
          "http://localhost:8080/youtubeContent/",        
          { headers: { 
                            "Content-Type": "application/json",
                            },
            })
        .then( (result) => {
          setStores(result.data);
        })
        .catch( (error) => {
            console.log("fail");
            console.log( error );
        });    
      }, []);    
        






  return (
    <>
    <Navbar key="false" bg="dark"  variant="dark" expand="false" className="mb-3">
      <Container fluid>      
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} /> 
          <Link to="/" className="navbar-brand">
              omechu
          </Link>
          &nbsp;   &nbsp;   &nbsp;   &nbsp;&nbsp;   &nbsp; &nbsp;   &nbsp;
          &nbsp;   &nbsp;    &nbsp;   &nbsp; &nbsp;   &nbsp; &nbsp;   &nbsp;
          &nbsp; &nbsp;   &nbsp;  &nbsp; &nbsp;   &nbsp;  &nbsp; &nbsp;   &nbsp;

            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-false`}
              aria-labelledby={`offcanvasNavbarLabel-expand-false`}
              placement="start"
              scroll = {true}
              backdrop= {false}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
                  유튜버 목록
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                {youtuberData.map((youtuberData, idx) => {
                  return (
                  <ul>
                    <li key={youtuberData.id}>
                      <a>
                        <img 
                          style={{ height: 24, width: 24 }} 
                          src= {youtuberData.profileImgUrl} 
                        />
                        {youtuberData.youtuber}
                      </a>
                    </li>
                  </ul>);
                })
                
                }
                
              </Offcanvas.Body>
            </Navbar.Offcanvas>
              <Form className="d-flex">
                <select
                  className="me-1"
                  variant="outline-secondary"
                  title={searchCategory}
                  id="input-group-dropdown-1"
                  onChange={handleDropCategory}
                  style={{ width: 110, padding: 3 }}
                >
                  {CATEGORY.map(el => {
                    return <option key={el.id}>{el.value}</option>;
                  })}
                </select>

                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  aria-describedby="inputGroup-sizing-default"
                  style={{ width: 500, padding: 3 }}
                />

                <Button variant="outline-success" onClick={search}>Search</Button>

              </Form>
            &nbsp;   &nbsp;   &nbsp;   &nbsp;&nbsp;   &nbsp; &nbsp;   &nbsp;
            &nbsp;   &nbsp;    &nbsp;   &nbsp; &nbsp;   &nbsp; &nbsp;   &nbsp;
            &nbsp;   &nbsp;    &nbsp;   &nbsp; &nbsp;   &nbsp; &nbsp;   &nbsp;
            
            
            { loginCheck ? 
                (<Link to="/myPage" className="nav-link" onClick={goMypage} style={{ color: "white" }}>내 정보</Link>) 
                : 
                (<Link to="/loginForm" className="nav-link" style={{ color: "white" }}>로그인</Link>)
            }
            <Link to="/writeFromKakaoMap" className="nav-link" style={{ color: "white" }}>맛집 추가</Link>
          
          </Container>
        </Navbar>
      <br />
    </>
    );
};



export default Header;