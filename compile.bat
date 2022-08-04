@echo off

set SCRIPTS=scripts\main.js scripts\maps.js scripts\compact.js
echo Compiling main.js ...
java -jar closure-compiler-v20220719.jar --js %SCRIPTS% --js_output_file scripts\main.min.js
