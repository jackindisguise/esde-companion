const fs = require("fs");
let rPath = "ROMs";
fs.readdir(rPath, (err, files)=>{
	if(err) return;
	for(let _console of files){
		let cPath = `${rPath}/${_console}`;
		fs.readdir(cPath, (err, roms)=>{
			if(err) return;
			let titles = {};
			for(let rom of roms){
				if(rom.indexOf(".cue")===-1) continue;
				let disck = /(?:Disc |CD)(\d)/g;
				let search = disck.exec(rom);
				if(!search) {
					let title = rom.slice(0,rom.indexOf(".cue"));
					let tPath = title;
					titles[tPath] = [rom];
					continue;
				}
				let prefix = rom.slice(0,search.index);
				let space = prefix.lastIndexOf(" ");
				let title = prefix.slice(0, space);
				let tPath = title;
				if(titles[tPath]) titles[tPath].push(rom);
				else titles[tPath] = [rom];
			}

			for(let title in titles) fs.writeFile(`${cPath}/${title}.m3u`, titles[title].join("\n"), (err)=>{
				console.log(`created playlist ${cPath}/${title}.m3u`);
			});
		});
	}
});