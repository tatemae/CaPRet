(function( jQuery ){
	jQuery = jQuery.noConflict(true);
	function make_id(){
		var result, i, j;
		result = '';
		for(j=0; j<32; j++)
		{
			if( j == 8 || j == 12|| j == 16|| j == 20)
			result = result + '-';
			i = Math.floor(Math.random()*16).toString(16).toUpperCase();
			result = result + i;
		}
		return result
	}
	function truncate(str, length){
		if(str.length > length){
			str = str.substring(0, length);
			str = str.replace(/w+$/, '');
			str += '...';
			return str;
		} else {
			return str;
		}
	}
	function final_params(copy_text, env){
		env.l = copy_text.length;
		env.txt = truncate(copy_text, 100);		
		return jQuery.param(env);
	}
	function image_tag(copy_text, env){		
		return '<img src="http://capret.mitoeit.org:8000/tracking.gif&' + final_params(copy_text, env) + '"/>';
	}
	jQuery(function() {
	  var env = {};
	  env.u = document.location.href;
	  env.bw = window.innerWidth;
	  env.bh = window.innerHeight;
	  if (document.referrer && document.referrer != "") {
	    env.ref = document.referrer;
	  }
		env.t = new Date().getTime();
		env.id = make_id();
		var license = oer_license_parser.get_license();
		jQuery('body').clipboard({
	    append: function(e){
				return image_tag(e, env) + license.license_html;
			},
	    oncopy: function(e) {
				env.copy = true;
				jQuery('body').append(image_tag(e, env));
				console.log(e); 
			}
	  });				
	});
})(jQuery);
