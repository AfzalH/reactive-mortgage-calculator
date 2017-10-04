#!/usr/bin/env bash
npm run prod
mkdir reactive-mortgage-calculator
cp -R ./admin ./reactive-mortgage-calculator/
cp -R ./api ./reactive-mortgage-calculator/
cp -R ./languages ./reactive-mortgage-calculator/
cp -R ./lib ./reactive-mortgage-calculator/
cp -R ./site ./reactive-mortgage-calculator/

cp ./readme.txt ./reactive-mortgage-calculator/
cp ./reactive-mortgage-calculator.php ./reactive-mortgage-calculator/

zip -r reactive-mortgage-calculator.1.0.zip reactive-mortgage-calculator

rm -R reactive-mortgage-calculator