/*
Tools Library:
===========
This file contains various tools used very often in javascript
@version: 1.0
@author: Waseem Khan
@blog:   http://blog.pakcoders.com
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////
// function to get the code of the key pressed on the keyboard
function getKeyCode(e, action) 
{
   e = (!e) ? window.event : e;
   code = (e.charCode) ? e.charCode : ((e.keyCode) ? e.keyCode : ((e.which) ? e.which : 0));
   if (e.type == action) 
   {
	   return code;
   } 
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// get element by ID
function getElemId(id)
{
	if (document && document.getElementById(id))
	{
	   return document.getElementById(id);
	}
	else
	{
	   return false;	
	}
}


// function to open a popUpWindow
var popUpWin = false;

function popUpWindow(URLStr, left, top, width, height)

{

  if(popUpWin)

  {

    if(!popUpWin.closed) popUpWin.close();

  }

  popUpWin = open(URLStr, 'popUpWin', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=yes,width='+width+',height='+height+',left='+left+', top='+top+',screenX='+left+',screenY='+top+'');

}


// Function to determine browser of the user
function Browser() {

  var ua, s, i;

  this.isIE    = false;
  this.isNS    = false;
  this.version = null;

  ua = navigator.userAgent;

  s = "MSIE";
  if ((i = ua.indexOf(s)) >= 0) {
    this.isIE = true;
    return;
  }

  s = "Netscape6/";
  if ((i = ua.indexOf(s)) >= 0) {
    this.isNS = true;
    return;
  }

  s = "Gecko";
  if ((i = ua.indexOf(s)) >= 0) {
    this.isNS = true;
    return;
  }
}


// function that will remove all spaces from a string used primarily to check
function trim(s)
{
   return s.replace(/(^\s+)|(\s+$)/g, "");
}


// function to check if a url is valid
function isValidURL(url){
    var RegExp = /^(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,4}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?$/;
    if(RegExp.test(url)){
        return true;
    }else{
        return false;
    }
}


// function to check if the email address is valid
function isValidEmail(email){
    var RegExp = /^((([a-z]|[0-9]|!|#|$|%|&|'|\*|\+|\-|\/|=|\?|\^|_|`|\{|\||\}|~)+(\.([a-z]|[0-9]|!|#|$|%|&|'|\*|\+|\-|\/|=|\?|\^|_|`|\{|\||\}|~)+)*)@((((([a-z]|[0-9])([a-z]|[0-9]|\-){0,61}([a-z]|[0-9])\.))*([a-z]|[0-9])([a-z]|[0-9]|\-){0,61}([a-z]|[0-9])\.)[\w]{2,4}|(((([0-9]){1,3}\.){3}([0-9]){1,3}))|(\[((([0-9]){1,3}\.){3}([0-9]){1,3})\])))$/
    if(RegExp.test(email)){
        return true;
    }else{
        return false;
    }
} 
 
