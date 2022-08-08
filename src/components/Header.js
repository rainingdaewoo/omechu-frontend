/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { Button, Container, Form, FormControl, Navbar, Offcanvas, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import youtuberData from '../data/youtuberData';
import httpAddress from '../data/httpAddress';

const CATEGORY = [
  { id: 0, value: '카테고리' },
  { id: 1, value: '한식' },
  { id: 2, value: '중식' },
  { id: 3, value: '일식' },
];

const Header = () => {
  const [loginCheck, setLoginCheck] = useState('');
  const [searchCategory, setSearchCategory] = useState('카테고리');
  const [stores, setStores] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [searchRequest, setSearchRequest] = useState({
    searchCategory: "",
    keyword: "",
});
  
  const handleDropCategory = e => {  // onChange 이벤트가 발생한 target을 받아와 value값 할당
    const { value } = e.target;
    setSearchCategory(CATEGORY.filter(el => el.value === value)[0].value);     // 카테고리에 넣을 데이터
  };

  const goMypage = () => {
    // 토큰이 없거나 토큰 유효기간이 만료되었을 때는 로그인 화면으로 이동
    if (localStorage.getItem("token") === null) {
      alert("로그인 해주세요.");
      document.location.href = "/loginForm";
      };
    };

    const changeValue = (e) => {
      const {name, value} = e.target;
      setKeyword(e.target.value);  
  }

  const search = (e) => {
    console.log(keyword);
    console.log(searchCategory);
     setSearchRequest({
       searchCategory: {searchCategory},
       keyword: {keyword}
     });

     console.log(searchRequest);
  }  

    

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
          setLoginCheck(true);
        } else {
          setLoginCheck(false);
        }

        axios.get(
          "http://" + httpAddress + "/youtubeContent/",        
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
        <div>
          <Navbar.Toggle className="float-leftr" aria-controls={`offcanvasNavbar-expand-false`} /> 
          <Navbar.Brand>
            <Link to="/" className="navbar-brand float-right">
                Omechu
            </Link>
          </Navbar.Brand>
        </div>
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
            {CATEGORY.map((category) => {
              return <option key={category.id}> {category.value} </option>
            })}
          </select>

          <FormControl
            type="search"
            onChange={changeValue}
            name="keyword"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            aria-describedby="inputGroup-sizing-default"
            style={{ width: 500, padding: 3 }}
          />

          <Button variant="outline-success" onClick={search}>Search</Button>

        </Form>
          <div>             
            { loginCheck ? 
                (<Link to="/myPage" 
                       className="nav-link" 
                       onClick={goMypage} 
                       style={{ color: "white", float: "left" }}>내 정보</Link>) 
                : 
                (<Link to="/loginForm" 
                       className="nav-link" 
                       style= {{ color: "white", float: "left" }}>로그인</Link>)
            }
            <Link to="/writeFromKakaoMap" 
                  className="nav-link" 
                  style={{ color: "white", float: "right" }}>맛집 추가</Link>
          </div>  
          </Container>
        </Navbar>
      <br />
    </>
    );
};



export default Header;