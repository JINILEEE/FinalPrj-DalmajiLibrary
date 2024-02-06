package com.dalmaji.app.admin.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dalmaji.app.admin.service.AdminService;
import com.dalmaji.app.admin.vo.AdminVo;
import com.dalmaji.app.member.vo.MemberVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("admin")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AdminController {
	
	private final AdminService service;
	
	
	//로그인
	@PostMapping("login")
	public Map<String, Object> login(@RequestBody AdminVo vo, HttpSession session) throws Exception {
		System.out.println(vo);
		AdminVo loginAdmin = service.login(vo);
		
		session.setAttribute("loginAdmin", loginAdmin);
		session.setAttribute("alerMsg", "로그인 성공!");
		Map<String , Object> map = new HashMap<>();
		map.put("msg", "good");
		map.put("loginAdminVo", loginAdmin);
		if(loginAdmin == null) {
			map.put("msg", "bad");
		}
		return map;
			
	}
	
	//로그아웃
	@GetMapping("logout")
	public String logout(HttpSession session) {
		session.invalidate();
		return "redirect:/home";
	}

}
