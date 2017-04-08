// $( "#lancer" ).submit(function( event ) {
//   alert( "Handler for .submit() called." );
//   event.preventDefault();
//   var the_data = 'tags='+document.getElementById("searchBox").value+'&tagmode=any&format=json';
//   alert(the_data);

$(document).ready(function(){
  $("#bouton1").click(function() {
    var t = $("table").DataTable();
    ul.className = "term-list hidden";
    ul.innerHTML = '';
    $( "#tabs" ).show();
    $('#tabs-1').html("");
    var bla = $('#searchBox').val();
    $.ajax({
    url: "https://api.flickr.com/services/rest/",
    data: {
        method: "flickr.photos.search",
        api_key: "671aab1520e2cb69e08dd36a5f40213b",
        tags: bla,
        format: "json",
        nojsoncallback: 1
    },
    success:function(response){
      $.each(response.photos.photo, function (index, value) {
                console.log(value);
              var url = 'https://farm' + value.farm + '.staticflickr.com/' + value.server + '/' + value.id + '_' + value.secret + '.jpg';
              var a = $('<a>').attr({href: url});
              var img = $('<img>').attr({src: url});
              a.append(img);
              $("#tabs-1").append(a);
            });
             $('#tabs-1').justifiedGallery({
               rowHeight : 300,
               lastRow : 'nojustify',
               margins : 1
             });
              },
    error: function(resultat,statut,erreur){
    alert("erreur");},
     });
  });
});
