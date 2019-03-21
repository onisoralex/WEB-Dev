// Advanced functions

function extractAndPrepareInformationFromEditor() {
	let song = document.getElementById("songtext").innerHTML;
	createTextAndChords(song);

	//		let node = document.getElementById('output');	//Gets the Place where the Lyrics should go in the HTML
	//		node.innerText = lyrics;	//Displays the Lyrics
}

//TODO
function createTextAndChords(whole_song) {
	let array_whole_song = (whole_song.replace(/\r/g, "")).split("\n");	//Delete all the Carriage Return Characters in the File to be able to see the Linebreaks
	let array_song_divided_in_different_parts_with_every_part_as_a_whole_string = getLyricsParts(array_whole_song);	//Gets the different Parts of a Song
	console.log(array_song_divided_in_different_parts_with_every_part_as_a_whole_string);
	let separated_and_processed_song = processSong(array_song_divided_in_different_parts_with_every_part_as_a_whole_string);	//Divides the Parts in separateAarrays, extracts Informations and splits the relevant parts in Chords an Text
	let song_with_transformed_chords = getSongWithTransformedChords(separated_and_processed_song);

	//console.log("----- Whole Array with transformed chords (when it works):");
	//console.log(song_with_transformed_chords);
}
//-----

function getLyricsParts(complete_lyrics_array) {
	let starting_positions_of_parts = getStartingPositionOfParts(complete_lyrics_array);
	let parts1 = getParts(complete_lyrics_array, starting_positions_of_parts);

	return parts1;
}

function getStartingPositionOfParts(complete_lyrics_array2) {
	let starting_positions_of_parts = [];

	for (let i = 0; i < complete_lyrics_array2.length; i++) {
		if (complete_lyrics_array2[i].charAt(0) === "[") {	//New Parts always beginn with a "["
			starting_positions_of_parts.push(i);
		}
	}

	return starting_positions_of_parts;
}

function getParts(complete_song_array, starting_positions_of_parts) {
	let parts2 = [];

	for (let i = 0; i < starting_positions_of_parts.length; i++) {
		let part = [];
		part["name"] = complete_song_array[starting_positions_of_parts[i]];
		for (let j = starting_positions_of_parts[i] + 1; j != -1; j++) {	//Infinite Loop
			part.push(complete_song_array[j]);
			if ((complete_song_array[j + 1] === "") || (complete_song_array[j + 1].charAt(0) === "[")) break;	//Look ahead and break the Line Gathering if the next Line is a Linebreak or starts with a new part
		}
		parts2.push(part);
		if (parts2[parts2.length - 1][0] === "[Info]") break;	//If the last added Part is the Info part, prematurely break off
	}

	parts2["title"] = getSongTitle(complete_song_array, starting_positions_of_parts[0]);	//Get Title
	parts2["artist"] = getArtist(complete_song_array, starting_positions_of_parts[0]);	//Get Artist
	parts2["default_key"] = getDefaultSongKey(complete_song_array, starting_positions_of_parts[0]);	//Get Default Key
	parts2["default_structure"] = getDefaultSongStructure(parts2);	//Get Default Structure

	return parts2;
}
//-----

function processSong(parts3) {
	let names_of_parts_to_exclude_from_splitting = ["[Intro]", "[Solo]", "[Outro]", "[Info]"];
	let names_of_special_parts_to_be_transformed = ["[Intro]", "[Solo]", "[Outro]", "[Info]"];

	for (let i = 0; i < parts3.length; i++) {
		if (!isInArray(parts3[i].name, names_of_parts_to_exclude_from_splitting)) {
			parts3[i] = separateLyricsFromChords(parts3[i]);
		}
	}

	for (let i = 0; i < parts3.length; i++) {
		if (isInArray(parts3[i].name, names_of_special_parts_to_be_transformed)) {
			parts3[i] = makeChordsArrayForConsistency(parts3[i]);
		}
	}

	return parts3;
}

function isInArray(needle, haystack) {
	return (haystack.indexOf(needle) > -1);
}

function separateLyricsFromChords(part2) {
	let newpart = [];
	newpart.name = part2.name;
	newpart.chords = [];
	newpart.lyrics = [];

	for (let i = 0; i < part2.length; i++) {
		if (i % 2 == 0) { // Check if index is odd
			newpart.chords.push(part2[i]);
		} else {
			newpart.lyrics.push(part2[i]);
		}
	}

	return newpart;
}

function makeChordsArrayForConsistency(part3) {
	let newpart2 = [];
	newpart2.name = part3.name;
	newpart2.chords = part3[0];

	return newpart2;
}
//-------------

function getSongWithTransformedChords(separated_and_processed_song2) {
	let names_of_parts_to_exclude_from_transforming = ["[Info]"];
	//console.log(separated_and_processed_song2);

	for (let i = 0; i < separated_and_processed_song2.length; i++) {	//Check if the Part is not in the List of Names to exclude and then send it to transformation
		if (!isInArray(separated_and_processed_song2[i].name, names_of_parts_to_exclude_from_transforming)) {
			if (separated_and_processed_song2.length) {
				separated_and_processed_song2[i].chords = transformChords(separated_and_processed_song2[i].chords);	//Send selected Parts to Transformation and replace the chords in the previous Part with the new chords
			}
		}
	}

	return separated_and_processed_song2;
}

//TODO
function transformChords(chords2) {
	//console.log("----- Chords2 (before transformation; String with Chords Lines):");
	//console.log(chords2);
	//First get the Chords as Strings
	let step1 = getChordsAsStrings(chords2);
	//Then search their position in the Chords-String
	let step2 = searchChordsPositionsInChordsString(chords2, step1);
	//Then tranform the chords
	let step3 = transformChordsAndMakeAnArray(step1, step2);

	return step3;
}

function getChordsAsStrings(chords3) {
	for (let i = 0; i < chords3.length; i++) {
		let help = chords3[i].split(" ");
		let newchords = [];	//Declare a new Array with only the Chords
		for (let j = 0; j < help.length; j++) {
			if (help[j] != "") {
				newchords.push(help[j]);
			}
		}
		chords3[i] = newchords;
	}

	return chords3;
}

//TODO
function searchChordsPositionsInChordsString(chords4, single_chords) {
	//console.log("----- Chordsstring to be transformed:");
	//console.log(chords4);
	//console.log("----- Single separaed cCords to get the positions from:");
	//console.log(single_chords);
}

//TODO
function transformChordsAndMakeAnArray(step1, single_chord_positions) {

}