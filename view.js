var view ={};

view.init = function(){
	if ($.cookie("recherches")){
		obj = JSON.parse($.cookie("recherches"));
		for(i = 0; i < obj.length; i++){
			aj_recherche(obj[i]);
		}
	}
}

view.afficherRechercheSelectionne = function(listeRechercheSauv)
{
  for (var index = 0; index < listeRechercheSauv.length; index++ ) {
		$("#resultats").append('<p class="titre_result"><a class="titre_news" href="'+listeRechercheSauv[index].url+'" target="_blank">'+listeRechercheSauv[index].titre+'</a><span class="date_news">'+listeRechercheSauv[index].date+'</span><span class="action_news" onclick="supprimer_nouvelle(this)"><img src="disk15.jpg"/></span></p>');
	}
}

view.maj_resultats = function(res)
{
		$("#resultats").empty();
		obj = JSON.parse(res);

		for (var index = 0; index < obj.length; index++) {
			$("#resultats").append('<p class="titre_result"><a class="titre_news" href="'+obj[index].url+'" target="_blank">'+obj[index].titre+'</a><span class="date_news">'+format(obj[index].date)+'</span><span class="action_news" onclick="sauver_nouvelle(this)"><img src="horloge15.jpg"/></span></p>');
		}
		$("#wait").hide();
}
