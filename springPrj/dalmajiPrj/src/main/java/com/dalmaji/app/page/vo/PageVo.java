package com.dalmaji.app.page.vo;

import lombok.Data;

@Data
public class PageVo {
	private int listCount;		// 총 게시글 갯수
	private int currentPage;	// 현재페이지
	private int pageLimit;		// 페이징 영역 페이지갯수
	private int	listLimit;		// 한 페이지에 보여줄 게시글 갯수
	
	private int maxPage;		// 가장 마지막 페이지
	private int startPage;		// 페이징 영역 시작값
	private int endPage;		// 페이징 영역 마지막값
	private int startRow;     // 검색할 첫 번째 행 번호 (ROWNUM)
    private int lastRow;      // 검색할 마지막 행 번호 (ROWNUM)

	
	//생성자
	public PageVo(int listCount , int currentPage , int pageLimit, int listLimit) {
		this.listCount = listCount;
		this.currentPage = currentPage;
		this.pageLimit = pageLimit;
		this.listLimit = listLimit;
		
		this.maxPage = (int) Math.ceil((double)listCount/listLimit);
		this.startPage = (currentPage - 1) / pageLimit * pageLimit + 1;
		this.endPage = startPage + pageLimit - 1;
		
		if(endPage > maxPage) {
			endPage = maxPage;
		}
		
		this.startRow = (currentPage - 1) * listLimit + 1;
		this.lastRow = startRow + listLimit - 1;
	}

}
