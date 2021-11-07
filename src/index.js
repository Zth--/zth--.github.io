var vgbranch = "https://github.com/vgstation-coders/vgstation13/tree/Bleeding-Edge/"
var host = "https://vgutils.com.ar"
var DMIS_ENDPOINT = host + "/dmis/";
var SEARCHER_ENDPOINT = host + "/icon/search/";
var SEARCHER_BY_DMI_ENDPOINT = host + "/dmi/search/";

let tableDiv = document.getElementById('table');
let resultsTable = document.getElementById('results-table');
let noMatchesIndicator = document.getElementById('no-matches-indicator');


window.onload = function () {
	//setting this to hidden when the script is loaded so we can show it 
	//when we have matches and not when we dont
	resultsTable.style.visibility = 'hidden';
	tableDiv.style.visibility = 'hidden';

	//randomly select a bg image. yeah we just sorta use a magic number 
	//since the number of bg images is static
	let randomIndex = Math.trunc(Math.random() * 3);
	let backplate = document.getElementById("bg");
	backplate.style.backgroundImage = `url('../bg/${randomIndex}.jpg')`;

}

var search = function (val) {
	fetch(SEARCHER_ENDPOINT + val).then(function (response) {
		return response.json();
	}).then(function (data) {
		addToTable(data);
	}).catch(function (error) {
		console.log(error);
	})
}

var searchByDmi = function (val) {
	fetch(SEARCHER_BY_DMI_ENDPOINT + val).then(function (response) {
		return response.json();
	}).then(function (data) {
		addToTable(data);
	}).catch(function (error) {
		console.log(error);
	})
}

document.getElementById("input").onkeyup = function () {
	let input, value;

	input = document.getElementById('input');
	value = input.value.toLowerCase();

	if (value.length < 3) {
		return;
	}

	search(value);
}

function addToTable(matches) {
	resultsTable.innerHTML = '';
	let tblBody = document.createElement("tbody");


	if (matches == null) {
		noMatchesIndicator.innerHTML = 'No icons found.';
		resultsTable.style.visibility = 'hidden';
		tableDiv.style.visibility = 'hidden';
		return;
	}
	else if (Array.isArray(matches) && matches.length > 0) {
		noMatchesIndicator.innerHTML = '';
		resultsTable.style.visibility = 'unset';
		tableDiv.style.visibility = 'unset';
	}


	matches.sort(function (a, b) {
		return a["name"].toString().localeCompare(b["name"]);
	});

	matches.forEach(element => {
		let row = document.createElement("tr");
		let cell1 = document.createElement("td");
		let cell2 = document.createElement("td");
		let cell3 = document.createElement("td");
		let text = document.createTextNode(element["name"]);

		let i = element["dmi"].lastIndexOf("/");
		let dmiFile = element["dmi"].slice(0, i) + ".dmi";
		i = dmiFile.lastIndexOf("/");
		let title = dmiFile.slice(i + 1);

		let dmi_title = document.createTextNode(title);
		let dmi_link = document.createElement('a');
		dmi_link.appendChild(dmi_title);
		dmi_link.title = title;
		//dmi_link.href = vgbranch + dmiFile;
		dmi_link.onclick = function () {
			console.log(dmiFile)
			searchByDmi(title.slice(0, -4))
		};

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


	resultsTable.appendChild(tblBody);
	document.getElementById("table").appendChild(resultsTable);
}

