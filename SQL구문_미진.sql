-- 변경사항

-- 관리자 리스트
SELECT
    B.BORROW_NO
    , L.BOOK_NO
    , L.TITLE
    , L.AUTHOR
    , L.COMPANY
    , M.MEMBER_NO
    , M.NAME
    , TO_CHAR(B.BORROW_DATE, 'YYYY/MM/DD') BORROW_DATE
    , TO_CHAR(B.DUE_DATE, 'YYYY/MM/DD') DUE_DATE
    , M.OVERDUE_COUNT
    , DECODE (S.BOOK_STATE, '대출가능', '반납완료', '대출중', '대출중', '연체중', '연체중') BOOK_STATE
    , BO.B_OPTION
    , BO.O_NO
FROM BORROW B
JOIN BOOK_LIST L ON L.BOOK_NO = B.BOOK_NO
JOIN BOOK_STATUS S ON S.STATUS_NO = L.STATUS_NO
JOIN (MEMBER M JOIN B_OPTION BO ON BO.O_NO = M.O_NO) ON M.MEMBER_NO = b.MEMBER_NO
WHERE M.DEL_YN = 'N'
ORDER BY B.BORROW_NO DESC
;


SELECT COUNT(*) AS LISTCOUNT
FROM BORROW B
JOIN BOOK_LIST L ON L.BOOK_NO = B.BOOK_NO
JOIN BOOK_STATUS S ON S.STATUS_NO = L.STATUS_NO
JOIN MEMBER M ON M.MEMBER_NO = B.MEMBER_NO
WHERE M.DEL_YN = 'N'
;
-----------------------------

-- 관리자 리스트 대출 제한 사항변경
UPDATE MEMBER
    SET O_NO = '2'
WHERE MEMBER_NO = '4'
;

ROLLBACK;



-- 관리자 리스트 대출 제한 사항 옵션 셋
SELECT 
    O_NO
    , B_OPTION
FROM B_OPTION
;



--------------------------------------------------------------------------------

-- 도서 상세정보(반납예정일 제외한...)
SELECT 
    L.BOOK_IMG
    , L.TITLE
    , L.AUTHOR
    , L.COMPANY
    , TO_CHAR(L.PUBLISHER_YEAR, 'YYYY/MM/DD') PUBLISHER_YEAR
    , L.BOOK_NO
    , L.BOOK_ROOM_NO
    , R.ROOM_NAME
    --, S.STATUS_NO
    --, S.BOOK_STATE
FROM BOOK_LIST L
JOIN BOOK_ROOM R ON R.BOOK_ROOM_NO = L.BOOK_ROOM_NO
--JOIN BOOK_STATUS S ON S.STATUS_NO = L.STATUS_NO
WHERE L.BOOK_NO = 1
;
   
   
-- 도서 상세정보(도서상태 / 반납예정일)

SELECT 
    L.BOOK_NO
    , TO_CHAR(B.DUE_DATE, 'YYYY/MM/DD') DUE_DATE
    , S.BOOK_STATE
FROM BORROW B
RIGHT OUTER JOIN BOOK_LIST L ON B.BOOK_NO = L.BOOK_NO
RIGHT OUTER JOIN BOOK_STATUS S ON S.STATUS_NO = L.STATUS_NO
WHERE L.BOOK_NO = 1
AND NOT S.STATUS_NO = 1
;

-- 로그인한 회원 정보 확인 (대출비번 확인용 + 대출버튼 노출용)
SELECT 
    M.BORROW_PWD
    , B.BOOK_NO
FROM MEMBER M
JOIN BORROW B ON B.MEMBER_NO = M.MEMBER_NO
;



--------------------------------------------------------------------------------

-- 대출 비밀번호 일치여부 확인
SELECT 
    MEMBER_NO
    , O_NO
    , BORROW_PWD
    , OVERDUE_COUNT
FROM MEMBER
WHERE MEMBER_NO = '1'
AND BORROW_PWD = '1111'
;


-- 대출 성공
UPDATE BOOK_LIST 
    SET STATUS_NO = '2'
WHERE BOOK_NO = '9'
AND STATUS_NO = '1'
;

INSERT INTO BORROW (BORROW_NO, BOOK_NO, MEMBER_NO, BORROW_DATE, DUE_DATE, RENEW)
VALUES (SEQ_BORROW_NO.NEXTVAL, #{bookNo}, #{memberNo}, SYSDATE, SYSDATE+20, '');

ROLLBACK;




--------------------------------------------------------------------------------

-- 유저 내서재 대출한 도서 리스트 확인
SELECT
    B.BOOK_NO
    , L.TITLE
    , L.AUTHOR
    , L.COMPANY
    , M.NAME
    , TO_CHAR(B.BORROW_DATE, 'YYYY/MM/DD') BORROW_DATE
    , TO_CHAR(B.DUE_DATE, 'YYYY/MM/DD') DUE_DATE
    , M.OVERDUE_COUNT
    , DECODE (S.BOOK_STATE, '대출가능', '반납완료', '대출중', '대출중', '연체중', '연체중', '반납완료','없앨것') BOOK_STATE
    , BO.B_OPTION
    , BO.O_NO
FROM BORROW B
JOIN BOOK_LIST L ON L.BOOK_NO = B.BOOK_NO
JOIN BOOK_STATUS S ON S.STATUS_NO = L.STATUS_NO
JOIN (MEMBER M JOIN B_OPTION BO ON BO.O_NO = M.O_NO) ON M.MEMBER_NO = B.MEMBER_NO
WHERE M.DEL_YN = 'N'
AND M.MEMBER_NO = '2'
ORDER BY B.BORROW_NO DESC
;


-- 유저 반납버튼 클릭시 도서리스트 책상태 변경
UPDATE BOOK_LIST 
    SET STATUS_NO = '1'
WHERE BOOK_NO = '7'
;
rollback;


-- 유저 반납버튼 클릭시 대출 날짜를 sysdate으로 변경
UPDATE BORROW
    SET DUE_DATE = SYSDATE
WHERE BOOK_NO = '7'
;

--------------------------------------------------------------------------------


SELECT 
    L.BOOK_NO
    , TO_CHAR(B.DUE_DATE, 'YYYY/MM/DD') DUE_DATE
FROM BORROW B
RIGHT OUTER JOIN BOOK_LIST L ON B.BOOK_NO = L.BOOK_NO
WHERE L.BOOK_NO = 31
;



    
    
SELECT 
    BOOK_IMG
    , TITLE
    , AUTHOR
    , COMPANY
    , PUBLISHER_YEAR
    , BOOK_NO
FROM BOOK_LIST
WHERE BOOK_NO = '1';



-- 도서번호	
--책 제목	
-- 저자	
-- 출판사	
-- 사용자 번호	
-- 사용자 이름	
-- 대출일	
-- 반납일	
-- 연체횟수	
-- 상태	
-- 제한사항



-- 해볼 것
SELECT 
    MEMBER_NO
    , O_NO
    , BORROW_PWD
    , OVERDUE_COUNT
FROM MEMBER
WHERE MEMBER_NO ='1'
AND BORROW_PWD = '1111'
;