package com.dalmaji.app.notice.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.dalmaji.app.notice.vo.AdminNoticeVo;
import com.dalmaji.app.page.vo.PageVo;

@Repository
public class AdminNoticeDao {
	
	//공지사항 작성
	public int insert(SqlSessionTemplate sst, AdminNoticeVo vo) {
		return sst.insert("AdminNoticeMapper.insert", vo);
	}

//	//공지사항 목록조회
//	public List<AdminNoticeVo> list(SqlSessionTemplate sst, PageVo pvo) {
////		List<NoticeVo> noticeVo = sst.selectList("NoticeMapper.list");
////		return sst.selectList("NoticeMapper.list");
//		System.out.println("dao 호출");
//		
//		int offset = (pvo.getCurrentPage()-1) * pvo.getListLimit();   // 몇 개 건너뛸지... 
//		int limit = 8;   // 최대 몇개 보일지...
//		RowBounds rb = new RowBounds(offset, limit);       // 0개를 건너뛰고, 그 다음부터 10개를 조회할 예정...
//		
//		System.out.println("limit 출력 ::: " +rb);
//		
//		return sst.selectList("AdminNoticeListMapper.list", null , rb);
//	}
	
	//공지사항 목록조회 + 검색
	public List<AdminNoticeVo> listWithSearch(SqlSessionTemplate sst, PageVo pvo, String keyword) {
	    int offset = (pvo.getCurrentPage() - 1) * pvo.getListLimit();
	    int limit = 8;
	    RowBounds rb = new RowBounds(offset, limit);

	    // 검색 조건을 맵에 담아서 전달
	    Map<String, Object> paramMap = new HashMap<>();
	    paramMap.put("keyword", keyword);

	    // 검색어를 포함한 공지사항 목록 조회
	    return sst.selectList("AdminNoticeListMapper.listWithSearch", paramMap, rb);
	}


	//공지사항 상세조회
	public AdminNoticeVo detail(SqlSessionTemplate sst, AdminNoticeVo vo) {
		return sst.selectOne("AdminNoticeMapper.detail", vo);
	}

	//공지사항 삭제
	public int delete(SqlSessionTemplate sst, AdminNoticeVo vo) {
		return sst.update("AdminNoticeMapper.delete", vo);
	}

	//공지사항 수정
	public int edit(SqlSessionTemplate sst, AdminNoticeVo vo) {
		return sst.update("AdminNoticeMapper.edit", vo);
	}

	//총 게시글 수 가져오는 메소드
	public int getTotalCount(SqlSessionTemplate sst) {
		// 우리가 필요한것은 숫자라 string타입을 숫자타입으로 변경해서 리턴해야한다!!
		return Integer.parseInt(sst.selectOne("AdminNoticeMapper.count"));
	}



}