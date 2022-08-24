/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import jwt_decode  from 'jwt-decode'
import { Button, Container, Form, FormControl, Navbar, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import youtuberData from '../data/youtuberData';
import httpAddress from '../data/httpAddress';
import { useDispatch } from 'react-redux';
import { setNaverStore } from '../redux/naverStore';

const CATEGORY = [
  { id: 1, name: '카테고리', value:'' },
  { id: 2, name: '한식', value:'koreanFood'},
  { id: 3, name: '중식', value:'chineseFood' },
  { id: 4, name: '일식', value:'japaneseFood' },
  { id: 5, name: '양식', value:'westernFood' },
  { id: 6, name: '기타', value:'etc' },
];

const Header = () => {
  const [loginCheck, setLoginCheck] = useState('');
  const [authorityCheck, setAuthorityCheck] = useState(false);
  const [searchCategory, setSearchCategory] = useState('');
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch()
  
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
      setKeyword(e.target.value);  
  }

  const pressEnter = (e) => {
    if( e.key === "Enter") {
      search();
      e.preventDefault();
    }
}

  const search = (e) => {
    axios.get(
       httpAddress + "/stores?keyword=" + keyword + "&category=" + searchCategory,        
      { headers: { 
            "Content-Type": "application/json",
            },
        })
    .then( (result) => {
      dispatch(setNaverStore(result.data));
    })
    .catch( (error) => {
        console.log("fail");
        console.log( error );
    });
  }  

  const findByYoutuberName = (youtuber) => {
    console.log(youtuber);
    axios.get(
      httpAddress + "/stores?keyword=" + youtuber,        
     { headers: { 
           "Content-Type": "application/json",
           },
       })
   .then( (result) => {
     dispatch(setNaverStore(result.data));
   })
   .catch( (error) => {
       console.log("fail");
       console.log( error );
   });
  }  

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setLoginCheck(true);
    } else {
      setLoginCheck(false);
    }

    if(localStorage.getItem("token") !== null && jwt_decode("Bearer " +localStorage.getItem("token")).roleType === "ROLE_ADMIN") {
      setAuthorityCheck(true);
    } else {
      setAuthorityCheck(false);
    }
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
            <ul>
              {youtuberData.map((youtuberData) => {
                 return (
                    <li key={youtuberData.id} onClick={() => {
                      findByYoutuberName(youtuberData.youtuber);
                    }}>
                      <a>
                        <img 
                          style={{ height: 24, width: 24 }} 
                          src= {youtuberData.profileImgUrl} 
                        />
                        {" " + youtuberData.youtuber}
                      </a>
                    </li>
                  );
                })
              }
              </ul>
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
              return <option key={category.id} value={category.value} > {category.name} </option>
            })}
          </select>

          <FormControl
            type="search"
            onChange={changeValue}
            onKeyDown={pressEnter}
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
            <Link to="/request" 
                       className="nav-link" 
                       style={{ color: "white", float: "left" }}>요청</Link>             
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
            { authorityCheck ? 
              (<>
                <Link to="/listYoutubeContent" 
                      className="nav-link" 
                      style={{ color: "white", float: "right" }}>게시글 리스트</Link>      
                <Link to="/writeFromKakaoMap" 
                      className="nav-link" 
                      style={{ color: "white", float: "right" }}>맛집 추가</Link>
              </>) 
              : null
            }
          </div>  
          </Container>
        </Navbar>
      <br />
    </>
    );
};



export default Header;