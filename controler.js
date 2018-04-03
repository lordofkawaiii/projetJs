var controler = {};
controler.autocompleteList = [];
// --

controler.rechercher_nouvelles = function()
{
	model.setRecherche_courante_news([]);
	$("#resultats").empty();
	$("#wait").show();
	var s = view.getZoneSaisie();
	controler.autocompleteList.push(s);
	$.get('search.php?data='+s,view.maj_resultats);
}
