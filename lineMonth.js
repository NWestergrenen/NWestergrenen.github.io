// Set the dimensions of the canvas / graph
var margin3 = {top: 30, right: 20, bottom: 30, left: 50},
    widthLS3 = 650 - margin3.left - margin3.right,
    heightLS3 = 270 - margin3.top - margin3.bottom;

var parseDate3 = d3.time.format("%M").parse;
// Set the ranges
var xLS3 = d3.time.scale().range([0, widthLS3]);
var yLS3 = d3.scale.linear().range([heightLS3, 0]);

// Define the axes
var xAxis3 = d3.svg.axis()
    .scale(xLS3)
    .orient("bottom")
    .tickFormat(d3.time.format("%M"));

// var xAxis = d3.scale.linear().domain([0, 23]).range([0, widthLS3]);

var yAxis3 = d3.svg.axis().scale(yLS3)
    .orient("left").ticks(5);

// Define the line
var line3 = d3.svg.line()
    .interpolate("monotone")
    .x(function(d) { return xLS3(d.month); })
    .y(function(d) { return yLS3(d.count); })

// Adds the svg3 canvas
var svg3 = d3.select("#lineMonth")
    .append("svg")
        .attr("width", widthLS3 + margin3.left + margin3.right)
        .attr("height", heightLS3 + margin3.top + margin3.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin3.left + "," + margin3.top + ")");

// Get the data
d3.csv("MonthsPlot.csv", function(error, data) {
    data.forEach(function(d) {
        d.month = parseDate3(d.month);
        d.count = +d.count;
    });

    // Scale the range of the data
    xLS3.domain(d3.extent(data, function(d) { return d.month; }));
    yLS3.domain([40000, d3.max(data, function(d) { return d.count; })]);


//     // Add the valueline path.
var path3 = svg3.append("path")
          .datum(data)
          .attr("class", "line")
          .style("stroke", "steelblue")
          .style("stroke-width", "3")
          .style("fill", "none")
          .attr("d", line3);

          var totalLength3 = path3.node().getTotalLength();

              path3
                .attr("stroke-dasharray", totalLength3 + " " + totalLength3)
                .attr("stroke-dashoffset", totalLength3)
                .transition()
                  .duration(3000)
                  .ease("linear")
                  .attr("stroke-dashoffset", 0);

                    // svg3.on("click", function(){
                    //   path3
                    //     .attr("stroke-dasharray", totalLength + " " + totalLength)
                    //     .attr("stroke-dashoffset", totalLength)
                    //     .transition()
                    //       .duration(3000)
                    //       .ease("linear")
                    //       .attr("stroke-dashoffset", 0);
                    //    });

    // Add the X Axis
    svg3.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + heightLS3 + ")")
        .call(xAxis3);

    // Add the Y Axis
    svg3.append("g")
        .attr("class", "y axis")
        .call(yAxis3)
        .transition()
          .duration(5000);


        svg3.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", widthLS3+10)
        .attr("y", heightLS3- 6)
        .style("font-size", "13px")
        .text("Month of year");

        svg3.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("x", widthLS3-520)
        .attr("y", -20)
        .attr("dy", ".75em")
        .style("font-size", "13px")
        .text("#Collisions");
//
});
