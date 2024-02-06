package com.dalmaji.app.member.vo;

import lombok.Data;

@Data
public class MemberVo {

	private String memberNo;
	private String oNo;
	private String id;
	private String pwd;
	private String name;
	private String phone;
	private String borrowPwd;
	private String overdueCount;
	private String joinDate;
	private String delYn;
	private String bookNo;
}
