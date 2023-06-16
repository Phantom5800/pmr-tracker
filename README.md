# PMR-Tracker

* This is a tracker for the Paper Mario 64 Randomizer found here: https://pm64randomizer.com/
* The tracker itself is hosted over on: https://pmr-tracker.phantom-games.com/

## Features

### Tracker Logic

Automatically highlights star spirits that are available (without glitches) when all requirements are met.

### Seed Import

Import seed id's directly from the randomizer website to configure the tracker appropriately for each seed the end user generates.

### Map Tracker

This was the first (and currently only?) tracker for Paper Mario Randomizer that has a checklist of every available item spawn location in the game in a very detailed map format.

## Contributing

While the production site is maintained exclusively by Phantom5800, anyone is welcome to submit features and bug fixes as pull requests. Feature development at this point is effectively done, there are a number of [Issues](https://github.com/Phantom5800/pmr-tracker/issues) that could use addressing, but they are all very low priority unless something comes in that absolutely needs addressing.

For anyone that wants to submit changes or new features, all you have to do:
* Create a fork on github
* Submit a pull request from your own branch
* Be descriptive in what you changed and consistent with existing code
* ...
* It will probably get merged unless there's major issues!

### Extra Credits
Thanks to the following for major feature contributions:
* MarioManTaw
* MythicFrog

## Building

This project uses Google's closure compiler for minifying javascript before pushing to live. Information on the compiler can be found on [Google's developer site](https://developers.google.com/closure/compiler), and the compiler itself can be found as a runnable jar file on [Maven](https://mvnrepository.com/artifact/com.google.javascript/closure-compiler).