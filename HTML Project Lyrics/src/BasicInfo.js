function isInArray(needle, haystack) {
	return (haystack.indexOf(needle) > -1);
}

function getIndexInArray(needle, haystack) {
	return haystack.indexOf(needle);
}

function getInfoFromLine(basic_song_information_array, key_words) {
	let info = "";

	for (let i = 0; i < basic_song_information_array.length; i++) {
		let one_line_array = basic_song_information_array[i].split(/:(.+)/);
		if (isInArray(one_line_array[0].toLowerCase(), key_words)) {
			info = one_line_array[1].trim();
		}
	}

	return info;
}

function getSongTitle(basic_song_information_array) {
	let title = "Unknown Song";
	let title_key_words = ["title", "name"];
	let returned_title = getInfoFromLine(basic_song_information_array, title_key_words)

	return returned_title == "" ? title : returned_title;
}

function getArtist(basic_song_information_array) {
	let artist = "Unknown Artist";
	let artist_key_words = ["artist", "interpret"];
	let returned_artist = getInfoFromLine(basic_song_information_array, artist_key_words)

	return returned_artist == "" ? artist : returned_artist;
}

function getDefaultSongKey(basic_song_information_array) {
	let key = "Unknown Key";
	let key_key_words = ["key", "gama", "gamă"];
	let returned_key = getInfoFromLine(basic_song_information_array, key_key_words)

	return returned_key == "" ? key : returned_key;
}

function getDefaultSongStructure(info_part) {
	let structure = "No structure given";
	let structure_key_words = ["structure", "struktur", "structura", "structură"];
	let returned_structure = getInfoFromLine(info_part, structure_key_words)

	return returned_structure == "" ? structure : returned_structure;
}