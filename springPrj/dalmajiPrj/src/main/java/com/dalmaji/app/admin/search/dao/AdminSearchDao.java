package com.dalmaji.app.admin.search.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.dalmaji.app.book.vo.BookVo;

@Repository
public class AdminSearchDao {

	// 도서 작성
	public int insert(SqlSessionTemplate sst, BookVo vo) {
		return sst.insert("BookMapper.insert", vo);
	}

	// 삭제하기
	public int delete(SqlSessionTemplate sst, BookVo vo) {
		return sst.update("BookMapper.delete", vo);
	}

	// 수정하기
	public int edit(SqlSessionTemplate sst, BookVo vo) {
		return sst.update("BookMapper.edit", vo);
	}

}
