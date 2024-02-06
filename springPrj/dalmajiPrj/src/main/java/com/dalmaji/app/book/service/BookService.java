package com.dalmaji.app.book.service;

import java.nio.channels.IllegalSelectorException;
import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.dalmaji.app.book.dao.BookDao;
import com.dalmaji.app.book.dto.SearchBookDto;
import com.dalmaji.app.book.vo.BookVo;
import com.dalmaji.app.page.vo.PageVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookService {

	private final BookDao dao;
	private final SqlSessionTemplate sst;

	// 목록조회
	public List<BookVo> list(PageVo pvo) {
		return dao.list(sst, pvo);
	}
	
  
	
    // 총 게시글 수 가져오는 메소드
    public int getTotalCount() {
        return dao.getTotalCount(sst);
    }

	// 검색에 대한 총 게시글 수 가져오는 메소드
	public int getSearchTotalCount(String title, String author, String company) {
	    return dao.getSearchTotalCount(sst, title, author, company);
	}

	// 카테고리별 도서 목록 가져오기
	public List<BookVo> getBookListByBookCate(String bookCateNo) {
		return dao.getBookListByBookCate(bookCateNo, sst);
	}
	
	// 검색 결과 목록 조회
	public List<BookVo> searchList(PageVo pvo, String title, String author, String company) {
	    return dao.searchList(sst, pvo, title, author, company);
	}


	
	//검색(목록)
	public List<BookVo> detail(SearchBookDto searchBookDto) {
		List<BookVo> voList = dao.detail(sst, searchBookDto);
		System.out.println("voList ::: " + voList);
	    return voList;
	}
	
	

	

}