	// Returns a random array of the given length, whose
	// elements are higher than the given lower bound,
	// and lower than the given upper bound.
	function randArray(arr_len, lower, upper){
		var arr = [];
		for(var i=0;i<arr_len;i++){
				arr.push(Math.round(Math.random()*(upper-lower)+lower));
		}
		return arr;	
	}
	
	// Randomize the current array and redraw.
	function randomize(){
		initCanvas();
		sort_this_array = randArray(NUM_ELTS, LOWER_BOUND, UPPER_BOUND);
		drawArray(sort_this_array);
	}
	
	// Returns the cell width for the array given (graph width/ num elts)
	function calcCellWidth(arr){
			return Math.round( graph.width / arr.length );
	}
	
	// Calculates several graph locations and updates their global variables.
	function calcGraphLocations(){
			graph_top_y = GRAPH_PERCENT_FROM_EDGES*canvas.height;
			graph_bottom_y = canvas.height - GRAPH_PERCENT_FROM_EDGES*canvas.height;
			
			graph_left_x = GRAPH_PERCENT_FROM_EDGES*canvas.width;
			graph_right_x = canvas.width - GRAPH_PERCENT_FROM_EDGES*canvas.width;
			
			graph_height = getGraphPix(canvas.height);
			graph_width = getGraphPix(canvas.width);
			
			graph = {top_y:graph_top_y, bottom_y:graph_bottom_y,
						left_x:graph_left_x, right_x:graph_right_x,
						height:graph_height, width:graph_width};
			return graph;
	}
	
	// Returns the font size in px relative to the cellWidth given.
	function getFontSize(cellWidth){
		var fsize = Math.round(cellWidth*0.5);
		if(fsize > MAX_NUM_SIZE){ fsize = MAX_NUM_SIZE; }
		
		/*if(getTextYPos(fsize) > canvas.height){
				fsize = fsize * 0.75;
		}*/
		return fsize;
	}
	
	// Returns the maximum font size for this page
	function getMaxFontSize(){
			return canvas.height*(.075);
	}
	
	// Returns the text y position based off of the given fontSize.
	// Takes into account the window space.
	function getTextYPos(fontSize){
			var numY = graph.bottom_y;//cellY+cellHeight;
			numY += fontSize*(0.7);
			return numY;
	}
	
	// Returns the y position of the text to be drawn on top
	// of the hovered column.
	function getHoverColumnTextPosY(index){
		var textY = getCellHeight(sort_this_array[index]);
		textY = graph.bottom_y-textY;
		
		return textY;
	}
	
	// Returns the y position of the text to be drawn on top
	// of the hovered column.
	function getHoverColumnTextPosY2(index, fontsize){
		return graph.top_y+fontsize; 
	}
	
	// Returns the x position of the text to be drawn on top
	// of the hovered column. (With the current canvas fillText settings)
	function getHoverColumnTextPosX(e){
		var textPixels = ctx.measureText(sort_this_array[e.index]).width;
		var textX = e.cellX + 0.5*e.cellWidth - textPixels/2;
		textX = Math.floor(textX);
		return textX;
	}
	
	// Returns the space alloted for the graph
	function getGraphPix(screen){
			var offset = GRAPH_PERCENT_FROM_EDGES*screen;
			return screen - 2*offset;
	}
	
	// Returns the height of the cell with the given magnitude in reference
	// through the current range (LOWER_BOUND, UPPER_BOUND)
	function getCellHeight(num){
			var percentThroughRange = (num-LOWER_BOUND) / (UPPER_BOUND-LOWER_BOUND);
			return percentThroughRange * getGraphPix(canvas.height);
	}
	
	// Given an array and an index, swaps the number at the index with the element at the
	// index directly after it.
	function swap(arr,i){
			var temp = arr[i];
			arr[i] = arr[i+1];
			arr[i+1] = temp;
			return;
	}