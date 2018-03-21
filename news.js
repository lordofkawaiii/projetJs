var recherches=[];//tableau contenant des chaines de caracteres correspondant aux recherches stockees
var recherche_courante;// chaine de caracteres correspondant a la recherche courante
var recherche_courante_news=[]; // tableau d'objets de type resultats (avec titre, date et url)

function ajouter_recherche()
{


	var stringJson = '{"recherches":[';
	for (i = 0; i < recherches.length-1; i++) {
		// Parcours toute les recherches
		var stringJson = stringJson+'{"recherche":'+'"'+recherches[i]+'"},';
	}
	var stringJson = stringJson+'{"recherche":'+'"'+recherches[recherches.length-1]+'"}';
	var stringJson = stringJson+"]}";
  $.cookie("recherches", stringJson, { expires: 7 });

}


function supprimer_recherche(e)
{


}


function selectionner_recherche(e)
{

}


function init()
{
	if ($.cookie("recherches")){
		console.log($.cookie("recherches"));
	}
}


function rechercher_nouvelles()
{
	$("#resultats").empty();

/*
	$.ajax({ // renvoie des choses bizarre
       url : "search.php", //
       type : 'GET', // GET
			 data : $("#zone_saisie").val(),
       //dataType : 'json',
			 complete : maj_resultats
    });
*/

var s = $("#zone_saisie").val();
$.get('search.php?data='+s,maj_resultats);

}


function maj_resultats(res)
{
		//alert(res);
		obj = JSON.parse(res);

		for ( var index = 0; index < obj.length; index++ ) {
			$("#resultats").append('<p class="titre_result"><a class="titre_news" href="'+obj[index].url+'" target="_blank">'+obj[index].titre+'</a><span class="date_news">'+obj[index].date+'</span><span class="action_news" onclick="sauver_nouvelle(this)"><img src="horloge15.jpg"/></span></p>');
		}
	/*var obj = jQuery.parseJSON(res);
	alert(obj.responseText);
	console.log(JSON.stringify(res));
	alert(JSON.stringify(res));
	$("#resultats").html()*/
}


function sauver_nouvelle(e)
{

}


function supprimer_nouvelle(e)
{

}
