import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import YoutubeContentItem from '../../components/YoutubeContentItem';
import httpAddress from '../../data/httpAddress';


const ListYoutubeContent = () => {

    const [youtubeContents, setYoutubeContents] = useState([]);
    const [last, setLast] = useState('');
	const [page, setPage] = useState(0);

    useEffect( () => {
        axios.get(
            "http://" + httpAddress + "/stores/",        
            { headers: { 
                Authorization: "Bearer " + localStorage.getItem("token"),
                                "Content-Type": "application/json",
                                },
                })
        .then( (result) => {
            console.log(result.data);
            setYoutubeContents(result.data);
        })
        .catch( (error) => {
            console.log("fail");
            console.log( error );
        });
    
    }, []); 

    const prev = () =>{
		setPage(page-1);
	}

	const next = () =>{
		setPage(page+1);
	}

    return (
        <div>
            <h1>컨텐츠 리스트</h1>
            {youtubeContents.map(youtubeContents => 
                <YoutubeContentItem key={youtubeContents.id} youtubeContents={youtubeContents} 
            />)}
			<br />
			<div className="d-flex justify-content-center">
				<Pagination>
					{page === 0 ? 
						<Pagination.Item onClick={prev} disabled>Prev</Pagination.Item> : 
						<Pagination.Item onClick={prev}>Prev</Pagination.Item>}
					{last === true ? 
						<Pagination.Item onClick={next} disabled>Next</Pagination.Item> : 
						<Pagination.Item onClick={next}>Next</Pagination.Item>}
				</Pagination>
			</div>
        </div>
    );
};
export default ListYoutubeContent;