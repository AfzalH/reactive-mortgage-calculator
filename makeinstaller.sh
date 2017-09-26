#!/usr/bin/env bash
npm run prod
mkdir srizon-mortgage-calculator
cp -R ./admin ./srizon-mortgage-calculator/
cp -R ./api ./srizon-mortgage-calculator/
cp -R ./languages ./srizon-mortgage-calculator/
cp -R ./lib ./srizon-mortgage-calculator/
cp -R ./site ./srizon-mortgage-calculator/

cp ./readme.txt ./srizon-mortgage-calculator/
cp ./srizon-mortgage-calculator.php ./srizon-mortgage-calculator/

zip -r srizon-mortgage-calculator.1.0.zip srizon-mortgage-calculator

rm -R srizon-mortgage-calculator