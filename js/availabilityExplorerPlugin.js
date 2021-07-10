/*!
 * AvailabilityExplorerPlugin 1.0
 *
 *  AvailabilityExplorerPlugin.js
 *  AvailabilityExplorerPlugin.css
 *
 * Example of using plugin:
 *  $('#availability').AvailabilityExplorerPlugin(
 *   {
 *		  items: items,  // availability items
 *		  lines: lines,  // list of VMs
 *		  margin: {		 // margin for chart container (px)
 *			top: 20,
 *  		right: 20,
 *			bottom: 20,
 *			left: 20 			
 *		  }
 *    });
 *
 *  Requires
 *	 - jquery
 *	 - d3.js
 *
 * AvailabilityExplorer jquery plugin
 * for display time line of Availability
 *
 * Date: 2015-11-30
 * Albert Davletov
 */
 (function($) {

 	var chartObject = {
 		filter: "allType",
 		timePeriod: "day",
 		items: [],
 		lines: [],
 		chartSettings: {},
 		margin: {}
 	};

 	// create base dom elements for plugin
 	function createDomElementsForPlugin(divForPlugin, settings) {

 		// chart div for d3
 		var chart = $('<div/>', {
            id: "chart"
        });

 		// div for tooltip
 		var chartTooltip = $('<div/>', {
            id: "tag"
        });        

 		// filter Container
        var filterContainer = $('<div/>', {
            class: "filter-container"
        });

        var availableFilter = $('<div/>', {
            class: "available-filter"
        });        

        var availableFilterButtons = '<button id="availableType" class="filter-btn"><span>Available</span></button>' + 
			'<button id="unavailableType" class="filter-btn"><span>Unavailable</span></button>' + 
			'<button id="unknownType" class="filter-btn"><span>Unknown</span></button>' + 
			'<button id="allType" class="filter-btn"><span>All</span></button>';

		availableFilter.append(availableFilterButtons);


        var timeFilter = $('<div/>', {
            class: "time-filter"
        });    		

        var timeFilterButtons = '<button id="oneDay" class="filter-btn">Day</button>' +
			'<button id="oneWeek" class="filter-btn">Week</button>';

		timeFilter.append(timeFilterButtons);

		filterContainer.append(availableFilter);
		filterContainer.append(timeFilter);


		divForPlugin.append(chart);
		divForPlugin.append(chartTooltip);
		divForPlugin.append(filterContainer);
 	}

 	// initialize base chart settings 
	function initChartSettings(items, lines, margin) {
		var chSet = {};
		
		// define the chart extents
		chSet.parentWidth = $("#chart").width();

		chSet.margin = {top: margin.top, right: margin.right, bottom: margin.bottom, left: margin.left};
		chSet.width = chSet.parentWidth - chSet.margin.left - chSet.margin.right;
		chSet.height = 300 - chSet.margin.top - chSet.margin.bottom;
		chSet.miniHeight = lines.length * 12 + 50;
		chSet.mainHeight = chSet.height - chSet.miniHeight - 50;

		chSet.x = d3.time.scale()
		  .domain([d3.min(items, function(d) { return d.start - 100000; }),
		       d3.max(items, function(d) { return d.end; })])
		  .range([0, chSet.width]);

		chSet.x1 = d3.time.scale().range([0, chSet.width]);

		var ext = d3.extent(lines, function(d) { return d.id; });

		chSet.y1 = d3.scale.linear().domain([ext[0], ext[1] + 1]).range([0, chSet.mainHeight]);

		chSet.y2 = d3.scale.linear().domain([ext[0], ext[1] + 1]).range([0, chSet.miniHeight]);

		var timeFormat = (chartObject.timePeriod==="day") ? "%H:%M" : "%m/%d %H:%M";
		// draw the x axis
		chSet.xDateAxis = d3.svg.axis()
		  .scale(chSet.x)
		  .orient('bottom')
		  .tickFormat(d3.time.format(timeFormat))
		  .tickSize(-chSet.miniHeight, 0, 0);

		chSet.x1DateAxis = d3.svg.axis()
		  .scale(chSet.x1)
		  .orient('bottom')
		  .tickFormat(d3.time.format(timeFormat))
		  .tickSize(-chSet.mainHeight, 0, 0);

		var chart = d3.select('#chart')
		  .append('svg:svg')
		  .attr('width', chSet.width + chSet.margin.right + chSet.margin.left)
		  .attr('height', chSet.height + chSet.margin.top + chSet.margin.bottom)
		  .attr('class', 'chart');

		chart.append('defs').append('clipPath')
		  .attr('id', 'clip')
		  .append('rect')
		  .attr('width', chSet.width)
		  .attr('height', chSet.mainHeight);

		chSet.main = chart.append('g')
		  .attr('transform', 'translate(' + chSet.margin.left + ',' + chSet.margin.top + ')')
		  .attr('width', chSet.width)
		  .attr('height', chSet.mainHeight)
		  .attr('class', 'main');

		chSet.mini = chart.append('g')
		  .attr('transform', 'translate(' + chSet.margin.left + ',' + (chSet.mainHeight + 60) + ')')
		  .attr('width', chSet.width)
		  .attr('height', chSet.miniHeight)
		  .attr('class', 'mini');

		// draw the items
		chSet.itemRects = chSet.main.append('g')
		  .attr('clip-path', 'url(#clip)');

		charetSettings = chSet;
		return charetSettings;
	}

	// create chart by input data
	function createChart(chartSettings, itemsData, linesData) {
		var chSet = chartSettings;
		var items = itemsData;
		var lines = linesData;

		// draw the selection area
		chSet.brush = d3.svg.brush()
		  .x(chSet.x)
		  .extent([setHour(5), setHour(10)])
		  .on("brush", function() {
		  	showChart(chSet, items);
		  });

		// draw the lines for the main chart
		chSet.main.append('g').selectAll('.laneLines')
		  .data(lines)
		  .enter().append('line')
		  .attr('x1', 0)
		  .attr('y1', function(d) { return d3.round(chSet.y1(d.id)) + 0.5; })
		  .attr('x2', chSet.width)
		  .attr('y2', function(d) { return d3.round(chSet.y1(d.id)) + 0.5; })
		  .attr('stroke', function(d) { return d.label === '' ? 'white' : 'lightgray' });

		chSet.main.append('g').selectAll('.laneText')
		  .data(lines)
		  .enter().append('text')
		  .text(function(d) { 
		    return d.label; 
		  })
		  .attr('x', -10)
		  .attr('y', function(d) { return chSet.y1(d.id + .5); })
		  .attr('dy', '0.5ex')
		  .attr('text-anchor', 'end')
		  .attr('class', 'laneText');

		// draw the lines for the mini chart
		chSet.mini.append('g').selectAll('.laneLines')
		  .data(lines)
		  .enter().append('line')
		  .attr('x1', 0)
		  .attr('y1', function(d) { return d3.round(chSet.y2(d.id)) + 0.5; })
		  .attr('x2', chSet.width)
		  .attr('y2', function(d) { return d3.round(chSet.y2(d.id)) + 0.5; })
		  .attr('stroke', function(d) { return d.label === '' ? 'white' : 'lightgray' });

		chSet.mini.append('g').selectAll('.laneText')
		  .data(lines)
		  .enter().append('text')
		  .text(function(d) { 
		    return d.label; 
		  })
		  .attr('x', -10)
		  .attr('y', function(d) { return chSet.y2(d.id + .5); })
		  .attr('dy', '0.5ex')
		  .attr('text-anchor', 'end')
		  .attr('class', 'laneText');


		chSet.main.append('g')
		  .attr('transform', 'translate(0,' + chSet.mainHeight + ')')
		  .attr('class', 'main axis date')
		  .call(chSet.x1DateAxis);

		chSet.mini.append('g')
		  .attr('transform', 'translate(0,' + chSet.miniHeight + ')')
		  .attr('class', 'axis date')
		  .call(chSet.xDateAxis);

		chSet.mini.append('g').selectAll('miniItems')
		  .data(function() {
		  	return getPosition(chSet, items);
		  })
		  .enter().append('path')
		  .attr('class', function(d) { return 'miniItem ' + d.class; })
		  .attr('d', function(d) { return d.path; });

		// invisible hit area to move around the selection window
		chSet.mini.append('rect')
		  .attr('pointer-events', 'painted')
		  .attr('width', chSet.width)
		  .attr('height', chSet.miniHeight)
		  .attr('visibility', 'hidden')
		  .on('mouseup', function() {
		  	moveSlider.call(this, chSet, items);
		  });


		chSet.mini.append('g')
		  .attr('class', 'x brush')
		  .call(chSet.brush)
		  .selectAll('rect')
		  .attr('y', 1)
		  .attr('height', chSet.miniHeight - 1);

		chSet.mini.selectAll('rect.background').remove();

		showChart(chSet, items);
	}

	// show Chart
	function showChart(chartSettings, items) {

		var chSet = chartSettings;
		mainItemsFilter();		

		var rects, labels
		  , minExtent = d3.time.minute(chSet.brush.extent()[0])
		  , maxExtent = d3.time.minute(chSet.brush.extent()[1])
		  , visItems = items.filter(function (d) { 
		    return d.start < maxExtent && d.end > minExtent
		  });

		chSet.mini.select('.brush').call(chSet.brush.extent([minExtent, maxExtent]));   

		chSet.x1.domain([minExtent, maxExtent]);

		// update the axis
		chSet.main.select('.main.axis.date').call(chSet.x1DateAxis);

		// upate the item rects
		rects = chSet.itemRects.selectAll('rect')
		  .data(visItems, function (d) { return d.id; })
		  .attr('x', function(d) { return chSet.x1(d.start); })
		  .attr('width', function(d) { return chSet.x1(d.end) - chSet.x1(d.start); });

		rects.enter().append('rect')
		  .attr('x', function(d) { return chSet.x1(d.start); })
		  .attr('y', function(d) { return chSet.y1(d.line) + .1 * chSet.y1(1) + 0.5; })
		  .attr('width', function(d) { return chSet.x1(d.end) - chSet.x1(d.start); })
		  .attr('height', function(d) { return .8 * chSet.y1(1); })
		  .attr('class', function(d) { return 'mainItem ' + d.class; });

		rects.on("mouseenter", function(item) {

		  var startTime = (item.start.getMonth() + 1) + "/" + item.start.getDate() + " " + item.start.toLocaleTimeString();
		  var endTime = (item.end.getMonth() + 1) + "/" + item.end.getDate() + " " + item.end.toLocaleTimeString();
		  var tag = "Status: " + item.status + "<br/>" + 
		            "Start Time: " + startTime + "<br/>" + 
		            "End Time: " + endTime + "<br/>" + 
		            "Info: " + item.info + "<br/>";

		  var output = document.getElementById("tag");

		  var xW = (d3.event.layerX) + "px";
		  var yW = this.y.animVal.value + 30 + "px";

		  output.innerHTML = tag;
		  output.style.top = yW;
		  output.style.left = xW;
		  output.style.display = "block";

		  d3.select(this).classed("rect-hover", true);

		}).on("mouseleave", function() {
	  		var output = document.getElementById("tag");
	  		output.style.display = "none";
	  		d3.select(this).classed("rect-hover", false);
		});

		rects.exit().remove();

		// update the item labels
		labels = chSet.itemRects.selectAll('text')
		  .data(visItems, function (d) { 
		    return d.id; 
		  })
		  .attr('x', function(d) { 
		    return chSet.x1(Math.max(d.start, minExtent)) + 2; 
		  });
		      
		labels.enter().append('text')
		  /*.text(function (d) { 
		    return 'Item\n\n\n\n Id: ' + d.id; 
		  })*/
		  .attr('x', function(d) { 
		    return chSet.x1(Math.max(d.start, minExtent)) + 2; 
		  })
		  .attr('y', function(d) { 
		    return chSet.y1(d.line) + .4 * chSet.y1(1) + 0.5; 
		  })
		  .attr('text-anchor', 'start')
		  .attr('class', 'itemLabel');

		labels.exit().remove();
	}

	// handler by moving slider on the chart
	function moveSlider (chartSettings, items) {
		var chSet = chartSettings;

		var startTimeRect = d3.min(items, function(d) { return d.start; });
		var endTimeRect = d3.max(items, function(d) { return d.end; });

		var origin = d3.mouse(this)
		  , point = chSet.x.invert(origin[0])
		  , halfExtent = (chSet.brush.extent()[1].getTime() - chSet.brush.extent()[0].getTime()) / 2;


		var start = new Date(point.getTime() - halfExtent)
		var end = new Date(point.getTime() + halfExtent);

		var delta = 0;
		if (start < startTimeRect) {
			delta = startTimeRect.getTime() - start.getTime();
			start = startTimeRect;
			end = new Date(end.getTime() + delta);
		}

		if(end > endTimeRect) {
			delta = end.getTime() - endTimeRect.getTime();
			end = endTimeRect;
			start = new Date(start.getTime() - delta);
		}

		chSet.brush.extent([start,end]);

		showChart(chartSettings, items);
	}

	// remove svg chart
	function disposeChart() {
		$("#chart svg").remove();
	}

	// event handler - show/hide each item by selected filter
	function mainItemsFilter() {
		var filter = chartObject.filter;
		if(filter === "allType") {
			$(".mainItem").show();
		} else {
			$(".mainItem").hide();
			$("." + filter + "_rect").show();
		}
	}

	// event handler by availability buttons
	function filtersEventHandler(event) {
		var typeId = $(this).attr("id");
		$(".available-filter button").removeClass("filter-active");
		$("#" + typeId).addClass("filter-active");

		if(typeId === "allType") {
			$(".miniItem").show();
		} else {
			$(".miniItem").hide();
			$("." + typeId + "_rect").show();  
		}

		chartObject.filter = typeId;

		showChart(chartObject.chartSettings, chartObject.items);
	}

	// event handler by time buttons
	function timeFilterEventHandler(event) {
		var timePeriodType = $(this).attr("id");
		$(".time-filter button").removeClass("filter-active");
		$("#" + timePeriodType).addClass("filter-active");
		
		chartObject.lines = InitLinesData();
		switch(timePeriodType) {
			case "oneWeek" : 
				chartObject.timePeriod = "week";
				chartObject.items = WeekTimeData();      
				disposeChart();

				chartObject.chartSettings = initChartSettings(chartObject.items, chartObject.lines, chartObject.margin);
				createChart(chartObject.chartSettings, chartObject.items, chartObject.lines);
				break;
			case "oneDay" :    
				chartObject.timePeriod = "day";
				chartObject.items = DayTimeData();      
				disposeChart();
				
				chartObject.chartSettings = initChartSettings(chartObject.items, chartObject.lines, chartObject.margin);
				createChart(chartObject.chartSettings, chartObject.items, chartObject.lines);
				break;
			case "oneMonth" : 
				break;
		}
	}

	/* ---------- plugin methods ---------- */
	var methods = {
     init : function( options ) {
     	
     	return this.each(function() {

     		// test data by default
     		var items = DayTimeData();
     		var lines = InitLinesData();

     		// default settings
	        var defaultSettingsForPlugin = {
	             items: items,
	             lines: lines,
	             margin: {
	             	top: 20,
	             	right: 15,
	             	bottom: 15,
	             	left: 150
	             }
	         };

	         // settings for plugin
		    var settings = $.extend( {
		        items: defaultSettingsForPlugin.items,
		        lines: defaultSettingsForPlugin.lines,
		        margin: defaultSettingsForPlugin.margin
		    }, options);

		    var $this = $(this),
		    	data = $this.data('AvailabilityExplorerPlugin'),
				AvailabilityExplorerPlugin = $('<div/>', {
				        id: 'aeChart',
				        class: "chart-container"
			    	});		    	

		    // if plugin not initialize yet
	         if ( ! data ) {

	             $this.append(AvailabilityExplorerPlugin);

	         	// create dom elements
	             createDomElementsForPlugin(AvailabilityExplorerPlugin, settings);

				// prepare test data for plugin
	             chartObject.items = settings.items;
	             chartObject.lines = settings.lines;
	             chartObject.margin = settings.margin;

	             chartObject.filter = "allType";
	             chartObject.chartSettings = initChartSettings(chartObject.items, chartObject.lines, chartObject.margin);
	             createChart(chartObject.chartSettings, chartObject.items, chartObject.lines);

	            // event handlers
			    $(".available-filter button").click(filtersEventHandler);

			    $(".time-filter button").click(timeFilterEventHandler);

			    // redraw chart by resize the window
				$(window).resize(function () {
					disposeChart();
					chartObject.chartSettings = initChartSettings(chartObject.items, chartObject.lines, chartObject.margin);
					createChart(chartObject.chartSettings, chartObject.items, chartObject.lines);
				});

				$(this).data('AvailabilityExplorerPlugin', {
	               target : $this,
	               availabilityExplorerPlugin: AvailabilityExplorerPlugin
	           });
	         }

	     	}); 
     },
     destroy : function( ) {

         return this.each(function () {

             var $this = $(this),
                data = $this.data('AvailabilityExplorerPlugin');

             // AvailabilityExplorerPlugin namespace for plugin
             $(window).unbind('.AvailabilityExplorerPlugin');
             data.availabilityExplorerPlugin.remove();
             $this.removeData('AvailabilityExplorerPlugin');

         });
     }
  	};

	/* ---------- END plugin methods ---------- */


	$.fn.AvailabilityExplorerPlugin = function(method) {

        if (methods[method]) {

            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));

        } else if (typeof method === 'object' || ! method) {

            return methods.init.apply(this, arguments);

        } else {

            $.error('Method  ' + method + ' does not exist for jQuery.AvailabilityExplorerPlugin');
        }
    };

 })(jQuery);


$(document).ready(function(){
  // create chart
	$("#chartTesting").AvailabilityExplorerPlugin();

	// destroy chart
	/*
	setTimeout(function(){
		$("#chartTesting").AvailabilityExplorerPlugin("destroy");	
	}, 2000);
	*/
});
