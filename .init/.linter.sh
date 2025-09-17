#!/bin/bash
cd /home/kavia/workspace/code-generation/food-browse-app-135339-135348/food_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

