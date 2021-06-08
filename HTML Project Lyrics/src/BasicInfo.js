function isInArray(needle, haystack) {
	return (haystack.indexOf(needle) > -1);
}

function getIndexInArray(needle, haystack) {
	return haystack.indexOf(needle);
}

function getSongTitle(complete_song_line_by_line_array, start_position_of_first_part) {
	let title = "Unknown Song";
	let title_key_words = ["title", "name"];

	for (let i = 0; i < start_position_of_first_part; i++) {	// From Beginning of Song to the "end" of the Title Part (beginning of first Song Part)
		if (complete_song_line_by_line_array[i] !== "") {
			title = complete_song_line_by_line_array[i];
		}
		if (title != "") break;
	}

	return title;
}

function getArtist(complete_song_line_by_line_array, start_position_of_first_part) {
	let artist = "";

	for (let i = 0; i < start_position_of_first_part; i++) {	// From Beginning of Song to the end of the Title Part (beginning of first Song Part)
		if (complete_song_line_by_line_array[i] !== "") {
			let artistline = complete_song_line_by_line_array[i].split(":");
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

function getDefaultSongKey(complete_song_line_by_line_array, start_position_of_first_part) {
	let key = "";

	for (let i = 0; i < start_position_of_first_part; i++) {	//From Beginning of Song to the end of the Title Part (beginning of first Song Part)
		if (complete_song_line_by_line_array[i] !== "") {
			let key_line = complete_song_line_by_line_array[i].split(":");
			if (key_line.length == 2) {
				let keyline_lowercase = key_line[0].toLowerCase();
				if (keyline_lowercase === "key" || keyline_lowercase === "gama" || keyline_lowercase === "gamă") {
					key = key_line[1].replace(" ", "");
				}
			}
		}

		if (key != "") break;
	}

	return key;
}

function getDefaultSongStructure(parts) {
	let structure = "";

	for (let i = 0; i < parts.length - 1; i++) {
		if (parts[i].name == "[Info]") continue;	// Exclude the Info Part
		structure = structure + parts[i].name + ", ";
	}
	structure = structure.concat(parts[parts.length - 2].name);

	return structure;
}