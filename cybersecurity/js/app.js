// * * * * * * * * * * * * * * *
//- Home Button
// * * * * * * * * * * * * * * *

$(".home").click(function() {
  $(".screen.animated.zoomIn").removeClass('zoomIn');
  $(".screen.animated").addClass('zoomOut');
});


// * * * * * * * * * * * * * * *
//- Personal risk assesment
// * * * * * * * * * * * * * * *

var i = 0;
var answer = {}; //-get the answers to a global variable

$(".answer").click(function() {
	current = "."+$(this).parent().attr('class');
	next = "."+$(this).parent().next().attr('class');
	prev = "."+$(this).parent().prev().attr('class');
	last = "."+$(".questions > div").last().attr('class');

	if (current != last) { //stops if it's last
	  $(current+" .answer:first").removeClass("bounceIn yes");
	  $(current+" .answer:last").removeClass("bounceIn no");
		$(current+" .answer").addClass("animated zoomOut");
	  $(current+" .question span").addClass("fadeOut").bind('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
		  $(current+" .question span").hide();
		  $(current+" .answer").hide();
		  $(next).show();
		  $(next+" .question span").addClass("fadeIn");
		  $(next+" .answer:first").addClass("bounceIn yes");
		  $(next+" .answer:last").addClass("bounceIn no");
	  });
	  $(current+" .question span").removeClass("fadeIn");

		if ($(this).hasClass("correct")) {
			answer['of' + current] = "correct";
			i=i+1;
			$(next).parent().parent().parent().addClass("color"+i);
	  } else {
			answer['of' + current] = "false";
	 	};
	};
	if (current == last) {
	  $(current+" .answer:first").removeClass("bounceIn yes");
	  $(current+" .answer:last").removeClass("bounceIn no");
		$(current+" .answer").addClass("animated zoomOut");
	  $("h1").addClass("animated zoomOut");
	  $(current+" .question span").addClass("fadeOut").bind('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
		  $(current+" .question span").hide();
		  $(current+" .answer").hide();
		  $("h1").hide();
		  $(next).show();
		  $(next+" .question span").addClass("fadeIn");
		  $(next+" .answer:first").addClass("bounceIn yes");
		  $(next+" .answer:last").addClass("bounceIn no");
		  $('.summary').show();
	  });
	  $(current+" .question span").removeClass("fadeIn");

		if ($(this).hasClass("correct")) {
			answer['of' + current] = "correct";
			i=i+1;
	  } else {
			answer['of' + current] = "false";
	 	};

	 	$('.summary .risk-level .num').append(i+"0");
	 	$('.summary .scored').append(i+"0");

	};
});
