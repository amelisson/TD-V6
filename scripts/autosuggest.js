/*
Ajax AutoSuggest
===========
This file contains the functions which will do the autosuggest on client end
@version: 1.0
@author:  Waseem Khan
@blog:    http://blog.pakcoders.com
*/

var ajaxObj = getAjaxObject();

var targetID = new Array() ;
var searchID = new Array() ;
var inputID = new Array() ;

function autoSuggest(id, targetid, searchid, inputid, e)
{

   var keyCode = getKeyCode(e, 'keyup');
   if (keyCode == 40 || keyCode == 38)
   {
	   return false;
   }

   autoSugPointer[id] = 0;

   targetID[id] = targetid;
   searchID[id] = searchid;
   inputID[id] = inputid;
   countSuggestions[id] = 0;

   var searchInput = getElemId(id).value;

   var url = "autosuggest.php";
   var params = "R_RECH=" + searchInput;

   if (trim(searchInput) !== "")
   {
	  sendRequest(ajaxObj, url, params, handleSuggestResponse, id);
   }
   else
   {
	  hideSuggestions();
   }
}

var suggestions = new Array();
var Valea 		= new Array();


function handleSuggestResponse(id)
{
   if (ajaxObj.readyState == 4)
   {
      if (ajaxObj.status == 200)
      {
      	 // delete_li ();
		  try
		  {
			  var XMLResponse = ajaxObj.responseXML.documentElement;
			  // work with the xml response
			  var keywordsTag = XMLResponse.getElementsByTagName('keywords');
			  var valuaTag = XMLResponse.getElementsByTagName('valua');


			  for (var i = 0; i < keywordsTag.length; i++)
			  {
				 var keywords = keywordsTag.item(i).firstChild.data.toString();
				 suggestions.push(keywords);

				 var vall = valuaTag.item(i).firstChild.data.toString();
				 Valea.push( vall );
			  }
			  showSuggestions(suggestions, id);
		  }
		  catch(e)
		  {
			  hideSuggestions(id);
			  if (trim(ajaxObj.responseText) !== "")
			  	alert( e.toString() + "\n" + ajaxObj.responseText);
		  }
	  }
   }
}


var countSuggestions = new Array();

function showSuggestions(suggestions, id)
{
   var listWrapID = getElemId(targetID[id]);
   listWrapID.style.visibility = "visible";

   var listID = getElemId(searchID[id]);
   listID.innerHTML = "";

   for(var i = 0; i < suggestions.length; i++)
   {
    // listID.innerHTML += "\n<li><a id='" + id + "-" + (i+1) +"' href=\"javascript:void(0);\" onclick=\"insertKeyword(this.innerHTML, '"+id+"');\">" + suggestions[i] + "</a></li>";
       listID.innerHTML += "\n<li id='L" + id + "-" + (i+1) + "'><a id='" + id + "-" + (i+1) +"' href=\"javascript:void(0);\" onclick=\"insertKeyword('" + Valea[i] + "', '" + id+ "');\">" + suggestions[i] + "</a></li>";
   }

   countSuggestions[id] = i;

}

var autoSugPointer = new Array();

function keyBoardNav(e, id)
{

   var keyCode = getKeyCode(e, 'keydown');

   if (keyCode == 40)
   {
      if (autoSugPointer[id] >= 0 && autoSugPointer[id] < countSuggestions[id])
	  {
		 if (autoSugPointer[id] != 0 && autoSugPointer[id] != countSuggestions[id])
		 {
		    revertAutoSuggestKeyNav(autoSugPointer[id], id);
		 }
		 autoSugPointer[id] ++;
		 changeAutoSuggestKeyNav(autoSugPointer[id], id);
		 if (autoSugPointer[id] > 6)
		 {
			getElemId(searchID[id]).scrollTop = 30;
		 }
	  }
   }
   else if (keyCode == 38)
   {
	  if (autoSugPointer[id] > 1)
	  {
		 revertAutoSuggestKeyNav(autoSugPointer[id], id);
		 autoSugPointer[id] --;
		 changeAutoSuggestKeyNav(autoSugPointer[id], id);
		 if (autoSugPointer[id] <= 2)
		 {
			getElemId(searchID[id]).scrollTop = 0;
		 }
	  }
   }
   else if (keyCode == 13 && autoSugPointer[id])
   {
	  var str = getElemId(id + "-" + autoSugPointer[id]).innerHTML;
	  insertKeyword(str, id);
   }

}



function changeAutoSuggestKeyNav(id, ID)
{
   getElemId(ID + "-" + id).style.backgroundColor = "#555";
   getElemId(ID + "-" + id).style.color = "#FFF";
}



function revertAutoSuggestKeyNav(id, ID)
{
   getElemId(ID + "-" + id).style.backgroundColor = "#F9F9F9";
   getElemId(ID + "-" + id).style.color = "#006";
}


function hideSuggestions(id)
{
   try
   {
   var listWrapID = getElemId(targetID[id]);
   listWrapID.style.visibility = "hidden";
   }catch(e){}
}



function insertKeyword(str, id)
{
	hideSuggestions(id);
	getElemId(inputID[id]).value = str;
	getElemId(inputID[id]).focus();
}




function delete_li ()
{

	 var liNodes= document.getElementsByTagName("li" );
	 var maxi = liNodes.length
	 var conti = true

	 while ( conti ) {

	   conti = false
	   for (var i = 0; i < maxi; i++ )   {

			try {
			var tmp = liNodes[i].getAttribute("id")

	   		if ( tmp != null  && tmp.substr(0, 8) == 'LR_RECH-' ) {
	   		 	liNodes[i].parentNode.removeChild(  liNodes[i] );
	   		 	conti = true
	   		 	break;
	   		}
	   	   } catch ( e ) {}
  		}
  	 }
	}