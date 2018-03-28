var controler = {};


// --
controler.rechercher_nouvelles = function()
{
	recherche_courante_news = [];
	$("#resultats").empty();
	$("#wait").show();

	var s = $("#zone_saisie").val();
	$.get('search.php?data='+s,view.maj_resultats);
}
