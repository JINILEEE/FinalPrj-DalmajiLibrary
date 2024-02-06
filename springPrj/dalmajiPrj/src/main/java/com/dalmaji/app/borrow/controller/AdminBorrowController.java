package com.dalmaji.app.borrow.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dalmaji.app.borrow.service.AdminBorrowService;
import com.dalmaji.app.borrow.vo.AdminBorrowVo;
import com.dalmaji.app.borrow.vo.OptionVo;
import com.dalmaji.app.page.vo.PageVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("admin/borrow")
@CrossOrigin("*")
@RequiredArgsConstructor
public class AdminBorrowController {
	
	private final AdminBorrowService service;
	
	/**
	 * 대출 리스트 화면
	 * 총 게시글 갯수(listCount)를 정해 
	 * 해당페이지 대출리스트를 가져오기.
	 * 
	 * @param currentPage
	 * @return map
	 */
	@GetMapping("list")
	public Map<String, Object> list(@RequestParam(defaultValue = "1") int currentPage) {
		
		int listCount = service.getTotalCount();
		int pageLimit = 5;
		int listLimit = 8;
		PageVo pvo = new PageVo(listCount, currentPage, pageLimit, listLimit);
		
		List<AdminBorrowVo> voList = service.list(pvo);
	
		// vo값 잘 담겨서 출력되는지 확인작업
		for( AdminBorrowVo vo : voList) {
			System.out.println(vo);
		}
		
		// 결과를 Map에 담아 반환
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("voList", voList);
		map.put("pvo", pvo);
		
		return map;
	}
	
	/**
	 * 대출 제한 상태 변경
	 * AdminBorrowVo 객체를 입력 파라미터로 받아
	 * 해당 정보를 바탕으로 대출 제한 상태를 변
	 * 
	 * @param vo
	 * @return map
	 * @throws Exception
	 */
	@PostMapping("edit")
	public Map<String, Object> edit (@RequestBody AdminBorrowVo vo) throws Exception {
		
		int result = service.edit(vo);
		
		if(result != 1) {
			throw new Exception();
		}
		
		// service.edit(vo)를 호출하여 변경 작업진행, 결과를 Map에 담아 반환
		Map<String, Object> map = new HashMap<>();
		map.put("msg", "good");
		
		return map;
	}

	/**
	 * 대출 제한 3가지 옵션 가져오기
	 * 
	 * @return map
	 */
	@GetMapping("option")
	public Map<String, Object> option() {
		
		List<OptionVo> optionList = service.option();
		Map<String, Object> map = new HashMap<>();
		map.put("optionList", optionList);
		System.out.println("optionList :::" + optionList);
		
		return map;
	}
	
	
}//class
