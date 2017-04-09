// $( "#lancer" ).submit(function( event ) {
//   alert( "Handler for .submit() called." );
//   event.preventDefault();
//   var the_data = 'tags='+document.getElementById("searchBox").value+'&tagmode=any&format=json';
//   alert(the_data);
$(document).ready(function() {
  $("#bouton1").click(function() {
    $("#dialog").dialog({
      autoOpen: false,
      title: "Informations de l'image",
      width: 660
    });
    ul.className = "term-list hidden";
    ul.innerHTML = '';
    $("#tabs").show();
    $('#tabs-1').html("");
    $('#tabs-2 table tbody').html("");
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
      success: function(response) {
        $.each(response.photos.photo, function(index, value) {
          console.log(value);
          var url = 'https://farm' + value.farm + '.staticflickr.com/' + value.server + '/' + value.id + '_' + value.secret + '.jpg';
          var a = $('<a>').attr({
            href: url,
            title: value.title,
            id: value.id,
            class: "cliquable"
          });
          var img = $('<img>').attr({
            src: url
          });
          var id_img = value.id;
          a.append(img);
          $("#tabs-1").append(a);
          getInfoImage(id_img, url);
        });
        $('#tabs-1').justifiedGallery({
          rowHeight: 300,
          lastRow: 'nojustify',
          margins: 1
        });

      },
      error: function(resultat, statut, erreur) {
        alert("erreur");
      },
    });
  });
});



function getInfoImage(id_img, url) {
  $.ajax({
    url: 'https://api.flickr.com/services/rest/?method=flickr.photos.getInfo',
    type: 'GET',
    dataType: 'jsonp',
    jsonp: 'jsoncallback',
    data: 'api_key=671aab1520e2cb69e08dd36a5f40213b&tagmode=any&format=json&photo_id=' + id_img,
    success: function(data) {
      var t = $("table").DataTable();

      // récupération et comparaison des dates
      var startDate = $('#dt').val();
      var actualDate1 = (data.photo.dates.taken).split(" ")[0];
      var actualDate = String(actualDate1).replace('-', '/');

      if ((startDate == "") || (new Date(startDate).getTime() < new Date(actualDate).getTime())) {
        // Vue tableau --> #tabs-2
        t.row.add(
          ["<img src=" + url + ">", data.photo.title._content, data.photo.dates.taken, data.photo.owner.nsid]
        ).draw();

        if (data.photo.title._content == "") {
          $("#detailTitre").text("[Photo sans titre...]");
        } else {
          $("#detailTitre").text(data.photo.title._content);
        }
        $("#detailAuteur").text(data.photo.owner.username);
        $("#detailDate").text(actualDate);

      }

    },
    error: function(resultat, statut, erreur) {
      alert("erreur");
    },

  });

}

// permet de demander une date à l'utilisateur
function mydate() {
  //alert("");
  document.getElementById("dt").hidden = false;
  document.getElementById("ndt").hidden = true;
}

function mydate1() {
  d = new Date(document.getElementById("dt").value);
  dt = d.getDate();
  mn = d.getMonth();
  mn++;
  yy = d.getFullYear();
  document.getElementById("ndt").value = dt + "/" + mn + "/" + yy
  document.getElementById("ndt").hidden = false;
  document.getElementById("dt").hidden = true;
}



$("body").on("click", ".cliquable", function() {

  $("#dialog").empty()

  var isOpen = $("#dialog").dialog("isOpen")
  if (isOpen) {
    $("#dialog").dialog({
      position: {
        my: "center",
        at: "center",
        of: window
      }
    });
  }

  var link = $(this).attr('href')
  var id = $(this).attr('id')
  getInfoImage(id, link);

  $("#dialog").append('<p><b>Titre :</b> <span id="detailTitre"></span></p>')
  $("#dialog").append('<p><b>Auteur :</b> <span id="detailAuteur"></span></p>')
  $("#dialog").append('<p><b>Date :</b> <span id="detailDate"></span></p><br><br>')
  $("#dialog").append('<img src="' + link + '">')

  $("#dialog").dialog("open")
  return false;
});
