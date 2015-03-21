$(document).ready(function () {
    $('.swiper-slide').noUiSlider({
	start: [ 0 ],
	range: {
		'min': [  0 ],
		'max': [ 255 ]
	}
    }).on({'slide':updatePiglow});
    window.clock = 0;
    window.interval = 200;
    window.continue = false;
});
function updatePiglow() {
    var red = Math.round($( "#red" ).val()),
      orange = Math.round($( "#orange" ).val()),
      yellow = Math.round($( "#yellow" ).val()),
      green = Math.round($( "#green" ).val()),
      blue = Math.round($( "#blue" ).val());
      white = Math.round($( "#white" ).val());
    var payload = {"r":red,"o":orange,"y":yellow,"g":green,"b":blue,"w":white}
    $.get("/",payload);
}
function iteratePiglow() {
	r = Math.round((Math.sin( window.clock ) * 127.5) + 127.5);
	o = Math.round((Math.sin( window.clock + 1.57079633/2) * 127.5) + 127.5);
	y = Math.round((Math.sin( window.clock + 1.57079633 ) * 127.5) + 127.5);
	g = Math.round((Math.sin( window.clock + 1.5*1.57079633 ) * 127.5) + 127.5);
	b = Math.round((Math.sin( window.clock + 2*1.57079633 ) * 127.5) + 127.5);
	$( "#red" ).val( r );
	$( "#orange" ).val( o );
	$( "#yellow" ).val( y );
	$( "#green" ).val( g );
	$( "#blue" ).val( b );
	updatePiglow();
        window.clock += 0.02463994239;
	if(window.continue) {
		window.setTimeout(iteratePiglow,window.interval);
	}
}
$("#lightcycle").click( function() {
    if(window.continue) {
        window.continue = false;
	$("#lightcycle").html('<span class="glyphicon glyphicon glyphicon-refresh"></span>Cycle');
    } else {
        window.continue = true;
	$("#lightcycle").html('<span class="glyphicon glyphicon glyphicon-stop"></span>Stop');
        iteratePiglow();
    }
});
$("#reset").click( function() {
	$( "#red" ).val( 0 );
	$( "#orange" ).val( 0 );
	$( "#yellow" ).val( 0 );
	$( "#green" ).val( 0 );
	$( "#blue" ).val( 0 );
	$( "#white" ).val( 0 );
	updatePiglow();
});
$("#mid").click( function() {
	$( "#red" ).val( 128 );
	$( "#orange" ).val( 128 );
	$( "#yellow" ).val( 128 );
	$( "#green" ).val( 128 );
	$( "#blue" ).val( 128 );
	$( "#white" ).val( 128 );
	updatePiglow();
});
$("#full").click( function() {
	$( "#red" ).val( 255 );
	$( "#orange" ).val( 255 );
	$( "#yellow" ).val( 255 );
	$( "#green" ).val( 255 );
	$( "#blue" ).val( 255 );
	$( "#white" ).val( 255 );
	updatePiglow();
});
