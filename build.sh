#!/bin/bash

# Define a timestamp function
timestamp() {
  date +"datetime:- %Y%m%d %H:%M:%S" # current time
}

rm -rf dist
npm run build
git add -A
git commit -m "New Build API datetime:- $(timestamp)"