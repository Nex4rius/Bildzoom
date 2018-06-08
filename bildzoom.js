// Bildzoom Galerie Plugin von Nexarius
// Benötigt JQuery; Font Awesome
var bildzoom = [];

function bildzoom_init(element, bilderliste) {
	bildzoom["element"] = element;
	bildzoom["liste"] = bilderliste;
	$(document).ready(function() {
		$("body").append(`
		<div id="bildzoom_container">
			<div id="bildzoom_links"><i class="fa fa-angle-left"></i></div>
			<div id="bildzoom_rechts"><i class="fa fa-angle-right"></i></div>
			<img src="#" id="bildzoom" />
			<img src="#" id="bildzoom_2" />
			<div id="bildzoom_abdunkeln"></div>
		</div>
	<style>
	#bildzoom_container {
		z-index: 999999999999999999999;
		width:100vw;
		height:100vh;
	}
	#bildzoom_links,
	#bildzoom_rechts,
	#bildzoom_abdunkeln,
	#bildzoom,
	#bildzoom_2 {
		display:none;
	}
	#bildzoom_abdunkeln,
	#bildzoom,
	#bildzoom_2 {
		position:fixed;
		top:0;
		left:0;
		width:100vw;
		height:100vh;
	}
	#bildzoom,
	#bildzoom_2 {
		cursor: zoom-out;
		box-sizing: border-box;
		padding:5vh;
		object-fit: contain;
		z-index:5;
	}
	#bildzoom_2 {
		z-index:6;
	}
	#bildzoom_abdunkeln {
		cursor: zoom-out;
		background:black;
		opacity:0.5;
		z-index:0;
	}
	#bildzoom_links,
	#bildzoom_rechts {
		z-index:10;
		position:fixed;
		top:40vh;
		height:22vh;
		width:10vh;
		font-size:15vh;
		color:white;
		text-align:center;
	}
	#bildzoom_links {
		cursor: pointer;
		left:2.5vh;
	}
	#bildzoom_rechts {
		cursor: pointer;
		right:2.5vh;
	}
	</style>`);
	
		$(document).on("click", bildzoom["element"], function () { // Bildergalerie Zoom Klick
			if (bildzoom["liste"].length === 1) {
				$("#bildzoom_links").remove();
				$("#bildzoom_rechts").remove();
			}
			var link = $(this).attr("src");
			var breite = $(this).width();
			var hoch = $(this).height();
			var oben = $(this).offset().top;
			var links = $(this).offset().left;
			for (var i = 0; i < bildzoom["liste"].length; i++) {
				if (bildzoom["liste"][i].url === link) {
					bildzoom_auswahl(i);
					var bildergaleriezoom = ["#bildzoom_links", "#bildzoom_rechts", "#bildzoom_abdunkeln", "#bildzoom_container i"];
					for (var j = 0; j < bildergaleriezoom.length; j++) $(bildergaleriezoom[j]).fadeIn();
					$("#bildzoom").css({"height" : hoch, "width" : breite, "top" : oben, "left" : links, "padding" : 0}).show().animate({"height" : "100vh", "width" : "100vw", "top" : 0, "left" : 0, "padding" : "5vh"}, "slow");
					break;
				}
			}
		});
	
		$(document).on("click", "#bildzoom_links", function () { // Bildergaleriezoom links
			bildzoom_nummer = (bildzoom_nummer === 0 ? bildzoom["liste"].length : bildzoom_nummer) - 1;
			bildzoom_auswahl(bildzoom_nummer);
		});
	
		$(document).on("click", "#bildzoom_rechts", function () { // Bildergaleriezoom rechts
			bildzoom_nummer = bildzoom_nummer >= bildzoom["liste"].length - 1 ? 0 : bildzoom_nummer + 1;
			bildzoom_auswahl(bildzoom_nummer);
		});
	
		$(document).on("click", "#bildzoom_abdunkeln", function () {
			bildzoom_aus();
		});
		
		$(document).on("click", "#bildzoom", function () {
			bildzoom_aus();
		});
	});
}

function bildzoom_auswahl(i) {
	bildzoom_nummer = i;
	$("#bildzoom_2").attr("src", bildzoom["liste"][bildzoom_nummer].url).fadeIn();
	$("#bildzoom").fadeOut(function() {
		$("#bildzoom").attr("src", $("#bildzoom_2").attr("src"));
		$("#bildzoom").show();
		$("#bildzoom_2").hide();
    });
}

function bildzoom_aus() { // Bildergaleriezoom Zurück
    $("#bildzoom_container *").fadeOut();
}
