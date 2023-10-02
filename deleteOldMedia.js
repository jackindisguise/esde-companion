const fs = require("fs");
const app = __filename.slice(__dirname.length+1); // direct file name

// app settings
const settings = {
	dry_run: true
};

// check for dry-run flag
for(let i=2;i<process.argv.length;i++){
	let arg = process.argv[i];
	switch(arg){
		case "-h":
		case "--help":
		/** cool syntax output -- kinda like manpages */
			showHelp();
			return;

		case "-d":
		case "--delete":
			settings.dry_run = false;
			break;
	}
}

function showHelp(){
	console.log(`node ${app} - compile a list of ROMs in our library and delete any media files for ROMs not in the list.`);
	console.log("SYNOPSIS:");
	console.log(`\tnode ${app} [OPTIONS...]`);
	console.log("DESCRIPTION:");
	console.log(`\tnode ${app} deletes media files for unused ROMs.`);
	console.log("OPTIONS:");
	console.log("\t-h, --help:");
	console.log("\t\tShows this page.");
	console.log("\t-d, --delete:");
	console.log("\t\tDelete these media files.");
}

// convenience
Array.prototype.contains = function() { for(let arg of arguments){ if(this.indexOf(arg) === -1) return false; }; return true; };

// collect names
let roms = [];
{
	// these don't need to be shared
	let ignoredExt = ["bin", "cue", "raw"];
	let romsDir = "ROMs";
	let folders = fs.readdirSync(romsDir);
	for(let folder of folders){
		if(!fs.statSync(`${romsDir}/${folder}`).isDirectory()) continue;
		let files = fs.readdirSync(`${romsDir}/${folder}`);
		for(let file of files){
			let ext = file.slice(file.lastIndexOf("."));
			if(ignoredExt.indexOf(ext) !== -1) continue; // ignore this extension
			roms.push(file.slice(0,file.lastIndexOf("."))); 
		}
	}
}

{
	let mediaDir = "downloaded_media"
	let consoles = fs.readdirSync(mediaDir);
	for(let _console of consoles){
		let cPath = `${mediaDir}/${_console}`;
		if(!fs.statSync(cPath).isDirectory()) continue;
		let types = fs.readdirSync(cPath);
		for(let type of types){
			let tPath = `${cPath}/${type}`;
			if(!fs.statSync(tPath).isDirectory()) continue;
			let files = fs.readdirSync(tPath);
			for(let file of files){
				let game = file.slice(0,file.lastIndexOf("."));
				if(roms.contains(game)) continue; // we have this rom, ignore
				let gPath = `${tPath}/${file}`;
				// we don't have this rom
				if(settings.dry_run){
					console.log(`{DRY-RUN} deleted file ${gPath}`);
				} else {
					// delete file
					fs.rm(gPath, function(err){
						if(err) console.log(err);
						else console.log(`deleted file ${gPath}`);
					});
				}
			}
		}
	}
}