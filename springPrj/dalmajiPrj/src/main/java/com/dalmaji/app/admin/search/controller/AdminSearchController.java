package com.dalmaji.app.admin.search.controller;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dalmaji.app.admin.search.service.AdminSearchService;
import com.dalmaji.app.book.service.BookService;
import com.dalmaji.app.book.vo.BookVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("admin")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class AdminSearchController {
	
	private final AdminSearchService service;


	// 도서 작성
	@PostMapping("write")
	public Map<String, String> write(BookVo vo, MultipartFile f) throws Exception {

		System.out.println("vo : " + vo);
		System.out.println("f : " + f.getOriginalFilename());

		String bookImg = saveFile(f);
		vo.setBookImg(bookImg);

		int result = service.write(vo);

		Map<String, String> map = new HashMap<String, String>();
		
		// 업로드된 파일이 있는지 확인
		if (f != null && !f.isEmpty() && f.getOriginalFilename() != null && !f.getOriginalFilename().isEmpty()) {
		    System.out.println("f : " + f.getOriginalFilename());
		}
        
		map.put("msg", "good");
		if (result != 1) {
			map.put("msg", "bad");
		}

		return map;
	}

	/**
	 * 파일을 서버에 저장하고, 파일 전체 경로를 리턴함
	 * 
	 * @param 파일객체
	 * @param 파일경로
	 * @return 실제파일저장경로(파일경로+파일명)
	 * @throws Exception
	 * @throws
	 */
	private String saveFile(MultipartFile f) throws Exception {
		String path = "C:\\JAVA_LAP\\dev\\dalmaji\\springPrj\\dalmajiPrj\\src\\main\\webapp\\resources\\bookImg\\";
		String originName = f.getOriginalFilename();

		//원래는 "path + changeName(랜덤값) + 확장자" 로 해야함
		File target = new File(path + originName);

		//파일 바이트코드 읽어서 타겟에 저장
		f.transferTo(target);

		return path + originName;
	}


		
		//삭제하기
		@PostMapping("delete")
		public Map<String, String> delete(@RequestBody BookVo vo) {
			
			Map<String,String> map = new HashMap<String, String>();
			
			int result = service.delete(vo);
			
			if(result == 1) {
				map.put("msg", "good");
			}else {
				map.put("msg", "bad");
			}
			
			return map;
		}

		
		//수정하기
		@PostMapping("edit")
		public Map<String, String> edit(@RequestBody MultipartFile file, BookVo vo) throws Exception {
			
			if(file != null && !file.isEmpty()) {
				String bookImg = saveFile(file);
				vo.setBookImg(bookImg);				
			}
			
			Map<String, String> map = new HashMap<String, String>();
			System.out.println("controller수정" + vo);
			System.out.println("file ::: " + file);
			int result = service.edit(vo);
			
			if(result == 1) {
				map.put("msg", "good");
			}else {
				map.put("msg", "bad");
			}
			
			return map;
			
		}
	}