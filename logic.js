	// Draws a cell at the given y position and x position with the given magnitude.
	function drawCell(magnitude, cellX, cellWidth, color){
		var cellHeight = getCellHeight(magnitude);
			var cellY = graph.bottom_y-cellHeight;
			
			ctx.fillStyle = color;
			ctx.fillRect(cellX, cellY, cellWidth, cellHeight);
			
			var fontSize = getFontSize(cellWidth);
			
			var numY = getTextYPos(fontSize);
			
			// Draw the element's number
			ctx.font = fontSize+"px Times New Roman";
			ctx.fillStyle = TEXTCOLOR;
			if(magnitude != undefined){
				ctx.fillText(magnitude, cellX+(0.25)*cellWidth, numY);
			}
	}
	
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
	
	// returns the x position that would center the text on the xposition given.
	function centerText(text, center){
		var textWidth = ctx.measureText(text).width;
		return Math.round(center - textWidth/2);
	}
	
	// Returns the x position of the cell in the given array.
	function getCellX(index, cellWidth){
		return index*cellWidth + graph.left_x;
	}
	
	// Randomize the current array and redraw.
	function randomize(){
		reset();
		initCanvas();
		sort_this_array = randArray(NUM_ELTS, LOWER_BOUND, UPPER_BOUND);
		drawArray(sort_this_array);
		if(autosort){
			autoSort();
		}
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
	
	// Called whenever the mouse is hovering over a cell.
	// Event contains information about the cell.
	function mouseOnCellEvent(e){
		var highlightedNum = sort_this_array[e.index];
		drawCell(highlightedNum, e.cellX, e.cellWidth, HOVERCOLOR);
		
		// Draw number on top of the cell:
		ctx.font = getMaxFontSize()*(2)+"px Times New Roman";
		ctx.fillStyle = HOVERTEXTCOLOR;
	
		var textX = getHoverColumnTextPosX(e);
		var textY = getHoverColumnTextPosY2(e.index, getMaxFontSize()*2);
		
		ctx.fillText(highlightedNum, textX, textY);
	}
	
	// Checks if the mouse is hovering over a cell. If it 
	// is, draw over the cell and show its number.
	function checkHoverOverCell(){
			clear();
			drawArray(sort_this_array);
			if(window.mouseXPos > graph.left_x && window.mouseXPos < graph.right_x &&
				window.mouseYPos > graph.top_y && window.mouseYPos < graph.bottom_y){
						// If the mouse is in the graph,
						var cellWidth = calcCellWidth(sort_this_array);
						var mouseHoverCell = (window.mouseXPos - graph.left_x) / cellWidth;
						mouseHoverCell = Math.floor(mouseHoverCell);
						
						var cellX = graph.left_x+cellWidth*mouseHoverCell;
						
						var hoverCellEvent = {index:mouseHoverCell, cellX:cellX, 
												cellWidth:cellWidth};
						mouseOnCellEvent(hoverCellEvent);
			}
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
	
	// Swaps the elements at the given elements in the given array
	function swapTwo(arr, first, second){
			temp = arr[second];
			arr[second] = arr[first];
			arr[first] = temp;
			return arr;
	}