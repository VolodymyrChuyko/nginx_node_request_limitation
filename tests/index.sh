#!/usr/bin/env bash

for file in `find . -iname "*.test.sh"`
do
    echo "Running tests from: $file"
    bash $file
done
