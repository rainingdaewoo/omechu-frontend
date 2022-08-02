import React, { useEffect } from "react";
import { useParams } from "react-router";

const KakaoLoginRedirect = () => {
  const params = useParams();

  useEffect(() => {
    console.log("!!!params.token")
    localStorage.clear();
    localStorage.setItem("token", params.token);
    window.location.replace("/");
    
  }, []);

  return <></>;
}

export default KakaoLoginRedirect;