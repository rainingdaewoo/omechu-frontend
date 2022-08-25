import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/youtubeContent/Home';
import UpdateForm from './pages/youtubeContent/UpdateForm';
import LoginForm from './pages/user/LoginForm';
import KakaoLoginRedirect from './pages/user/KakaoLoginRedirect';
import MyPage from './pages/user/MyPage';
import WriteFromKakaoMap from './pages/youtubeContent/WriteFromKakaoMap';
import ListYoutubeContent from './pages/youtubeContent/ListYoutubeContent';
import YoutubeContentDetail from './pages/youtubeContent/YoutubeContentDetail';
import Request from './pages/board/Request';
import WriteRequest from './pages/board/WriteRequest';
import RequestDetail from './pages/board/RequestDetail';
import UpdateRequestForm from './pages/board/UpdateRequestForm';

function App() {
  return (
    <div>
    <Header />
     <Container>
        <Routes>
          <Route path="/" 
                 element={<Home />} />
          <Route path="/writeFromKakaoMap" 
                 element={<WriteFromKakaoMap />} />
          <Route path="/loginForm" 
                 element={<LoginForm />} />
          <Route path="/updateForm/:id" 
                 element={<UpdateForm />} />
          <Route path="/youtubeContent/:id" 
                 element={<YoutubeContentDetail />} />
          <Route path="/myPage" 
                 element={<MyPage />} />
          <Route path="/listYoutubeContent" 
                 element={<ListYoutubeContent />} />
           <Route path="/request" 
                 element={<Request />} />
          <Route path="/request/:id" 
                 element={<RequestDetail />} />
          <Route path="/updateRequestForm/:id" 
                 element={<UpdateRequestForm />} />
          <Route path="/writeRequest" 
                 element={<WriteRequest />} />        
          <Route path="/oauth2/redirect/:token"
                 element={<KakaoLoginRedirect />}
          />
          <Route path="*" element={<div>에러 페이지</div>}></Route>
        </Routes>
      </Container>  
  </div>
  );
};

export default App;