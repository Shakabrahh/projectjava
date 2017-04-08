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
    url:'http://api.flickr.com/services/feeds/photos_public.gne',
    type:'GET',
    dataType:'jsonp',
    jsonp: 'jsoncallback', // a renseigner d'après la doc du service, par défaut callback
    data:'tags='+bla+'&tagmode=any&format=json',
    success:function(data){
    $.each(data.items, function(i,item){
      // vue table
      t.row.add( [
        $("<img>").attr("src", item.media.m),
        "le nom",
        "l'heure de prise de vue",
        "l'identifiant du phtographe"
    ] ).draw();


      // vue photo
      $("<img>").attr("src", item.media.m).appendTo("#tabs-1");

      // nombre de photo
      if ( i == 50 ) { return false ;}

      });
              },
    error: function(resultat,statut,erreur){
    alert("erreur");},
     });
  });
});
