const fs = require("fs");
const app = __filename.slice(__dirname.length+1); // direct file name

// app settings
const settings = {
	delete: false, // doesn't delete unless specifically told to
	words: [], // words we're searching for
	ignore: [], // words we're ignoring
	sconsole: undefined // the console we're limited to
}

// process arguments
for(let i=2;i<process.argv.length;i++){
	switch(process.argv[i]){
		case "-h":
		case "--help":
			showHelp();
			return;

		case "-d":
		case "--delete":
			settings.delete = true;
			break;

		case "-i":
		case "--ignore":
			if(i==process.argv.length-1) break;
			settings.ignore.push(process.argv[++i].toLowerCase());
			break;

		case "-c":
		case "--console":
			if(i==process.argv.length-1) break;
			settings.sconsole = process.argv[++i].toLowerCase();
			break;

		default: settings.words.push(process.argv[i].toLowerCase());
	}
}

function showHelp(){
	console.log(`node ${app} - search for files in subfolders and potentially delete them.`);
	console.log("SYNOPSIS:");
	console.log(`\tnode ${app} [OPTIONS...] WORDS`);
	console.log("DESCRIPTION:");
	console.log(`\tnode ${app} searches for WORDS in file names.`);
	console.log("OPTIONS:");
	console.log("\t-h, --help:");
	console.log("\t\tShows this page.");
	console.log("\t-d, --delete:");
	console.log("\t\tDelete these roms.");
	console.log("\t-c, --console:");
	console.log("\t\tLimit search to the following console.");
	console.log("\t-i, --ignore:");
	console.log("\t\tIgnore roms that match the following search term.");
}

/** cool syntax output -- kinda like manpages */
if(!settings.words.length && !settings.ignore.length && !settings.sconsole){
	showHelp();
	return;
}

/**
 * Search through all consoles for files matching the search parameters.
 * If the delete flag is specified, delete the ROM.
 */
let romsPath = "ROMs";
let consoles = fs.readdirSync(romsPath);
for(let _console of consoles){
	if(settings.sconsole && _console.toLowerCase()!==settings.sconsole) continue;
	let cPath = `${romsPath}/${_console}`;
	if(!fs.statSync(cPath).isDirectory()) continue;
	let games = fs.readdirSync(cPath);
	for(let game of games){
		let safe = game.toLowerCase().slice(0,-3);
		let matches = [];
		let ignores = [];
		for(let needle of settings.words) if(safe.indexOf(needle)!==-1) matches.push(needle); // look for matches
		for(let _ignore of settings.ignore) if(safe.indexOf(_ignore)!==-1) ignores.push(_ignore); // look for ignores
		if((settings.words.length && !matches.length) || ignores.length) continue;
		let gPath = `${cPath}/${game}`;
		if(settings.delete) fs.rm(gPath, function(){
			console.log(`deleted ${gPath}`);
		});
		else console.log(gPath);
	}
}