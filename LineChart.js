// Set the dimensions of the canvas / graph
var margin1 = {top1: 30, right1: 20, bottom1: 70, left1: 50},
    widthls1 = 650 - margin1.left1 - margin1.right1,
    heightls1 = 300 - margin1.top1 - margin1.bottom1;

// Parse the date / time
var parseDate = d3.time.format("%b-%y").parse;

// Set the ranges
var x = d3.time.scale().range([0, widthls1]);
var y = d3.scale.linear().range([heightls1, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

// Define the line
var priceline = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.collisions); });

// Adds the svgLS1LS1 canvas
var svgLS1 = d3.select("#LineChart")
    .append("svg")
        .attr("width", widthls1 + margin1.left1 + margin1.right1)
        .attr("height", heightls1 + margin1.top1 + margin1.bottom1)
    .append("g")
        .attr("transform",
              "translate(" + margin1.left1 + "," + margin1.top1 + ")");

// Get the data
d3.csv("linechart.csv", function(error, data) {
    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.collisions = +d.collisions;
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.collisions; })]);

    // Nest the entries by symbol
  var dataNest = d3.nest()
      .key(function(d) {return d.borough;})
      .entries(data);

var color = d3.scale.category10();


legendSpace = widthls1/dataNest.length;
  // Loop through each symbol / key
  dataNest.forEach(function(d, i) {


    // Add the valueline path.
var path = svgLS1.append("path")
             .attr("class", "line")
             .style("stroke", function() {
                 return d.color = color(d.key); })
             .style("stroke-width", "3")
             .style("fill", "none")
             .attr("id", 'tag'+d.key.replace(/\s+/g, '')) // assign ID **
             .attr("d", priceline(d.values));

             var totalLength = path.node().getTotalLength();

                 path
                   .attr("stroke-dasharray", totalLength + " " + totalLength)
                   .attr("stroke-dashoffset", totalLength)
                   .transition()
                     .duration(4000)
                     .ease("linear")
                     .attr("stroke-dashoffset", 0);





         // Add the Legend
         svgLS1.append("text")
             .attr("x", (legendSpace/2)-50+i*legendSpace)
             .attr("y", heightls1 + (margin1.bottom1/2)+ 5)
             .attr("class", "legend")
             .style("fill", function() {
                 return d.color = color(d.key); })
             .on("click", function(){                     // ************
                 // Determine if current line is visible
                 var active   = d.active ? false : true,  // ************
                 newOpacity = active ? 0 : 1;             // ************
                 // Hide or show the elements based on the ID
                 d3.select("#tag"+d.key.replace(/\s+/g, '')) // *********
                     .transition().duration(100)          // ************
                     .style("opacity", newOpacity);       // ************
                 // Update whether or not the elements are active
                 d.active = active;                       // ************
                 })                                       // ************
             .text(d.key);


});
    // Add the X Axis
    svgLS1.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + heightls1 + ")")
        .call(xAxis);

    // Add the Y Axis
    svgLS1.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    svgLS1.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", widthls1+10)
    .attr("y", heightls1 - 6)
    .style("font-size", "13px")
    .text("Year");

    svgLS1.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", widthls1+10)
    .attr("y", heightls1 + 18)
    .style("font-size", "11px")
    .text("2016");

    svgLS1.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", widthls1-550)
    .attr("y", heightls1 + 18)
    .style("font-size", "11px")
    .text("Jul, 2012");

    svgLS1.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("x", widthls1-520)
    .attr("y", -20)
    .attr("dy", ".75em")
    .style("font-size", "13px")
    .text("#Collisions");




});
