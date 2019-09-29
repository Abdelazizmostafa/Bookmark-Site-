 
 // listen for the From 
 document.getElementById('myForm').addEventListener('submit' , saveBookmark);
  
 //Save Bookmark 
 function saveBookmark(e){
  //Get form Values 
  var siteName = document.getElementById('siteName').value;
  var siteUrl  = document.getElementById('siteUrl').value;
  
  if(!validateForm(siteName, siteUrl)){
    return false;
  }
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

    //Clear  form
    document.getElementById('myFrom').reset();

    //re-fetch bookmarks
    fetchBookmarks();
   // prevent form from submitting
   e.preventDefault();
  }

  

  //delete Bookmark Function 
    function deleteBookmark(url){
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop through the bookmarks
    for(var i =0;i < bookmarks.length;i++){
        if(bookmarks[i].url == url){
        // Remove from array
        bookmarks.splice(i, 1);
        }
    }
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Re-fetch bookmarks
    fetchBookmarks();
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
                                        '<h3>'+name+'  '+
                         '<a class="btn btn-default"  target="_blank" href="'+url+'">Visit</a>'+' '+
                         '<a  onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'+
                                        '</h3>'+
                                        '</div>';
     }

  }
// Validate Form
function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
      alert('Please fill in the form');
      return false;
    }
  
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
  
    if(!siteUrl.match(regex)){
      alert('Please use a valid URL');
      return false;
    }
  
    return true;
  }
  
  function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
  }