$(document).ready(function() {
	$('#pagepiling').pagepiling({
      	direction: 'horizontal',
		menu: '#menu',
		anchors: ['home', 'projects', 'contact'],
	    sectionsColor: ['black', 'black', 'black'],
	    navigation: {
	    	'textColor': 'white',
    		'bulletsColor': 'white',
	    	'position': 'right',
	   		'tooltips': ['Home', 'Projects', 'Contact']
	   	},
	   	keyboardScrolling: true,

	    afterRender: function(){
	    	$('#pp-nav').addClass('custom');
	    },
	    afterLoad: function(anchorLink, index){
	    	if(index>1){
	    		$('#pp-nav').removeClass('custom');
	    	}else{
	    		$('#pp-nav').addClass('custom');
	    	}
	    }
	});
});