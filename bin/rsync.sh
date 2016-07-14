#!/bin/bash

DEST="$1"

if [ -z "$DEST" ]; then exit 1; fi

inotifywait -r -m -e close_write --format '%w%f' . |\
while read file
do
        echo $file
	rsync -azvq $file ${DEST}/$file
	echo -n 'Completed at '
	date
done

