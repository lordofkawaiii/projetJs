var model = {};

model.recherche_courante="";
model.recherches=[];
model.recherche_courante_news=[];

model.ajouter_recherche = function(){
  alert("test");
	/*model.recherche_courante = $("#zone_saisie").val();
	value = $("#zone_saisie").val();
	res = model.recherches.indexOf(value);
	if (res == -1){
		model.aj_recherche(value);
	}*/
}

model.aj_recherche = function(value){
	model.recherches.push(value);
	$("#recherches-stockees").append('<p class="titre-recherche" onclick="controler.selectionner_recherche(this)" ><label>'+value+'</label><img src="croix30.jpg" class="icone-croix" onclick="controler.supprimer_recherche(this)"/> </p>');
	$.cookie("recherches", JSON.stringify(model.recherches), { expires: 7 });
}

model.supprimer_recherche = function(e)
{
	res = recherches.indexOf(e.value);
	recherches.splice(res, 1);
	e.closest("p").remove();
	$.cookie("recherches", JSON.stringify(recherches), { expires: 7 });
}

model.selectionner_recherche = function(e)
{
	$("#resultats").empty();
	titreRecherche = e.firstChild.textContent;
	$("#zone_saisie").val(titreRecherche);
	recherche_courante = titreRecherche;
	recherche_courante_news = JSON.parse($.cookie(titreRecherche));
	obj = JSON.parse($.cookie(titreRecherche));

	view.afficherRechercheSelectionne(obj);
}

model.sauver_nouvelle = function(e)
{
	value = $("#zone_saisie").val()
	res = recherches.indexOf(value);
	if (res == -1){
		alert("Sauvegardez votre recherche avant de pouvoir enregistrer des offres !");
	} else {
		e.firstChild.setAttribute("src","disk15.jpg");
		e.setAttribute("onclick","supprimer_nouvelle(this)");

		url = $(e.parentNode).find("a").attr("href");
		titre = $(e.parentNode).find("a").text();
		date = $(e.parentNode).find(".date_news").text();

		obj = new Object(titre,url,date);
		if (indexOf(recherche_courante_news,obj)==-1){
			recherche_courante_news.push(obj);
		}

		jsonText = JSON.stringify(recherche_courante_news);
		$.cookie(recherche_courante,jsonText,{expires:1000});
	}

  model.supprimer_nouvelle = function(e)
  {
  	e.firstChild.setAttribute("src","horloge15.jpg");
  	e.setAttribute("onclick","sauver_nouvelle(this)");

  	url = $(e.parentNode).find("a").attr("href");
  	titre = $(e.parentNode).find("a").text();
  	date = $(e.parentNode).find(".date_news").text();

  	obj = new Object(titre,url,date);
  	console.log(titre);
  	console.log(recherche_courante_news);
  	if (indexOf(recherche_courante_news,obj)){
  		recherche_courante_news.splice(indexOf(recherche_courante_news,obj),1);
  	}

  	jsonText = JSON.stringify(recherche_courante_news);
  	$.cookie(recherche_courante,jsonText,{expires:1000});

  }

  model.function Object = function(titre,url,date){
  	this.titre=titre;
  	this.url=url;
  	this.date=date;
  }
