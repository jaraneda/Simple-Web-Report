(function() {
	
	var id_content	= '#content', 
		id_addpage	= '#addPage',
		class_a4	= '.A4', 
		class_mod	= 'div[class^="gen_box"]',
        list_edits  = new Array(),
		gen_box 	= null,
        i  			= 1,
        x_begin, y_begin, x_end, y_end, width, height,
        sel_props	= { 
                cancel: '.gen_box',
                distance: 10,
                start: function(e) {
                        
                        //get the mouse position on start
                        x_begin = e.pageX,
                        y_begin = e.pageY;

                    },
                stop: function(e) {
                        
                        //get the mouse position on stop
                        x_end = e.pageX,
                        y_end = e.pageY;

                        /***  if dragging mouse to the right direction, calcuate width/height  ***/

                        if( x_end - x_begin >= 1 ) {
                            width  = x_end - x_begin,
                            height = y_end - y_begin;
                        
                        /***  if dragging mouse to the left direction, calcuate width/height (only change is x) ***/
                        
                        } else {
                            
                            width  = x_begin - x_end,
                            height =  y_end - y_begin;
                            var drag_left = true;
                        }
                        
                        // if wasn't moved the mouse
                        if( !width || !height ){
                        	return false;
                        }

                        //append a new div and increment the class and turn it into jquery selector
                        $(this).append('<div class="gen_box gen_box_' + i + '"></div>');
                        gen_box = $('.gen_box_' + i);

                        //add css to generated div and make it resizable & draggable
                        $(gen_box).css({
                            'background' : 'whitesmoke',
                             'width'     : width,
                             'height'    : height,
                             'position'  : 'absolute',
                             'left'      : x_begin,
                             'top'         : y_begin
                        })
                        .draggable({ containment: "parent", handle: ".handler_move" })
                        .resizable();

                        //if the mouse was dragged left, offset the gen_box position 
                        drag_left ? $(gen_box).offset({ left: x_end, top: y_begin }) : false;
                        console.log( 'width: ' + width + 'px');
                        console.log( 'height: ' + height + 'px' );

                        //add visible area
                        var visible_area = $('<div>').addClass('mod_area_gen_box_' + i).css({
                            'width': '99%', 
                            'height': '99%',
                            'margin': 'auto',
                            'position': 'absolute',
                            'z-index': '80',
                        });
                        gen_box.prepend(visible_area);

                        // Add editor plugin
                        var newEditor = new MediumEditor('.mod_area_gen_box_' + i, {
                            buttonLabels: 'fontawesome'
                        });
                        list_edits.push(newEditor);

                        // Handler for the drag event
                        var handler_move = $('<div>').addClass('handler_move ui-icon ui-icon-arrow-4').css({
                            'z-index': '90',
                            'position': 'absolute',
                            'right': '0px',
                            'top': '0px'
                        });
                        gen_box.append(handler_move);
                
                        var handler_del = $('<div>').addClass('handler_del ui-icon ui-icon-trash').css({
                            'z-index': '90',
                            'position': 'absolute',
                            'right': '0px',
                            'top': '40%'
                        });
                        gen_box.append(handler_del);

                        i++;
                }};

    // Add new page to file
	$(id_addpage).click(function(e){
		e.preventDefault();
		$(id_content).append($('<div>').addClass('A4').selectable(sel_props));
	});
    

	$(id_content).on('click', class_a4, function(e){
        if(e.target.className === "A4 ui-selectable"){
		  $('div[class^="mod_area_gen_box"]').blur();
        }
	});

    $(id_content).on('click', '.handler_del', function(e){
        if (confirm('desea eliminar este modulo ?')){
            $(this).parent().remove();
        } 
        return false;
    });


})();