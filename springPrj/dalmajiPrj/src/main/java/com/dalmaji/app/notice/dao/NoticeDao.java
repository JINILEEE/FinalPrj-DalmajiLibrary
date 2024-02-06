package com.dalmaji.app.notice.dao;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.dalmaji.app.notice.vo.NoticeVo;
import com.dalmaji.app.page.vo.PageVo;

@Repository
public class NoticeDao {


	//공지사항 목록조회
	public List<NoticeVo> list(SqlSessionTemplate sst, PageVo pvo) {
//		List<NoticeVo> noticeVo = sst.selectList("NoticeMapper.list");
//		return sst.selectList("NoticeMapper.list");
		System.out.println("dao 호출");
		
		int offset = (pvo.getCurrentPage()-1) * pvo.getListLimit();   // 몇 개 건너뛸지... 
		int limit = 8;   // 최대 몇개 보일지...
		RowBounds rb = new RowBounds(offset, limit);       // 0개를 건너뛰고, 그 다음부터 10개를 조회할 예정...
		
		System.out.println("limit 출력 ::: " +rb);
		
		return sst.selectList("NoticeMapper.list", null , rb);
	}

	//공지사항 상세조회
	public NoticeVo detail(SqlSessionTemplate sst, NoticeVo vo) {
		return sst.selectOne("NoticeMapper.detail", vo);
	}
	

	//총 게시글 수 가져오는 메소드
//	public int getTotalCount(SqlSessionTemplate sst) {
//		
//		// 우리가 필요한것은 숫자라 string타입을 숫자타입으로 변경해서 리턴해야한다!
//		System.out.println("1111111111");
//		int result = sst.selectOne("NoticeMapper.count");
//		System.out.println("result : " + result);
//		return result;
//	}
	
	//총 게시글 수 가져오는 메소드
		public int getTotalCount(SqlSessionTemplate sst) {
			// 우리가 필요한것은 숫자라 string타입을 숫자타입으로 변경해서 리턴해야한다!!
			return Integer.parseInt(sst.selectOne("NoticeMapper.count"));
		}

		//조회수 증가
		public void hit(SqlSessionTemplate sst, NoticeVo vo) {
			sst.update("NoticeMapper.hit", vo);
		}
		

}