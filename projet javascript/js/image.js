// $( "#lancer" ).submit(function( event ) {
//   alert( "Handler for .submit() called." );
//   event.preventDefault();
//   var the_data = 'tags='+document.getElementById("searchBox").value+'&tagmode=any&format=json';
//   alert(the_data);

$(document).ready(function(){
  $("#bouton1").click(function() {
    var bla = $('#searchBox').val();
    $.ajax({
    url:'http://api.flickr.com/services/feeds/photos_public.gne',
    type:'GET',
    dataType:'jsonp',
    jsonp: 'jsoncallback', // a renseigner d'après la doc du service, par défaut callback
    data:'tags='+bla+'&tagmode=any&format=json',
    success:function(data){
    $.each(data.items, function(i,item){
                $("<img>").attr("src", item.media.m).appendTo("#images");
                if ( i == 3 ) return false ; });
              },
    error: function(resultat,statut,erreur){
    alert("erreur");},
     });
  });
});
