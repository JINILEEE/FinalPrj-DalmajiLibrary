package com.dalmaji.app.notice.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.dalmaji.app.notice.dao.NoticeDao;
import com.dalmaji.app.notice.vo.NoticeVo;
import com.dalmaji.app.page.vo.PageVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NoticeService {
	
	private final NoticeDao dao;
	private final SqlSessionTemplate sst;


	//공지사항 목록조회
	public List<NoticeVo> list(PageVo pvo) {
		return dao.list(sst, pvo);
	}

	//총 게시글 수 가져오는 메소드
	public int getTotalCount() {
		return dao.getTotalCount(sst);
	}
	
	//공지사항 상세조회
	public NoticeVo detail(NoticeVo vo) {
		return dao.detail(sst, vo);
	}

	//조회수 증가
//	public void Hit(NoticeVo vo) {
//	    dao.Hit(sst, vo);
//	}

	// 조회수 증가 메서드
	public void hit(NoticeVo vo) {
	    dao.hit(sst, vo);
	}

}