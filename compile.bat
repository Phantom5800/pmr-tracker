@echo off

set OPT=--compilation_level SIMPLE --env BROWSER

echo Compiling main.min.js ...
java -jar closure-compiler-v20240317.jar %OPT% --js scripts\*.js --externs scripts\externs\*.js --js_output_file main.min.js

echo Compilation finished
