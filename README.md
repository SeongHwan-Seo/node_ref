
배포방법
1.npm install
<!-- 2.FCM 비공개 인증키 발급 받아 fcm 폴더 하위의 넣기 -->
3.오라클_client 환경 변수 (path) 에 설정하기
4.cmd -> 해당 경로 -> >>node app.js || >>supervisor app.js
									(supervisor: 수정후 일일이 terminal 끄고 켜는 작업을 줄여줌)
									supervisor package 설치방법: npm install supervisor -g
									(※ xml파일은 수정해도 자동 재실행 안되니 유의)
4.cmd -> 해당 경로 -> node app.js
5.구현.
3.npm run:build
4.배포



기본 테이블

<!-- APK 버전 관리 테이블 -->
CREATE TABLE APK_VERSION (
	APK_V INT NOT NULL,
	CREATE_DATE DATE,
	FILE_PATH VARCHAR(100),
	CONSTRAINT APK_VERSION_PK PRIMARY KEY (APK_V)
) 

<!-- 초기 데이터 -->
INSERT INTO APK_VERSION VALUES
(1 , GETDATE() , 'D:\PROJECT\PROJECT_LOG\FILES\APK\1.0' )

