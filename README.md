# clock-js
A simple vanilla(pure) Javascript library for adding wall clocks to your web application

**clock-js** allows you to add a wall-clock to your we application with ease.

### Background
**clock-js** is the javascript translation of [simple-desk-clock](https://github.com/gbenroscience/simple-desk-clock) a Java application by the same author.

**clock-js** will make it trivial for web-devs to add clock functionality to web and Javascript apps.


### Usage

To add clock functionality to your webpage, **clock-js** needs a canvas element placed in the right place in the DOM(HTML code). For instance,

  `<canvas id="clock-1" style="float: left; margin-left: 10px; width: 10em; height: 10em;"></canvas>`

Next, create a clock-js object:

    var clock = new Clock({
                    canvasId: 'clock-1',
                    outerColor: 'transparent',
                    middleColor: '#262626',
                    innerColor: '#000',
                    centerSpotWidth: 2,
                    outerCircleAsFractionOfFrameSize: 1.0,
                    showBaseText: false
                });
                clock.run();



To stop this clock instance, do:<br>
`clock.kill();` <br>



As an example, we can do:


    var clock = new Clock({
                    canvasId: 'clock-1',
                    outerColor: 'transparent',
                    middleColor: '#262626',
                    innerColor: '#000',
                    centerSpotWidth: 2,
                    outerCircleAsFractionOfFrameSize: 1.0,
                    showBaseText: false
                });
                clock.run();



         setTimeout(function() {
                    clock.kill();
                }, 10000);
                
                
                
This will create a clock instance that renders on the canvas in the DOM whose `id` is **clock-1**

**`clock.run()`** starts the clock animation that runs the clock. 

The clock will run for 10 seconds and then stop running, due to the **`setTimeout`** block.

This is how easy it is to deploy the clock








Stay tuned as we add more features to this library;
