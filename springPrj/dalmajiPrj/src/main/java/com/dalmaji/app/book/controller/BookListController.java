package com.dalmaji.app.book.controller;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dalmaji.app.book.dto.SearchBookDto;
import com.dalmaji.app.book.service.BookService;
import com.dalmaji.app.book.vo.BookVo;
import com.dalmaji.app.borrow.vo.AdminBorrowVo;
import com.dalmaji.app.page.vo.PageVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("search")
@CrossOrigin(origins ="*", allowedHeaders = "*")
@RequiredArgsConstructor
public class BookListController {

	private final BookService service;

	// 목록조회(no,제목,저자,발행처,발행년도,도서상태)
	@GetMapping("list")
	public Map<String, Object> list(@RequestParam(defaultValue = "1") int currentPage,
	                                @RequestParam(required = false) String title,
	                                @RequestParam(required = false) String author,
	                                @RequestParam(required = false) String company) {

	    // 검색 조건이 있는 경우 검색 결과에 대한 총 아이템 수를 가져옵니다.
	    int listCount = (title != null || author != null || company != null)
	                        ? service.getSearchTotalCount(title, author, company)
	                        : service.getTotalCount();
	    System.out.println("Data :::: " + currentPage + title + author + company);
	    int pageLimit = 5;
	    int listLimit = 8;
	    PageVo pvo = new PageVo(listCount, currentPage, pageLimit, listLimit);
	    
	    // 검색 조건이 있는 경우 검색 결과 목록을 가져옵니다.
	    List<BookVo> voList = (title != null || author != null || company != null)
	                            ? service.searchList(pvo, title, author, company)
	                            : service.list(pvo);

	    Map<String, Object> map = new HashMap<String, Object>();
	    map.put("voList", voList);
	    map.put("pvo", pvo);
	    return map;
	}


	// 카테고리별 도서 목록 가져오기
	@GetMapping("listByBookCate/{bookCateNo}")
	public Map<String, Object> getBookListByBookCate(@PathVariable String bookCateNo) {
		
		List<BookVo> voList = service.getBookListByBookCate(bookCateNo);
	    int listCount = voList.size();
	    System.out.println("listCount ::: " + listCount);
	    int currentPage = 1;
	    int pageLimit = 5;
	    int listLimit = 8;
	    PageVo pvo = new PageVo(listCount, currentPage, pageLimit, listLimit);
	    
	    Map<String, Object> map = new HashMap<String, Object>();
	    map.put("voList", voList);
	    map.put("pvo", pvo);
	    
		return map;
	}
//        System.out.println("searchBookDto@@@@@@" + searchBookDto);
//        System.out.println("searchBookDto ::: " + searchBookDto);
//        List<BookVo> bookVoList = null;
//        model.addAttribute("bookVoList", bookVoList);
	
    
    
	// 검색(게시글 목록 조회)
    @PostMapping("detaillist")
    public List<BookVo> detail(@RequestBody SearchBookDto searchBookDto) {
        List<BookVo> bookVoList = service.detail(searchBookDto);
        return bookVoList;
    }

}
