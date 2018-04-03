var model = {};

model.recherche_courante="";
model.recherches=[];
model.recherche_courante_news=[];

model.ajouter_recherche = function(){
	model.recherche_courante = view.getZoneSaisie();
	value = view.getZoneSaisie();
	res = model.recherches.indexOf(value);
	if (res == -1){
		model.aj_recherche(value);
	}
}

model.aj_recherche = function(value){
	model.recherches.push(value);
	$("#recherches-stockees").append('<p class="titre-recherche" onclick="model.selectionner_recherche(this)" ><label>'+value+'</label><img src="croix30.jpg" class="icone-croix" onclick="model.supprimer_recherche(this)"/> </p>');
	$.cookie("recherches", JSON.stringify(model.recherches), { expires: 7 });
}

model.supprimer_recherche = function(e){
	res = model.recherches.indexOf(e.value);
	model.recherches.splice(res, 1);
	e.closest("p").remove();
	$.cookie("recherches", JSON.stringify(model.recherches), { expires: 7 });
}

model.selectionner_recherche = function(e)
{
    $("#resultats").empty();
  	titreRecherche = e.firstChild.textContent;
  	view.setZoneSaisie(titreRecherche);
  	model.recherche_courante = titreRecherche;
  	model.recherche_courante_news = JSON.parse($.cookie(titreRecherche));
  	obj = JSON.parse($.cookie(titreRecherche));
    view.afficherRechercheSelectionne(obj);
}

model.sauver_nouvelle = function(e)
{
	value = view.getZoneSaisie();
	res = model.recherches.indexOf(value);
	if (res == -1){
		alert("Sauvegardez votre recherche avant de pouvoir enregistrer des offres !");
	} else {
		e.firstChild.setAttribute("src","disk15.jpg");
		e.setAttribute("onclick","model.supprimer_nouvelle(this)");

		url = $(e.parentNode).find("a").attr("href");
		titre = $(e.parentNode).find("a").text();
		date = $(e.parentNode).find(".date_news").text();

		obj = new model.Object(titre,url,date);
		if (indexOf(model.recherche_courante_news,obj)==-1){
			model.recherche_courante_news.push(obj);
		}

		jsonText = JSON.stringify(model.recherche_courante_news);
		$.cookie(model.recherche_courante,jsonText,{expires:1000});
	}
}

  model.supprimer_nouvelle = function(e)
  {
  	e.firstChild.setAttribute("src","horloge15.jpg");
  	e.setAttribute("onclick","model.sauver_nouvelle(this)");

  	url = $(e.parentNode).find("a").attr("href");
  	titre = $(e.parentNode).find("a").text();
  	date = $(e.parentNode).find(".date_news").text();

  	obj = new model.Object(titre,url,date);
    console.log(obj);
    console.log(indexOf(model.recherche_courante_news,obj));
  	if (indexOf(model.recherche_courante_news,obj)!= -1){
  		model.recherche_courante_news.splice(indexOf(model.recherche_courante_news,obj),1);
  	}

  	jsonText = JSON.stringify(model.recherche_courante_news);
  	$.cookie(model.recherche_courante,jsonText,{expires:1000});
  }

  model.Object = function(titre,url,date){
  	this.titre=titre;
  	this.url=url;
  	this.date=date;
  }

  model.setRecherche_courante_news = function(rech){
    model.recherche_courante_news = rech;
  }
