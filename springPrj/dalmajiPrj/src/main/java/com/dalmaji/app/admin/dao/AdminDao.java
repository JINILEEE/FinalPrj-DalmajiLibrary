package com.dalmaji.app.admin.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.dalmaji.app.admin.vo.AdminVo;

@Repository
public class AdminDao {

	
	//로그인
	public AdminVo login(SqlSessionTemplate sst, AdminVo vo) {
		return sst.selectOne("AdminMapper.login" , vo);
	}


}
