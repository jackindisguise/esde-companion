# deleteROMs.js
### Installation
Place inside `%EmulationStation-DE%` folder.
### Purpose
Search and destroy ROM files.
### About
I created this script to mass-delete sports games, but it's also useful for deleting unwanted ROM files like hacks, bad dumps, and the like.
### Syntax
```
node deleteROMs.js - search for files in subfolders and potentially delete them.
SYNOPSIS:
        node deleteROMs.js [OPTIONS...] WORDS
DESCRIPTION:
        node deleteROMs.js searches for WORDS in file names.
OPTIONS:
        -h, --help:
                Shows this page.
        -d, --delete:
                Delete these roms.
        -c, --console:
                Limit search to the following console.
        -i, --ignore:
                Ignore roms that match the following search term.
```

# deleteOldMedia.js
### Installation
Place inside `%EmulationStation-DE%` folder.
### Purpose
Search and destroy unused media files.
### About
I created this script to mass-delete media from ROMs deleted with the `deleteROMs.js` script.

I should probably just combine them into 1 script at this point.
### Syntax
```
node deleteOldMedia.js - compile a list of ROMs in our library and delete any media files for ROMs not in the list.
SYNOPSIS:
        node deleteOldMedia.js [OPTIONS...]
DESCRIPTION:
        node deleteOldMedia.js deletes media files for unused ROMs.
OPTIONS:
        -h, --help:
                Shows this page.
        -d, --delete:
                Delete these media files.
```

# generateM3Us.js
### Installation
Place inside `%EmulationStation-DE%` folder.
### Purpose
Generate a .M3U file for every group of .CUE files we find.
### About
Due to how the emulators and EmulationStation itself works, I disable all file types for CD-based systems except .M3U.

As such, we need to generate a .M3U file for every single game we have, including the ones that only have 1 CD.