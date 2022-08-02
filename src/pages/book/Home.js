import React, { useEffect, useState } from 'react';
import KakaoMap from '../../components/KakaoMap';

const Home = () => {

    const [users, setUsers] = useState([]);

    
    useEffect(() => {
        
    }, []);

    return (
        <div>
            <KakaoMap></KakaoMap>
        </div>
    );
};

export default Home;