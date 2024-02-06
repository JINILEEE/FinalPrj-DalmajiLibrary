package com.dalmaji.app.borrow.dao;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.dalmaji.app.borrow.vo.BorrowVo;
import com.dalmaji.app.member.vo.MemberVo;
import com.dalmaji.app.page.vo.PageVo;

@Repository
public class MemberBorrowDao {

	// 대출 리스트 화면
	public List<BorrowVo> list(SqlSession sst, String memberNo) {
		return sst.selectList("MemberBorrowListMapper.list", memberNo);
	}

	// 책 상태 반납완료로 업데이트
	public int updateBookState(SqlSession sst, String bookNo) {
		return sst.update("MemberBorrowListMapper.updateBookState", bookNo);
	}

	// 반납일자 sysdate으로 업데이트
	public int updateDueDate(SqlSession sst, String bookNo) {
		return sst.update("MemberBorrowListMapper.updateDueDate", bookNo);
	}

	//회원목록
	public MemberVo memberList(SqlSession sst, String memberNo) {
		return sst.selectOne("MemberMapper.list", memberNo);
	}
	

}
