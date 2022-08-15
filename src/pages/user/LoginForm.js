import React, { useEffect } from 'react';


const LoginForm = () => {

    useEffect(() => {
       // 현재 회원이 로그인된 상태인지 확인
       // 만약 로그인 되어있다면 메인 페이지로 이동.
      }, []);

    return (
        <div>
            <h1>카카오 로그인으로 이용이 가능합니다!! :)</h1>
            <a href="http://3.34.171.86/oauth2/authorization/kakao">
                <img 
                    src="/kakao_login_medium_narrow.png" 
                    alt="kakaoLogin" 
                    />
            </a>
        </div>
    );
};

export default LoginForm;