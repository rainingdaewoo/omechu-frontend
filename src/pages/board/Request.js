import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RequestItem from '../../components/RequestItem';
import httpAddress from '../../data/httpAddress';


const Request = () => {

    const [request, setRequest] = useState([]);
    const [last, setLast] = useState('');
	const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState('');
    const [active, setActive] = useState(1);

    const prev = () =>{
		setPage(page - 1);
	}

	const next = () =>{
		setPage(page  + 1);
	}

    const changePage = (number) => {
        console.log(number);
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
            console.log(result.data);
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
					<RequestItem key={request.id} request={request} />
                    ) 
				:
				null
			}
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
                 
                <Link to="/writeRequest" className='float-right'>
                    <Button>작성</Button>
                   
                </Link>
			</div>
                
        </div>
    );
};

export default Request;