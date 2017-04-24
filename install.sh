#!/usr/bin/env bash

if [ ! -f ./webshots ]; then
    echo "Run from git clone folder, same location as this file.";
    exit;
fi

ln -s ${pwd}/webshots /usr/bin/local/
ln -s ${pwd}/webshots.js /usr/bin/local/