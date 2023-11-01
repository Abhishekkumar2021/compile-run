# README

Compile and run the cpp file in a competitive programming style. `Take input from a file and write output to a file`

## Features

- Compile the c++ file
- Run the compiled file
- Take input from a file (input.txt)
- Write output to a file (output.txt)
- Delete the compiled file after running

## Requirements

- Input file should be named as input.txt
- It must be in the same directory as the cpp file

## Extension Settings

### At first to activate the extension you have to follow the following steps
- Open the command palette (Ctrl+Shift+P)
- Select `Compile & Run: Activate`

> Note: You have to do this only once, after that you can used the shortcut key present in your status bar to compile and run the file.

## Known Issues

Current this extension is only for c++ files. I will add support for other languages in the future.

## Release Notes

### 0.0.1

Initial release of Compile & Run

### 0.0.2

- Added a seperate command to activate the extension
- Added a menu item to start the compile and run process

### 0.0.3

- Replaced use of `&&` operator with the `if($?)` statement.
- Automatically opening the output.txt on succesfull completion.

### 1.0.0
- No seperate command needed for activation, it will be automatically activated when you open a cpp file.
- No info message will be shown when you run a cpp file as it is shown for a very long time.

**Enjoy!**
