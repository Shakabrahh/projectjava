$(function() {

  var listeTagDispo = [];


$.ajax({
type: 'GET',
url: 'http://infoweb-ens/~jacquin-c/codePostal/commune.php',
data: {
             commune: null
         },
jsonp: 'jsoncallback',
dataType: 'json',
success: function (data) {
    $.each(data, function(index, element) {
        listeTagDispo.push(element.Ville);
    });
}
});


  $("#communeName").autocomplete({
    minLength: 3,
    source: listeTagDispo,
    select: function(event, ui) {
      alert(ui.Ville);
    }
  });

});
