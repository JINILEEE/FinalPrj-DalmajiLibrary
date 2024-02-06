package com.dalmaji.app.admin.search.service;

import java.nio.channels.IllegalSelectorException;
import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.dalmaji.app.admin.search.dao.AdminSearchDao;
import com.dalmaji.app.book.dao.BookDao;
import com.dalmaji.app.book.vo.BookVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminSearchService {

	private final AdminSearchDao dao;
	private final SqlSessionTemplate sst;

	// 도서 작성
	public int write(BookVo vo) {
		String str = vo.getBookImg().replace("C:\\JAVA_LAP\\dev\\dalmaji\\springPrj\\dalmajiPrj\\src\\main\\webapp", "http://127.0.0.1:8888/app");
		vo.setBookImg(str);
		if (vo.getTitle().length() == 0) {
			throw new IllegalSelectorException();
		}
		
		System.out.println("service수정" + vo);

		// bookCateNo가 null이면 기본값으로 설정 (이 부분을 적절히 변경해주세요)
        if (vo.getBookCateNo() == null) {
            vo.setBookCateNo("기본 카테고리"); // 적절한 값을 설정해주세요.
        }
		return dao.insert(sst, vo);
	}

	//삭제
	public int delete(BookVo vo) {
		return dao.delete(sst ,vo);
	}
	
	//수정하기
		public int edit(BookVo vo) {
			String str = vo.getBookImg().replace("C:\\JAVA_LAP\\dev\\dalmaji\\springPrj\\dalmajiPrj\\src\\main\\webapp", "http://127.0.0.1:8888/app");
			vo.setBookImg(str);
			
			System.out.println("service수정" + vo);
			
			return dao.edit(sst, vo);
		}
		
		

}
