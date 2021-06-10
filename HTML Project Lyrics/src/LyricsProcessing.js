// Advanced functions

function extractAndPrepareInformationFromEditor() {
	let complete_song_text = document.getElementById("songtext").innerHTML;
	createTextAndChords(complete_song_text);

	//let node = document.getElementById('output');	// Gets the Place where the Lyrics should go in the HTML
	//node.innerText = lyrics;	// Displays the Lyrics
}

// TODO after subfunctions are done
function createTextAndChords(complete_song_text) {
	let complete_song_line_by_line_array = convertTextToArray(complete_song_text);
	let song_divided_in_different_parts = searchAndGetLyricsParts(complete_song_line_by_line_array);	// Gets the different Parts of a Song
	let separated_and_processed_song_array = processSong(song_divided_in_different_parts);	// Divides the Parts in separateAarrays, extracts Informations and splits the relevant parts in Chords an Text
	let song_with_transformed_chords = getSongWithTransformedChords(separated_and_processed_song_array);

	//console.log("----- Whole Array with transformed chords (when it works):");
	//console.log(song_with_transformed_chords);
}

function convertTextToArray(complete_song_text) {
	let arr = (complete_song_text.replace(/\r/g, "")).split("\n"); // Also delete all the Carriage Return Characters in the File to be able to see the Linebreaks

	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === "") {
			arr.splice(i, 1);
			i--;	// Repeat same line in case there is an empty line again after moving the lines upwards
		}
	}

	return arr;
}

function searchAndGetLyricsParts(complete_song_line_by_line_array) {
	let starting_positions_of_parts = getStartingPositionsOfParts(complete_song_line_by_line_array);
	let parts = extractParts(complete_song_line_by_line_array, starting_positions_of_parts);
	let extended_parts = extend_parts_with_info_about_lyrics(parts);

	return extended_parts;
}

function startOfNewPart(line) {
	return line.charAt(0) === "[";	// New Parts always beginn with a "["
}

function getStartingPositionsOfParts(complete_song_line_by_line_array) {
	let starting_positions_of_parts = [];

	for (let i = 0; i < complete_song_line_by_line_array.length; i++) {
		if (startOfNewPart(complete_song_line_by_line_array[i])) {
			starting_positions_of_parts.push(i);
		}
	}

	return starting_positions_of_parts;
}

function extractParts(complete_song_line_by_line_array, starting_positions_of_parts) {
	let parts = [];

	parts = splitCompleteSongIntoParts(complete_song_line_by_line_array, starting_positions_of_parts);
	parts.title = getSongTitle(complete_song_line_by_line_array.slice(0, starting_positions_of_parts[0]));
	parts.artist = getArtist(complete_song_line_by_line_array.slice(0, starting_positions_of_parts[0]));
	parts.default_key = getDefaultSongKey(complete_song_line_by_line_array.slice(0, starting_positions_of_parts[0]));
	parts.default_structure = getDefaultSongStructure(parts[parts.length - 1]);

	parts = removeInfoPartFromPartsArray(parts);

	return parts;
}

function extend_parts_with_info_about_lyrics(parts) {
	let names_of_parts_with_no_lyrics = ["[Intro]", "[Solo]", "[Outro]"];

	for (let i = 0; i < parts.length; i++) {
		if (isInArray(parts[i].name, names_of_parts_with_no_lyrics)) { // Check if parts are of name X can also be done by   parts.some(e => e.name === "[Intro]");
			parts[i].hasLyrics = false;
		} else {
			parts[i].hasLyrics = true;
		}
	}

	return parts;
}

function splitCompleteSongIntoParts(complete_song_line_by_line_array, starting_positions_of_parts) {
	let parts_array = [];
	starting_positions_of_parts.push(complete_song_line_by_line_array.length - 1);

	for (let i = 0; i < starting_positions_of_parts.length - 1; i++) {
		let part = [];
		part.name = complete_song_line_by_line_array[starting_positions_of_parts[i]]; // Extract the name of a specific part

		for (let j = starting_positions_of_parts[i] + 1; j < starting_positions_of_parts[i + 1]; j++) {	// Start with the first line of a part (line after the Part Tag)
			part.push(complete_song_line_by_line_array[j]); // Push every line from the new part into an array
		}

		parts_array.push(part);
		if (part.name === "[Info]") {
			break;	// If the last added Part is the Info part, break off
		}
	}

	return parts_array;
}

function removeInfoPartFromPartsArray(parts) {
	let part_index = getIndexOfPart(parts, "Info");
	parts.splice(part_index, 1);

	return parts;
}

function processSong(parts) {
	for (let i = 0; i < parts.length; i++) {
		if (parts[i].hasLyrics === true) { // Check if parts are of name X can also be done by   parts.some(e => e.name === "[Intro]");
			parts[i] = separateLyricsFromChords(parts[i]);	// Transform mormally because it has lyrics
		} else {
			parts[i] = separateLyricsFromChords(parts[i]);	// Transform differently because no lyrics
		}
	}

	return parts;
}

function separateLyricsFromChords(part) {
	let newpart = [];
	newpart.name = part.name;
	newpart.chords = part.hasLyrics === false ? part.filter(e => e) : [];
	newpart.lyrics = part.hasLyrics === false ? undefined : [];

	if (part.hasLyrics === true) {
		for (let i = 0; i < part.length; i++) {
			if (i % 2 === 0) { // Check if index is even
				newpart.chords.push(part[i]);
			} else {
				newpart.lyrics.push(part[i]);
			}
		}
	}

	return newpart;
}

function getSongWithTransformedChords(separated_and_processed_song_array) {
	for (let i = 0; i < separated_and_processed_song_array.length; i++) {
		separated_and_processed_song_array[i].transformed_chords = transformChords(separated_and_processed_song_array[i].chords);	// Send selected Parts to Transformation and replace the chords in the previous Part with the new chords
	}

	return separated_and_processed_song_array;
}

// TODO
function transformChords(chords) {
	let step1 = getChordsAsStrings(chords);
	let step2 = searchChordsPositionsInChordsString(chords, step1);
	let step3 = transformChordsAndMakeAnArray(step1, step2);

	return step3;
}

function getChordsAsStrings(chords) {
	for (let i = 0; i < chords.length; i++) {
		let help = chords[i].split(" ");
		let newchords = [];	// Declare a new Array with only the Chords

		for (let j = 0; j < help.length; j++) {
			if (help[j] != "") {
				newchords.push(help[j]);
			}
		}

		chords[i] = newchords;
	}

	return chords;
}

// TODO
function searchChordsPositionsInChordsString(chords4, single_chords) {
	//console.log("----- Chordsstring to be transformed:");
	//console.log(chords4);
	//console.log("----- Single separaed cCords to get the positions from:");
	//console.log(single_chords);
}

// TODO
function transformChordsAndMakeAnArray(step1, single_chord_positions) {

}