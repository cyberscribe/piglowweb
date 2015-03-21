PiGlow Web Controller
===================================
About
-----

PiGlow Web Controller is a simple, mobile-friendly web-based interface to control Piglow LEDs attached to a Raspberry Pi.

Requirements
------------

 * Raspberry Pi
 * Pimoroni Piglow (order here: http://shop.pimoroni.com/products/piglow )
 * Piglow Python library (installation instructions: https://github.com/Boeeerb/PiGlow/#installation-instructions )

Use
---

 1. Stop any servers listening on port 80, such as nginx or apache
 2. `cd piglowweb`
 3. `sudo python server.py`
 4. Then browse to http://[your-raspberry-pi-name-or-ip]/

Licenses
--------

 * Piglow by Jason Barnett: https://github.com/Boeeerb/PiGlow/blob/master/LICENSE.md
 * noUiSlider by Léon Gersen: http://www.wtfpl.net/about/
 * Bootstrap by Twitter: https://github.com/twbs/bootstrap/blob/master/LICENSE
