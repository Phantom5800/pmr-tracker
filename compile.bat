@echo off

set OPT=--compilation_level SIMPLE

echo Compiling main.min.js ...
java -jar closure-compiler-v20220719.jar %OPT% --js scripts\*.js --js_output_file main.min.js

echo Compilation finished
