import React, { useEffect} from 'react';
import styled from "styled-components";
import jwt_decode  from 'jwt-decode'
import { useSelector } from 'react-redux';
import "./kakao.css"

const { kakao } = window;

const KakaoMap = () => {

    const stores = useSelector((state) => state.naverStore.value)

    useEffect(() => {
        let mapContainer = document.getElementById('map'),          // 지도를 표시할 div tt

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
        if( Object.keys(stores).length > 0 ) {
            stores.forEach(store => {
                // 주소-좌표 변환 객체
                let geocoder = new kakao.maps.services.Geocoder();
                
                // 주소로 좌표 검색
                geocoder.addressSearch(store.address, function(result, status) {
                    
                // 정상적으로 검색이 완료됐으면 
                    if (status === kakao.maps.services.Status.OK) {
                
                        let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                        
                        let imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";   // 마커 이미지 주소
                        let imageSize = new kakao.maps.Size(24, 35);                                                // 마커 이미지 크기
                        let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);                          // 마커 이미지 생성    

                        // 결과값으로 받은 위치를 마커로 표시
                        let marker = new kakao.maps.Marker({
                            map: map,
                            position: coords,                 // 마커 표시 위치
                            title : store.storeName,          // 마커 타이틀, 마커에 마우스를 올리면 타이틀이 표시
                            image : markerImage               // 마커 이미지
                        });

                        if(store.likes.length != 0) {
                            console.log(store.likes.Map)
                        }
                        // content 부분에는 string 타입만을 받기 때문에 컴포넌트가 들어갈 수 없음. 
                        // 따라서 번거롭지만 다음과 같이 커스텀 오버레이를 작성해야함.
                        // let content = '<div class="customoverlay" >' + 
                        //                 '    <div class="info">' +
                        //                 '        <div class="title">' + 
                        //                 '                <a>' +
                        //                             store.storeName + ' <img src="/unlike.png" style="width:24px; height:24px;" />' +
                        //                 '                </a>' +
                        //                 '        </div>' + 
                        //                 '        <div class="body">' + 
                        //                 '            <div class="youtubeImg">' + 
                        //                 '                <a href=' + store.youtubeContents[0].url  + ' target="_blank"> ' +
                        //                 '                   <img style="width:220px; height:100px;" src=' +store.youtubeContents[0].imageURL +  ' target="_blank"/>' +
                        //                 '                </a>' +
                        //                 '                <div class="storeInfo">' + 
                        //                 '                    <a>' +
                        //                                         store.address + 
                        //                 '                    </a>' +
                        //                 '                    <a href="' + store.storeNaverURL  + '" target="_blank" class="link">' +
                        //                 '                       <img src="/naverIcon.png" style="width:24px; height:24px;" />' +
                        //                 '                    </a>' +
                        //                 '                </div>' + 
                        //                 '            </div>' + 
                        //                 '        </div>' + 
                        //                 '    </div>' +    
                        //                 '</div>';

                        // content HTMLElement 생성
                        var content = document.createElement('div');
                        content.className = 'customoverlay';
                        
                        var closeButton = document.createElement('img');
                        closeButton.className = 'closeButton';
                        closeButton.onclick = function() {
                            clickedOverlay.setMap(null);
                         };
                        closeButton.setAttribute("src", "/closeButton.png");
                        closeButton.setAttribute("width", "20");
                        closeButton.setAttribute("height", "20");
                        content.appendChild(closeButton);


                        var info = document.createElement('div');
                        info.className = 'info';

                        
                        
                        var title = document.createElement('div');
                        title.className = 'title';
                        info.appendChild(title);
                        
                            var title_a = document.createElement('a');
                            title_a.appendChild(document.createTextNode("       "+ store.storeName));
                                var likeImg = document.createElement('img');
                                likeImg.setAttribute("src", "/unlike.png");
                                likeImg.setAttribute("width", "24");
                                likeImg.setAttribute("height", "24");
                                title_a.appendChild(likeImg);
                                // var closeButton = document.createElement('img');

                                // closeButton.onclick = function() {
                                //     clickedOverlay.setMap(null);
                                //  };
                                // closeButton.setAttribute("src", "/closeButton.png");
                                // closeButton.setAttribute("float", "right");
                                // closeButton.setAttribute("width", "24");
                                // closeButton.setAttribute("height", "24");
                                // title_a.appendChild(closeButton);
                            title.appendChild(title_a);

                        var body = document.createElement('div');
                        body.className = 'body';
                        info.appendChild(body);

                        var youtubeImg = document.createElement('div');
                        youtubeImg.className = 'youtubeImg';
                        body.appendChild(youtubeImg);

                            var youtubeImg_a = document.createElement('a');
                            youtubeImg_a.setAttribute("href", store.youtubeContents[0].url);
                            youtubeImg_a.setAttribute("target", "_blank");
                                var youtubeImg_a_img = document.createElement('img');
                                youtubeImg_a_img.setAttribute("src", store.youtubeContents[0].imageURL);
                                youtubeImg_a_img.setAttribute("width", "220");
                                youtubeImg_a_img.setAttribute("height", "100");
                                youtubeImg_a_img.setAttribute("target", "_blank");
                                youtubeImg_a.appendChild(youtubeImg_a_img);
                            youtubeImg.appendChild(youtubeImg_a);

                            var storeInfo = document.createElement('div');
                            storeInfo.className = 'storeInfo';
                                var storeInfo_a1 = document.createElement('a');
                                storeInfo_a1.appendChild(document.createTextNode(store.address));
                                storeInfo.appendChild(storeInfo_a1);
                                var storeInfo_a2 = document.createElement('a');
                                storeInfo_a2.className = 'link';
                                storeInfo_a2.setAttribute("href", store.storeNaverURL);
                                storeInfo_a2.setAttribute("target", "_blank");
                                    var storeInfo_a2_img = document.createElement('img');
                                    storeInfo_a2_img.setAttribute("src", "/naverIcon.png");
                                    storeInfo_a2_img.setAttribute("width", 24);
                                    storeInfo_a2_img.setAttribute("height", 24);
                                    storeInfo_a2.appendChild(storeInfo_a2_img);
                                storeInfo.appendChild(storeInfo_a2);
                            body.appendChild(storeInfo);



                        content.appendChild(info);
 
                        
                        kakao.maps.event.addListener(marker, 'click', function() { //  마커 클릭 시 이벤트

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
                        
                        kakao.maps.event.addListener(map, 'click', function(mouseEvent) {    //지도 클릭 시 이벤트    
                            closeOverlay();
                        });
                    }
                });
            });
        }
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