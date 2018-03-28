var recherches=[];//tableau contenant des chaines de caracteres correspondant aux recherches stockees
var recherche_courante;// chaine de caracteres correspondant a la recherche courante
var recherche_courante_news=[]; // tableau d'objets de type resultats (avec titre, date et url)

function ajouter_recherche()
{
	recherche_courante = $("#zone_saisie").val();
	value = $("#zone_saisie").val();
	res = recherches.indexOf(value);
	if (res == -1){
		aj_recherche(value);
	}
}

function aj_recherche(value){
	recherches.push(value)
	$("#recherches-stockees").append('<p class="titre-recherche" onclick="selectionner_recherche(this)" ><label>'+value+'</label><img src="croix30.jpg" class="icone-croix" onclick="supprimer_recherche(this)"/> </p>');
	$.cookie("recherches", JSON.stringify(recherches), { expires: 7 });
}


function supprimer_recherche(e)
{
	res = recherches.indexOf(e.value);
	recherches.splice(res, 1);
	e.closest("p").remove();
	$.cookie("recherches", JSON.stringify(recherches), { expires: 7 });
}

function selectionner_recherche(e)
{
	$("#resultats").empty();
	meh = e.firstChild.textContent;
	$("#zone_saisie").val(meh);
	recherche_courante = meh;
	recherche_courante_news = JSON.parse($.cookie(meh));
	obj = JSON.parse($.cookie(meh));

	for ( var index = 0; index < obj.length; index++ ) {
		$("#resultats").append('<p class="titre_result"><a class="titre_news" href="'+obj[index].url+'" target="_blank">'+obj[index].titre+'</a><span class="date_news">'+obj[index].date+'</span><span class="action_news" onclick="supprimer_nouvelle(this)"><img src="disk15.jpg"/></span></p>');
	}
}


function init()
{
	if ($.cookie("recherches")){
		obj = JSON.parse($.cookie("recherches"));
		for(i = 0; i < obj.length; i++){
			aj_recherche(obj[i]);
		}
	}
}


function rechercher_nouvelles()
{
	recherche_courante_news = [];
	$("#resultats").empty();
	$("#wait").show();

	var s = $("#zone_saisie").val();
	$.get('search.php?data='+s,maj_resultats);

}


function maj_resultats(res)
{
		$("#resultats").empty();
		obj = JSON.parse(res);

		for ( var index = 0; index < obj.length; index++ ) {
			console.log(obj[index].date);
			$("#resultats").append('<p class="titre_result"><a class="titre_news" href="'+obj[index].url+'" target="_blank">'+obj[index].titre+'</a><span class="date_news">'+format(obj[index].date)+'</span><span class="action_news" onclick="sauver_nouvelle(this)"><img src="horloge15.jpg"/></span></p>');
		}
		$("#wait").hide();
}


function sauver_nouvelle(e)
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

}


function supprimer_nouvelle(e)
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



function Object(titre,url,date){
	this.titre=titre;
	this.url=url;
	this.date=date;
}
