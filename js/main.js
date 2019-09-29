 
 // listen for the From 
 document.getElementById('myForm').addEventListener('submit' , saveBookmark);
  
 //Save Bookmark 
 function saveBookmark(e){
  //Get form Values 
  var siteName = document.getElementById('siteName').value;
  var siteUrl  = document.getElementById('siteUrl').value;
  
  var Bookmark = {
    name:siteName,
    url :siteUrl
  }

  //test if bookmarks is null 
    if(localStorage.getItem('bookmarks')===null){
     //init array
      var bookmarks =[];
     //add to  array
      bookmarks.push(Bookmark);
     //set to localStorage
      localStorage.setItem('bookmarks' , JSON.stringify(bookmarks));
 
    }else{
      //get bookmarks from localStorage
       var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
      //add to  array
       bookmarks.push(Bookmark);
      //re-set to localStorage
      localStorage.setItem('bookmarks' , JSON.stringify(bookmarks));
    }
 
   // prevent form from submitting
   e.preventDefault();
  }
  //feteching bookmarks
  function fetchBookmarks(){
    //get bookmarks from localStorage  
     var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //get outputs
    var bookmarksResult = document.getElementById('bookmarksResults');

    //build output
     bookmarksResult.innerHTML= '';
     for(var i = 0  ; i < bookmarks.length; i++){
          var name = bookmarks[i].name;
          var url = bookmarks[i].url;

          bookmarksResult.innerHTML +=  '<div  class="well">'+
                                        '<h3>'+name+
                                        '</h3>'+
                                        '</div>';
     }

  }