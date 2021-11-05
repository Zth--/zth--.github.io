var vgbranch = "https://github.com/vgstation-coders/vgstation13/tree/Bleeding-Edge/"
var host = "https://vgutils.com.ar"
var DMIS_ENDPOINT = host + "/dmis/";
var IMAGE_ENDPOINT = host + "/dmi/";
var SEARCHER_ENDPOINT = host + "/dmi/search/";

var search = function (val) {
	fetch(SEARCHER_ENDPOINT + val).then(function (response) {
		return response.json();
	}

	).then(function (data) {
		addToTable(data);
	}

	).catch(function (error) {
		console.log(error);
	}

	)
}

document.getElementById("input").onkeyup = function () {
	let input,
		value;
	input = document.getElementById('input');
	value = input.value.toLowerCase();

	if (value.length < 3) {
		return;
	}

	search(value);
}

function addToTable(matches) {
	document.getElementById('results-table').innerHTML = '';
	let tabla = document.getElementById("results-table");
	let tblBody = document.createElement("tbody");

	matches.sort(function (a, b) {
		return a["name"].toString().localeCompare(b["name"]);
	});

	matches.forEach(element => {
		let row = document.createElement("tr");
		let cell1 = document.createElement("td");
		let cell2 = document.createElement("td");
		let cell3 = document.createElement("td");
		let text = document.createTextNode(element["name"]);

		i = element["dmi"].lastIndexOf("/");
		title = element["dmi"].slice(i + 1);
		let dmi_title = document.createTextNode(title);
		let dmi_link = document.createElement('a');
		dmi_link.appendChild(dmi_title);
		dmi_link.title = title;
		dmi_link.href = vgbranch + element["dmi"] + ".dmi";

		var img = document.createElement("img");
		img.classList.add("zoom");
		img.src = "assets/" + element["dmi"];
		cell1.appendChild(img);
		cell2.appendChild(text);
		cell3.appendChild(dmi_link);
		row.appendChild(cell1);
		row.appendChild(cell2);
		row.appendChild(cell3);
		tblBody.appendChild(row);
	});

	tabla.appendChild(tblBody);
	document.getElementById("table").appendChild(tabla);
}