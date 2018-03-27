var recherches=[];//tableau contenant des chaines de caracteres correspondant aux recherches stockees
var recherche_courante;// chaine de caracteres correspondant a la recherche courante
var recherche_courante_news=[]; // tableau d'objets de type resultats (avec titre, date et url)

function ajouter_recherche()
{

value = $("#zone_saisie").val()
res = recherches.indexOf(value);
if (res == -1){
	recherches.push(value)
	var p = document.createElement("p");
	p.setAttribute("class","titre-recherches")
	var l = document.createElement("label");
	l.setAttribute("onclick","selectionner_recherche(this)")
	var i = document.createElement("img")
	i.setAttribute("src","croix30.jpg")
	i.setAttribute("class","icone-croix")
	i.setAttribute("onclick","supprimer_recherche(this)")
	l.innerHTML = value
	p.appendChild(l)
	p.appendChild(i)
	divi = ($("#recherches-stockees"))
	divi.append(p)
}


}


function supprimer_recherche(e)
{

	res = recherches.indexOf(e.value)
	recherches.splice(res, 1)
	e.closest("p").remove()

}


function selectionner_recherche(e)
{

	meh = e.textContent
	$("#zone_saisie").val(meh)
	recherche_courante = meh

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
