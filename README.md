# deleteROMs.js
### Installation
Place inside `%ESDE%/ROMs` folder.
### Purpose
Search and destroy ROM files.
### About
I created this script to mass-delete sports games, but it's also useful for deleting unwanted ROM files like hacks, bad dumps, and the like.
### Syntax
```
node deleteROMs - search for files in subfolders and potentially delete them.
SYNOPSIS:
        node deleteROMs [OPTION...] PATTERNS
DESCRIPTION:
        node deleteROMs searches for PATTERNS in file names.
OPTIONS:
        -d, --delete:
                Delete these roms.
        -c, --console:
                Limit search to the following console.
        -i, --ignore:
                Ignore roms that match the following search term.
```