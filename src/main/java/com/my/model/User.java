package com.my.model;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

public class User {
	private String user_id = "";
	private String account="";
	private String password="";
	private String user_name ="";
	private String org ="";
	private String dec ="";
	private Extra extra = new Extra();
	
	public User(String strID, String strAccount, String strPassword, String strUserName,
			String strOrg, String strDec, String json)
	{
		this.user_id = strID;
		this.account = strAccount;
		this.password =strPassword;
		this.user_name =strUserName;
		this.org = strOrg;
		this.dec = strDec;
		setExtraByJsonString(json);
	}
	
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getOrg() {
		return org;
	}
	public void setOrg(String org) {
		this.org = org;
	}
	public String getDec() {
		return dec;
	}
	public void setDec(String dec) {
		this.dec = dec;
	}
	public String getShowingNumber() {
        return String.valueOf(extra.getNumber());
    }
    public void setShowingNumber(String number) {
        extra.setNumber(Integer.parseInt(number));
    }
    private void setExtraByJsonString(String json) {
        if(json != null && !json.equals("")){
            try{
                extra = new Gson().fromJson(json, Extra.class);
            } catch(JsonSyntaxException e){}
        }
    }	
    public String getExtraInJsonString() {
        return new Gson().toJson(extra);
    }

    public class Extra{
        private int number = 10;
        
        public void setNumber(int number){
            this.number = number;
        }
        public int getNumber(){
            return number;
        }
    }
}
