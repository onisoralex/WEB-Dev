function getSongTitle(complete_lyrics_array3, start_position_of_first_part) {
	let title = "";

	for (let i = 0; i < start_position_of_first_part; i++) {	// From Beginning of Song to the "end" of the Title Part (beginning of first Song Part)
		if (complete_lyrics_array3[i] !== "") {
			title = complete_lyrics_array3[i];
		}
		if (title != "") break;
	}

	return title;
}

function getArtist(complete_lyrics_array5, start_position_of_first_part) {
	let artist = "";

	for (let i = 0; i < start_position_of_first_part; i++) {	// From Beginning of Song to the end of the Title Part (beginning of first Song Part)
		if (complete_lyrics_array5[i] !== "") {
			let artistline = complete_lyrics_array5[i].split(":");
			if (artistline.length == 2) {
				let artist_lowercase = artistline[0].toLowerCase();
				if (artist_lowercase === "artist" || artist_lowercase === "interpret") {
					artist = artistline[1].replace(" ", "");
				}
			}
		}
		if (artist != "") break;
	}

	return artist;
}

function getDefaultSongKey(complete_lyrics_array4, start_position_of_first_part) {
	let key = "";

	for (let i = 0; i < start_position_of_first_part; i++) {	//From Beginning of Song to the end of the Title Part (beginning of first Song Part)
		if (complete_lyrics_array4[i] !== "") {
			let keyline = complete_lyrics_array4[i].split(":");
			if (keyline.length == 2) {
				let keyline_lowercase = keyline[0].toLowerCase();
				if (keyline_lowercase === "key" || keyline_lowercase === "gama" || keyline_lowercase === "gamă") {
					key = keyline[1].replace(" ", "");
				}
			}
		}
		if (key != "") break;
	}

	return key;
}

function getDefaultSongStructure(parts4) {
	let structure = "";

	for (let i = 0; i < parts4.length - 2; i++) {	//Minus 2 to exclude the Info Part
		structure = structure + parts4[i].name + ", ";
	}
	structure = structure.concat(parts4[parts4.length - 2].name);

	return structure;
}