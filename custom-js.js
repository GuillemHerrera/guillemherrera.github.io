

$(document).ready(function(){ 
	

	function openLink(item){
		window.open(item.href);
    	return false;
	}
      
	function makeModal(item, divI){

		var modal = document.getElementById('myModal');
		// Get the image and insert it inside the modal - use its "alt" text as a caption
		var modalImg = document.getElementById("img");
		var captionText = document.getElementById("caption");
		setText(item.info, captionText);
		modal.style.display = "block";
		modalImg.src = item.bigimg;

		// Get the <span> element that closes the modal
		var span = document.getElementsByClassName("close")[0];

		// When the user clicks on <span> (x), close the modal
		span.onclick = function() { 
		    modal.style.display = "none";
		};

		$(document).keyup(function(e) {
     		if (e.keyCode == 27) { // escape key maps to keycode `27`
        	modal.style.display = "none";
    		}
		});

	}

	function setText(urlText,divText) {

		var rawFile = new XMLHttpRequest();
    	rawFile.open("GET", urlText, async=true);
    	rawFile.onreadystatechange = function ()
    	{
        	if(rawFile.readyState === 4)
        	{
            	if(rawFile.status === 200 || rawFile.status == 0)
            	{
                	divText.innerHTML = rawFile.responseText;
                }
        	}
    	};
    	rawFile.send(null); 

	}

	function makeSlideShow(item) {
		//console.log(item);
		if (item.class=='Analisys'){
		var node = document.getElementById('slider');
		var divImg = document.createElement('div');
		divImg.className='background-img';
		divImg.style.backgroundImage = "url("+item.img+")";
		var divCont = document.createElement('div');
		
		divCont.className='background-text';

		var hnode= document.createElement('h1');
		var hcont = document.createTextNode(item.title);
		
		hnode.appendChild(hcont);
		divCont.appendChild(hnode);
		divImg.appendChild(divCont);
		node.appendChild(divImg);

		divImg.onclick =  function(){makeModal(item, divImg)};
		
		}else if (item.class=='Mapping') {
		var nodemap=document.getElementById('slider-mapp');
		var divImg = document.createElement('div');
		divImg.className='background-img';
		divImg.style.backgroundImage = "url("+item.img+")";
		var divCont = document.createElement('div');
		
		divCont.className='background-text';

		var hnode=document.createElement('h1');
		var hcont=document.createTextNode(item.title);
		
		hnode.appendChild(hcont);
		divCont.appendChild(hnode);
		divImg.appendChild(divCont);
		nodemap.appendChild(divImg);

		divImg.onclick =  function(){openLink(item)};
		}
	}

		  
  

	function makeSlideNavShow(item) {
		//console.log(item);
		if (item.class=='Analisys'){
			var node = document.getElementById('slider-nav');
			var divNavImg = document.createElement('div');
			divNavImg.className='slide-nav-img';
			divNavImg.style.backgroundImage = "url("+item.img+")";
			node.appendChild(divNavImg);

		}else if (item.class=='Mapping'){
			var node = document.getElementById('slider-mapp-nav');
			var divNavImg = document.createElement('div');
			divNavImg.className='slide-nav-img';
			divNavImg.style.backgroundImage = "url("+item.img+")";
			node.appendChild(divNavImg);

		}

	}



	slides.forEach(makeSlideShow);
	slides.forEach(makeSlideNavShow);
 
      $('#slider').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          fade: true,
          autoplay: true,
          autoplaySpeed: 4000,
          asNavFor: '#slider-nav',
          
        });

      $('#slider-nav').slick({
          slidesToShow: 2,
          slidesToScroll: 1,
          asNavFor: '#slider',
          variableHeight: true,
          dots: false,
          centerMode: true,
          focusOnSelect: true,
          responsive: [
          	{breakpoint:540,
          	 settings:{
          	 	slidesToShow: 1,
          	 	infinite:true
          	 	}
          	 }
          ]
        });

      $('#slider-mapp').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          fade: true,
          autoplay: true,
          autoplaySpeed: 6000,
          asNavFor: '#slider-mapp-nav',
          
        });

      $('#slider-mapp-nav').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          asNavFor: '#slider-mapp',
          variableHeight: true,
          dots: false,
          centerMode: true,
          focusOnSelect: true
        });
});

 
$(document).ready(function(){ //show toogle button
	$(window).width(function () {

		$('#menu').addClass('mostra');
//		$('.icon-toggle').addClass('oculta');
		$('#logos').addClass('mostra');
		$('#logos-mbl').addClass('oculta');
		});


	var sections = $('section');
  	var nav = $('header');
  	var nav_height = nav.outerHeight();
  	$(window).on('scroll', function () {
  		console.log($(this).scrollTop());
	  var cur_pos = $(this).scrollTop()+200;
	  sections.each(function() {
	    var top = $(this).offset().top - nav_height;
	    var bottom = top + $(this).outerHeight();
	    
	    if (cur_pos >= top && cur_pos <= bottom) {
	      nav.find('a').removeClass('current');
	      nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('current');
	    }
	  });
	});

	nav.find('a').on('click', function () {
	  var id = $(this).attr('href');
	  
	  $('html, body').animate({
	    scrollTop: $(id).offset().top - nav_height - 50
	  }, 500);
	});
	});


$(document).ready(function(){
		// resize top content
		var firstHeight = $('header').outerHeight() + 70;
		$("#content").css({ top: firstHeight });
		
		var wSize = $(window).outerHeight() - firstHeight;

		if ($(window).width() > 540){
			$(".menu-content").css({top:$('header').outerHeight()/3});}
		else if ($(window).width() < 540){
			$(".menu-content").css({top:'20px'});}
		//$("menu_items").each().css({bottom: '10px'});

		$(window).resize(function() {
		var height = $('header').outerHeight() + 70;
		var winSize = $(window).outerHeight() - firstHeight;
		$("#content").css({ top: height });
		if ($(this).width() > 540){
			$(".menu-content").css({top:$('header').outerHeight()/3});}
		else if ($(this).width() < 540){
			$(".menu-content").css({top:'20px'});}	

 		});
 
});

