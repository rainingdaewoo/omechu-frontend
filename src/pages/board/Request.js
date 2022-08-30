import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form,  InputGroup, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RequestItem from '../../components/RequestItem';
import { useDispatch } from 'react-redux';
import { setNaverStore } from '../../redux/naverStore';
import httpAddress from '../../data/httpAddress';

const Request = () => {
    const dispatch = useDispatch()
    const [request, setRequest] = useState([]);
    const [last, setLast] = useState('');
	const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState('');
    const [active, setActive] = useState(1);
    const [keyword, setKeyword] = useState('');


    const changeValue = (e) => {
        setKeyword(e.target.value);  
    };

   const pressEnter = (e) => {
      if( e.key === "Enter") {
        search();
        e.preventDefault();
      }
    };
    
    const search = (e) => {
      console.log("keyword: " + keyword);
      
    };  

    const prev = () =>{
		setPage(page - 1);
	};

	const next = () =>{
		setPage(page  + 1);
	};

    const changePage = (number) => {
        setActive(number);
        setPage(number - 1);
    }

    useEffect( () => {
        axios.get(
            httpAddress + "/requests?page=" + page +"&size=10",        
            { headers: { 
                "Content-Type": "application/json",
                },
            })
        .then( (result) => {
            setRequest(result.data.content);
            setLast(result.data.last);
            setTotalPage(result.data.totalPages);
        })
        .catch( (error) => {
            console.log("fail");
            console.log( error );
        });
    }, [page]);

    
    let items = [];
    for (let number = 1; number <= totalPage; number++) {
      items.push(
        <Pagination.Item key={number} active={number === active} onClick={ () => changePage(number)}>
          {number}
        </Pagination.Item>,
      );
    }

    return (
        <div>
            <h1>요청 게시판</h1>

            { Object.keys(request).length > 0 ? 
				request.map(request => 
					<RequestItem key={request.requestId} request={request} />
                    ) 
				:
				null
			}

            <Link to="/writeRequest" className='float-right' >
                <Button style={{ float: "right" }}>작성</Button>
            </Link>

            <div className="d-flex justify-content-center">
				<Pagination>
					{page === 0 ? 
						<Pagination.Item onClick={prev} disabled>Prev</Pagination.Item> 
                        : 
						<Pagination.Item onClick={prev}>Prev</Pagination.Item>
                    }
					{items}
                    
					{last === true ? 
						<Pagination.Item onClick={next} disabled>Next</Pagination.Item> 
                        : 
						<Pagination.Item onClick={next}>Next</Pagination.Item>
                    }
				</Pagination>
			</div>

            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="게시판 제목, 내용, 글쓴이를 검색해보세요"
                    aria-label="요청 게시판 검색"
                    aria-describedby="basic-addon2"
                    onChange={changeValue}
                    onKeyDown={pressEnter}
                />
                <Button variant="outline-secondary" id="button-addon" onClick={search}>
                    Search
                </Button>
            </InputGroup> 
                
        </div>
    );
};

export default Request;