An experiment with using a standard input devices (game controller, keyboard, touch) to recreate the input from a [paddle controller](https://en.wikipedia.org/wiki/Paddle_%28game_controller%29).

## Motivation

An oft-overlooked input method is the paddle controller.
In its purest form, it is a source of continuous motion along a single axis.
This is a natural choice for any game implementing controls that mimic real-life transportation.
I've implemented a virtual paddle controller in Javascript, built from relevant pieces reverse-engineered from Unity's API.

## Scaffolding

Unity decouples device input from control mappings, so that several devices can be interchanged to drive the same in-game actions.
`Input.GetAxis(<axis name>)` is a commonly used method to get primary directional input from the user.
The normal setup is a single horizontal and vertical axis, whose values range from [-1, 1].
This functionality on its own lets developers make code with fewer dependencies.
So how's it done?
Depending on whether we're talking about controllers, keyboards, or touch, the approach is different.

## Keyboard Input

`Input.GetAxis(<axis name>)` returns a continuous (in the mathematical sense) quantity in a normalized range.
Of course keyboard input is binary - either a key is down or up.
Mapping from one to the other requires a smoothing function.
In effect, a change in key state sets a goal position for the output of the `GetAxis()` function, which will be achieved over some finite timespan.
As a result, the result of a call to `GexAxis()` is dependent on time, and the shape of the smoothing function.
Only a linear smoothing function is available.

All example code for handling keyboard input lives in the `test-input` directory.

## Controller Input

The thumbstick data exposed by the browser's native controller API, unmodified, is exactly the expected output of `GetInput()`.
Unlike keyboard input, it already encodes a continous quantity in 2 directions.
Thumbstick hardware is also self-centering, so the data naturally exhibits smoothing over time.

Controller input support is based heavily on examples provided in the MDN docs.
It does not adhere to Unity's API.
All example code for handling controller input lives in the root directory.

## Touch input

TODO!

## A Note on Copyright

This software is produced in the United States.
It reproduces a limited amount of the functionality described in [Unity Technologies'](http://unity3d.com/public-relations) [scripting API documentation](http://docs.unity3d.com/ScriptReference/index.html).
The reproduction was done via [clean-room design](https://en.wikipedia.org/wiki/Clean_room_design) - that is, no proprietary source code owned by Unity Technologies was consulted during its development.
At time of writing, the ["Oracle v. Google" ruling of the SCOTUS](https://www.eff.org/cases/oracle-v-google) upholds that APIs are copyrightable in the United States.
However, I believe that the code I've written **does not** infringe on Unity Technologies' copyrights, on grounds of fair use.
My interpretation of the fair use criteria (as described by [Stanford University Library](http://fairuse.stanford.edu/overview/fair-use/four-factors/)) is as follows:

* **The purpose and character of your use** - This repository is part of a *noncommercial* and *personal* endeavour to offer readers an overview of interesting and challenging ideas in the programming field. I hope to show appreciation for the complexity and diversity of problems solved and introduced by the act of writing code.
* **The nature of the copyrighted work** - Unity's scripting API is a factual description of a software interface intended for use by, and made available to the general public. It does not include any binary representation.
* **The amount and substantiality of the portion taken** - I have not reproduced any part (visual or functional) of the Unity editor, the company's flagship desktop product. Instead, I reproduced the **interfaces** to several time handling, input handling, and linear algebra routines. I believe that the functionality reproduced reflects widely-known aspects of the fields of game design and mathematics.
* **The effect of the use upon the potential market** - The code I provide in this repository does not constitute a complete game engine, nor does it provide substantial functionality of one. In short, it could not, as provided, be a source of income for myself or others. Moreover, my code cannot deprive Unity Technologies of income, since it does not comprise enough material to be an alternative to any product they provide.
