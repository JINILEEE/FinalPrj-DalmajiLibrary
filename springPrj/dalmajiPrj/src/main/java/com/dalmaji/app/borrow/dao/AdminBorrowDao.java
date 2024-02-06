package com.dalmaji.app.borrow.dao;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.dalmaji.app.borrow.vo.AdminBorrowVo;
import com.dalmaji.app.borrow.vo.OptionVo;
import com.dalmaji.app.page.vo.PageVo;

@Repository
public class AdminBorrowDao {

	// 대출 리스트 화면
	public List<AdminBorrowVo> list(SqlSessionTemplate sst, PageVo pvo) {
		
		int offset = (pvo.getCurrentPage()-1) * pvo.getListLimit();   // 몇 개 건너뛸지... 
		int limit = 8;   // 최대 몇개 보일지...
		RowBounds rb = new RowBounds(offset, limit);       // 0개를 건너뛰고, 그 다음부터 10개를 조회할 예정...
		
		return sst.selectList("AdminBorrowListMapper.list", null , rb);
	}
	
	//총 게시글 수 가져오는 메소드
	public int getTotalCount(SqlSessionTemplate sst) {
		// 우리가 필요한것은 숫자라 string타입을 숫자타입으로 변경해서 리턴해야한다!!
		return Integer.parseInt(sst.selectOne("AdminBorrowListMapper.count"));
	}

	// 대출 제한 상태 변경
	public int edit(AdminBorrowVo vo, SqlSessionTemplate sst) {
		return sst.update("AdminBorrowListMapper.edit", vo);
	}

	// 대출 제한 3가지 옵션 가져오기
	public List<OptionVo> option(SqlSessionTemplate sst) {
		return sst.selectList("AdminBorrowListMapper.option");
	}
	
}
