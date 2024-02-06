package com.dalmaji.app.admin.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.dalmaji.app.admin.dao.AdminDao;
import com.dalmaji.app.admin.vo.AdminVo;
import com.dalmaji.app.member.vo.MemberVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {
	
	private final AdminDao dao;
	private final SqlSessionTemplate sst;

	
	//로그인
	public AdminVo login(AdminVo vo) {
		return dao.login(sst, vo);
	}

}
