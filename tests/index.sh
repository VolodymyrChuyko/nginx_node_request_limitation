#!/usr/bin/env bash

source $(dirname "$0")/utils.sh

for file in `find . -iname "*.test.sh"`
do
    echo "Running tests from: $file"
    bash $file
done
