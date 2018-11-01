var vCookie = new function(){
	this.setCookie = function(c_name, value, expiredays){
		var exdate = new Date();
		exdate.setDate(exdate.getDate()+expiredays);
		document.cookie=c_name+"="+escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
	}
	this.getCookie = function(name){
		var arr, reg= new RegExp("(^|)"+name+"=([^;]*)(;|$)");

		if(arr=document.cookie.match(reg)){
			return unescape(arr[2]);
		}
		else{
			return null;
		}


	}
	this.delCookie = function(name){
		var exp = new Date();
		exp.setTime(exp.getTime()-1);
		var cval=this.getCookie(name);
		if(cval!=null)
			document.cookie=name+"="+cval+";expires="+exp.toGMTString();
	}
}

export default vCookie
