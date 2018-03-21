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

}


function rechercher_nouvelles()
{


}


function maj_resultats(res)
{


}


function sauver_nouvelle(e)
{

}


function supprimer_nouvelle(e)
{

}
