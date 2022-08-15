import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import YoutubeContentItem from '../../components/YoutubeContentItem';
import httpAddress from '../../data/httpAddress';
import { useSelector } from 'react-redux';


const ListYoutubeContent = () => {

    const stores = useSelector((state) => state.naverStore.value)
    const [last, setLast] = useState('');
	const [page, setPage] = useState(0);

    useEffect(() => {
        console.log(stores)
    }, [stores]); 

    const prev = () =>{
		setPage(page - 1);
	}

	const next = () =>{
		setPage(page  + 1);
	}

    return (
        <div>
            <h1>컨텐츠 리스트</h1>
			{ Object.keys(stores).length > 0 ? 
				stores.map(youtubeContents => 
					<YoutubeContentItem key={youtubeContents.id} youtubeContents={youtubeContents} 
				/>) 
				:
				null
			}
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