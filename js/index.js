var searchIndex = [];

$.ajax({
    type: 'GET',
    url: 'http://infoweb-ens/~jacquin-c/codePostal/commune.php',
    data: {
        commune: null
    },
    jsonp: 'jsoncallback',
    dataType: 'json',
    success: function(data) {
        $.each(data, function(index, element) {
            searchIndex.push(element.Ville);
        });
    }
});

var input = document.getElementById("searchBox"),
    ul = document.getElementById("searchResults"),
    inputTerms, termsArray, prefix, terms, results, sortedResults;


var search = function() {
    inputTerms = input.value.toLowerCase();
    results = [];
    termsArray = inputTerms.split(' ');
    prefix = termsArray.length === 1 ? '' : termsArray.slice(0, -1).join(' ') + ' ';
    terms = termsArray[termsArray.length - 1].toLowerCase();

    for (var i = 0; i < searchIndex.length; i++) {
        var a = searchIndex[i].toLowerCase(),
            t = a.indexOf(terms);

        if (t > -1) {
            results.push(a);
        }
    }

    evaluateResults();
};

var evaluateResults = function() {
    if (results.length > 2 && inputTerms.length > 2 && terms.length !== 0) {
        sortedResults = results.sort(sortResults);
        appendResults();
    } else if (inputTerms.length > 0 && terms.length !== 0) {
        ul.innerHTML = '<li>Whoah! <strong>' +
            inputTerms +
            '</strong> is not in the index. <br><small><a href="http://google.com/search?q=' +
            encodeURIComponent(inputTerms) + '">Try Google?</a></small></li>';

    } else if (inputTerms.length !== 0 && terms.length === 0) {
        return;
    } else {
        clearResults();
    }
};

var sortResults = function(a, b) {
    if (a.indexOf(terms) < b.indexOf(terms)) return -1;
    if (a.indexOf(terms) > b.indexOf(terms)) return 1;
    return 0;
}

var appendResults = function() {
    clearResults();

    for (var i = 0; i < sortedResults.length && i < 5; i++) {
        var li = document.createElement("li"),
            result = prefix +
            sortedResults[i].toLowerCase().replace(terms, '<strong>' +
                terms +
                '</strong>');

        li.innerHTML = result;
        ul.appendChild(li);
    }

    if (ul.className !== "term-list") {
        ul.className = "term-list";
    }
};

function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}

var ul = document.getElementById('searchResults');
ul.onclick = function(event) {
    var target = getEventTarget(event);
    var texte = target.innerHTML;
    var res = texte.replace("<strong>", "");
    var resf = res.replace("</strong>", "");
    document.getElementById('searchBox').value = resf;
    clearResults();

};

var clearResults = function() {
    ul.className = "term-list hidden";
    ul.innerHTML = '';
};

$( function() {
  $( "#tabs" ).tabs();
  $( "#tabs" ).hide();

} );


input.addEventListener("keyup", search, false);
