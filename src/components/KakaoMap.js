import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import axios from 'axios';
import httpAddress from '../data/httpAddress';

const { kakao } = window;

const KakaoMap = () => {

    const [stores, setStores] = useState([]);
    
    useEffect(() => {
        axios.get(
            "http://" + httpAddress + "/stores/",        
            { headers: { 
                Authorization: "Bearer " + localStorage.getItem("token"),
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

    useEffect(() => {
        console.log("test");
        let mapContainer = document.getElementById('map'),          // 지도를 표시할 div 

        mapOption = {
            center: new kakao.maps.LatLng(37.5609532, 126.9789347), // 지도의 중심좌표(시청)
            level: 8,                                               // 지도의 확대 레벨
            mapTypeId : kakao.maps.MapTypeId.ROADMAP                // 지도종류
        };  
    
        // 지도 생성   
        let map = new kakao.maps.Map(mapContainer, mapOption); 
        
		var zoomControl = new kakao.maps.ZoomControl();                 // 지도에 확대 축소 컨트롤을 생성한다
		map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);  // 지도의 우측에 확대 축소 컨트롤을 추가한다

        let clickedOverlay = null;

        stores.forEach(store => {
            // 주소-좌표 변환 객체
            let geocoder = new kakao.maps.services.Geocoder();

            // 주소로 좌표 검색
            geocoder.addressSearch(store.address, function(result, status) {
                
            // 정상적으로 검색이 완료됐으면 
                if (status === kakao.maps.services.Status.OK) {
            
                    let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            
                    // 마커 이미지 주소
                    let imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
                    let imageSize = new kakao.maps.Size(24, 35);                        // 마커 이미지 크기
                    let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);  // 마커 이미지 생성    

                    // 결과값으로 받은 위치를 마커로 표시
                    let marker = new kakao.maps.Marker({
                        map: map,
                        position: coords,                 // 마커 표시 위치
                        title : store.storeName,          // 마커 타이틀, 마커에 마우스를 올리면 타이틀이 표시
                        image : markerImage               // 마커 이미지
                    });
                    
                    // content 부분에는 string 타입만을 받기 때문에 컴포넌트가 들어갈 수 없음. 
                    // 따라서 번거롭지만 다음과 같이 커스텀 오버레이를 작성해야함.
                    let content = '<div class="wrap" style="padding:0 5px;background:#fff; width:250px; height:200px;>' + 
                                    '    <div class="info">' +
                                    '        <div class="title">' + 
                                                 store.storeName + 
                                    '            <button onClick="clickedOverlay.setMap(null);">X</button>' +
                                    '        </div>' +  
                                    '        <div class="body">' + 
                                    '            <div class="youtubeImg">' + 
                                    '                <a href=' + store.youtubeContents[0].url  + ' target="_blank"> ' +
                                    '                   <img style="width:220px; height:100px;" src=' +store.youtubeContents[0].imageURL +  ' target="_blank"/>' +
                                    '                </a>' +
                                    '                <br /> ' +
                                    '                <a href="' + store.storeNaverURL  + '" target="_blank" class="link">' +
                                    '                   <img src="/btnG_아이콘사각.png" style="width:24px; height:24px;" />' +
                                    '                </a>' +
                                    '                <div class="storeInfo">' + store.address + '</div>' + 
                                    '            </div>' + 
                                    '        </div>' + 
                                    '    </div>' +    
                                    '</div>';
                    
                    kakao.maps.event.addListener(marker, 'click', function() {

                        var CustomOverlay  = new kakao.maps.CustomOverlay({
                            content: content,
                            map: map,
                            clickable : true,                   // 커스텀 오버레이 클릭 시 지도에 이벤트를 전파하지 않도록 설정
                            position: marker.getPosition(),     // 커스텀 오버레이를 표시할 좌표
                            xAnchor: 0.5,                       // 컨텐츠의 x 위치
                            yAnchor: 1.2                        // 컨텐츠의 y 위치       
                       });

                        if (clickedOverlay) {
                            closeOverlay();
                        }
                        CustomOverlay.setMap(map);
                        clickedOverlay = CustomOverlay;
                    });

                     // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다 
                    function closeOverlay() {
                        clickedOverlay.setMap(null);     
                    } 
                }
            });
        });
    
    }, [stores]);

    return (
        <>
            <StoredMap id="map" />
        </>
    );
}

const StoredMap = styled.div`
    width: 1200px;
    height: 800px;
`;

export default KakaoMap;