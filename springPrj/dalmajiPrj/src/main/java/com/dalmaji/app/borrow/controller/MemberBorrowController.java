package com.dalmaji.app.borrow.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dalmaji.app.bookDetail.vo.BookDetailVo;
import com.dalmaji.app.borrow.service.AdminBorrowService;
import com.dalmaji.app.borrow.service.MemberBorrowService;
import com.dalmaji.app.borrow.vo.BorrowVo;
import com.dalmaji.app.member.vo.MemberVo;
import com.dalmaji.app.page.vo.PageVo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("mypage/borrow")
@CrossOrigin("*")
@RequiredArgsConstructor
@Slf4j
public class MemberBorrowController {

	private final MemberBorrowService service;
	
	/**
	 * 유저 대출화면
	 * 
	 * @param memberNo
	 * @return map
	 */
	@GetMapping("list")
	public Map<String, Object> list (@RequestParam String memberNo){
		
		List<BorrowVo> voList = service.list(memberNo);
		
		for(BorrowVo vo: voList) {
			log.info("vo:: {}", vo);
		}
		
		Map<String, Object> map = new HashMap<String, Object> ();
		map.put("voList", voList);
		
		log.info("memberNo:: {}, voList:: {}", memberNo, voList);
		
		return map;
	}
	
	/**
	 * 유저 반납처리
	 * 
	 * @param bvo
	 * @return resultMap
	 * @throws IllegalAccessException
	 */
	@PostMapping("returnBook")
	public Map<String, Object> returnBook (@RequestBody BorrowVo bvo) throws IllegalAccessException{
		
		String bookNo = bvo.getBookNo();
		log.info("bookNo::: {}, bvo::: {}", bookNo, bvo);
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
			resultMap = service.returnBook(bookNo);
		}catch(IllegalArgumentException e) {
			resultMap.put("msg", e.getMessage());
			e.printStackTrace();
		}
		return resultMap;
	}
	
	//회원 목록 조회
	@GetMapping("memberList")
	public Map<String, Object> memberList(@RequestParam String memberNo)throws Exception {
		
		MemberVo mlVo = service.memberList(memberNo);
		
		if(mlVo == null) {
			throw new Exception("못찾음...");
		}
		
		// 결과를 MAP에 담아 반환
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("mlVo", mlVo);
		
		System.out.println("mlVo 호출 ::: " + mlVo);
		System.out.println("memberNo 호출 ::: " + memberNo);
		
		return map;
	}
	
}//class
