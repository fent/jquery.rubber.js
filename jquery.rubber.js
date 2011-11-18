(function($){
  // these CSS properties will be copied from every test field
  // to their respective twin
  var mimics = [
    'font-family',
    'font-size',
    'font-weight',
    'font-style',
    'font-variant',
    'line-height',
    'letter-spacing',
    'word-spacing',
    'text-indent',
    'text-transform',
    'padding-top',
    'padding-right',
    'padding-bottom',
    'padding-left',
    // copying border width because innerHeight() and innerWidth
    // do return the length including the border width,
    // at least for textareas and inputs
    'border-top-width',
    'border-bottom-width',
  ];
  
  $.fn.rubber = function() {
    return this.each(function(){
      var nodeName = this.nodeName.toLowerCase(),
        $text = $(this),
        type = $text.attr('type');
      
      // check that this is an input element
      if(nodeName !== 'input')
        return true;

      // only allow text and password types
      if(type != 'text' && type != 'password' && type != 'undefined')
        return true;
          
      var maxWidth = parseInt($text.css('max-width'), 10),
        css_add = {
          minWidth: $text.width(),
          // default max-width of the parent element's width,
          // so it doesn't interfere with the layout.
          maxWidth: maxWidth > 0 ? maxWidth : ($text.parent().width()-$text.position().left-$text.outerWidth()+$text.innerWidth())
        },
        
        starting_css = 'display:none',
        update = function(){
          // copy text from text field to $twin, add the longest character to the end
          $twin.text($text.val() + 'W ');
          // update width of text field if it differ's from twin's width
          if($text.width() != $twin.width())
            $text.width($twin.width());
        },
      
        $twin = $('<pre style="' + starting_css + '" />').appendTo('body');
      
      // copy each of the css properties from text field to twin
      $.each(mimics, function(){
        $twin.css(this.toString(), $text.css(this.toString()));
      });
      
      // add custom css properties from text field to twin
      $.each(css_add, function(i, val){
        $twin.css(i, val);
      });
      
      // only update when textarea is typed or pasted on
      // input doesn't work on IE
      $text.bind('keypress keyup input', function(){
        update();
      });
      
      // update once when page is loaded in case text field has text in it
      update();
    });
  }
})(jQuery);
