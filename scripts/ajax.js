/*
Ajax Library:
===========
This library contains all the code you need to initiate the xmlHTTPObject
and the general procedure of sending ajax request to the server and
receiving it.
@version: 1.0
@author:  Waseem Khan
@blog:    http://blog.pakcoders.com
*/

function getAjaxObject()
{
  // initially set the object to false 
  var XMLHttpRequestObject = false;
  if (window.XMLHttpRequest)
  {
      // check for Safari, Mozilla, Opera...
	  XMLHttpRequestObject = new XMLHttpRequest();
  }
  else if (window.ActiveXObject) 
  {
      // check for Internet Explorer
	  XMLHttpRequestObject = new ActiveXObject("Microsoft.XMLHTTP");
  }
  if (!XMLHttpRequestObject)
  {
	  alert("Your browser does not support Ajax.");
	  // return false in case of failure
	  return false;
  }
  // return the object in case of success
  return XMLHttpRequestObject;
}


function sendRequest(xmlHTTPObject, url, parameters, handleResponse, id)
{
   if(xmlHTTPObject)
   {
      // continue if the object is idle
      if (xmlHTTPObject.readyState == 4 || xmlHTTPObject.readyState == 0) 
      {
		 // open connection and send "GET" request to server
		 xmlHTTPObject.open("POST", url, true);
		 // send the appropriate headers
		 xmlHTTPObject.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		 // set the function to be called on a change in ajaxObj state
		 xmlHTTPObject.onreadystatechange = function () {handleResponse(id)};
		 // set additional parameters (to be sent to server) to null
         xmlHTTPObject.send(parameters);
      }
   }
}