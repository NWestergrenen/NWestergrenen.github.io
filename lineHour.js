// Set the dimensions of the canvas / graph
var margin2 = {top2: 30, right2: 20, bottom2: 30, left2: 50},
    widthLS2 = 650 - margin2.left2 - margin2.right2,
    heightLS2 = 270 - margin2.top2 - margin2.bottom2;

var parseDateLS2 = d3.time.format("%H").parse;
// Set the ranges
var xLS2 = d3.time.scale().range([0, widthLS2]);
var yLS2 = d3.scale.linear().range([heightLS2, 0]);

// Define the axes
var xAxisLS2 = d3.svg.axis()
    .scale(xLS2)
    .orient("bottom2")
    .tickFormat(d3.time.format("%H"));

// var xAxisLS2 = d3.scale.linear().domain([0, 23]).range([0, widthLS2]);

var yAxisLS2 = d3.svg.axis().scale(yLS2)
    .orient("left").ticks(5);

// Define the line
var line = d3.svg.line()
    .interpolate("monotone")
    .x(function(d) { return xLS2(d.hour); })
    .y(function(d) { return yLS2(d.count01); })

// Adds the svg canvas
var svgLS2 = d3.select("#LineHour")
    .append("svg")
        .attr("width", widthLS2 + margin2.left2 + margin2.right2)
        .attr("height", heightLS2 + margin2.top2 + margin2.bottom2)
    .append("g")
        .attr("transform",
              "translate(" + margin2.left2 + "," + margin2.top2 + ")");

// Get the data
d3.csv("HourPlot.csv", function(error, dataLS2) {
    dataLS2.forEach(function(d) {
        d.hour = parseDateLS2(d.hour);
        d.count01 = +d.count;
    });

    // Scale the range of the dataLS2
    xLS2.domain(d3.extent(dataLS2, function(d) { return d.hour; }));
    yLS2.domain([0, d3.max(dataLS2, function(d) { return d.count01; })]);


//     // Add the valueline path.
var pathLS2 = svgLS2.append("path")
          .datum(dataLS2)
          .attr("class", "line")
          .style("stroke", "steelblue")
          .style("stroke-width", "3")
          .style("fill", "none")
          .attr("d", line);

          var totalLengthLS2 = pathLS2.node().getTotalLength();

              pathLS2
                .attr("stroke-dasharray", totalLengthLS2 + " " + totalLengthLS2)
                .attr("stroke-dashoffset", totalLengthLS2)
                .transition()
                  .duration(3000)
                  .ease("linear")
                  .attr("stroke-dashoffset", 0);

                    // svgLS2.on("click", function(){
                    //   pathLS2
                    //     .attr("stroke-dasharray", totalLengthLS2 + " " + totalLengthLS2)
                    //     .attr("stroke-dashoffset", totalLengthLS2)
                    //     .transition()
                    //       .duration(3000)
                    //       .ease("linear")
                    //       .attr("stroke-dashoffset", 0);
                    //    });


    // Add the X Axis
    svgLS2.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + heightLS2 + ")")
        .call(xAxisLS2);

    // Add the Y Axis
    svgLS2.append("g")
        .attr("class", "y axis")
        .call(yAxisLS2)
        .transition()
          .duration(5000);


        svgLS2.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", widthLS2+10)
        .attr("y", heightLS2 - 6)
        .style("font-size", "13px")
        .text("Time of day (Hours)");

        svgLS2.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("x", widthLS2-520)
        .attr("y", -20)
        .attr("dy", ".75em")
        .style("font-size", "13px")
        .text("#Collisions");
//
});
