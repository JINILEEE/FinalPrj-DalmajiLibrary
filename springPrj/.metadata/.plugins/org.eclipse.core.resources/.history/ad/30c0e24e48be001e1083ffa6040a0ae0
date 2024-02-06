package com.dalmaji.app.borrow.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dalmaji.app.borrow.dao.MemberBorrowDao;
import com.dalmaji.app.borrow.vo.BorrowVo;
import com.dalmaji.app.page.vo.PageVo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class MemberBorrowService {
	
	private final SqlSession sst;
	private final MemberBorrowDao dao;

	// 대출 리스트
	public List<BorrowVo> list(String memberNo){
		return dao.list(sst, memberNo);
	}

	//유저 반납처리
	public Map<String, Object> returnBook(String bookNo) throws IllegalAccessException {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		resultMap.put("status", "bad");
		int result = dao.updateBookState(sst, bookNo);
		
		if(result != 1) {
			resultMap.put("msg", "책 상태 업데이트 실패");
			return resultMap;
		}
		
		int result2 = dao.updateDueDate(sst, bookNo);
		if(result2 != 1) {
			throw new IllegalAccessException("실패...");
		}
		
		log.info("들어온 북넘버::: {}, 북 상태 업데이트:: {}, 반납일자 업데이트:: {}", bookNo, result, result2);

		resultMap.put("status", "good");
		
		return resultMap;
	}

}
