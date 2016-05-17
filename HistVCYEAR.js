//Width and height
var w = 800;
var h = 250;

//Load data
d3.csv("HistDataBorYear.csv", function(error, data03) { //
  // console.log(data03);
  datasethist=data03;
  data03.forEach(function(d) {
    d.Borough01 = +d.Borough;
    d.CollisionCount01 = +d.CollisionCount;

});

d3.csv("HistDataNormalized.csv", function(error, data115) {
  // console.log(data115);
  datasethistnorm=data115;
  data115.forEach(function(d) {
    d.Borough02 = +d.Borough;
    d.CollisionCount02 = +d.CollisionCount;

});


var xScale03 = d3.scale.ordinal()
        .domain(d3.range(datasethist.length))
        .rangeRoundBands([0, w], 0.05);
var yScale03 = d3.scale.linear()
        .domain([0, d3.max(datasethist, function(d) { return d.CollisionCount01; })])
        .range([0, h]);


var xScale15 = d3.scale.ordinal()
        .domain(d3.range(datasethistnorm.length))
        .rangeRoundBands([0, w], 0.05);
var yScale15 = d3.scale.linear()
        .domain([0, d3.max(datasethistnorm, function(d) { return d.CollisionCount02; })])
        .range([0, h]);

//Create SVG element
var svg = d3.select("#histVC")
      .append("svg")
      .attr("width", w)
      .attr("height", h+50);

      // D3 Axis - renders a d3 scale in SVG
var xAxis = d3.svg.axis()
    .scale(d3.scale.ordinal()
    .domain(["Brooklyn", "Manhattan", "Queens", "Bronx", "Staten Island"])
    .rangeRoundBands([0, w], 0.05))
    .orient("bottom")
    .ticks(10);

//Create bars
svg.selectAll("rect")
   .data(datasethist)
   .enter()
   .append("rect")
   .attr("x", function(d, i) {
      return xScale03(i);
   })
   .attr("y", function(d) {
      return h - yScale03(d.CollisionCount01);
   })
   .attr("width", xScale03.rangeBand())
   .attr("height", function(d) {
      return yScale03(d.CollisionCount01);
   })
   .attr("fill", function(d) {
    return "steelblue";
   });
//Create labels
svg.selectAll("text")
   .data(datasethist)
   .enter()
   .append("text")
   .text(function(d) {
      return d.CollisionCount01;
   })
   .attr("text-anchor", "middle")
   .attr("x", function(d, i) {
      return xScale03(i) + xScale03.rangeBand() / 2;
   })
   .attr("y", function(d) {
      return h - yScale03(d.CollisionCount01) + 14;
   })
   .attr("font-family", "sans-serif")
   .attr("font-size", "11px")
   .attr("fill", "black");

   //Create X axis
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (h) + ")")
    .call(xAxis);



   d3.selectAll("#p1")
    .on("click", function() {
      //See which p was clicked


      //Update scale domains
      xScale03.domain(d3.range(datasethist.length));
      yScale03.domain([0, d3.max(datasethist, function(d) { return d.CollisionCount01; })]);

      //Select…
      var bars03 = svg.selectAll("rect")
        .data(datasethist);

      //Enter…
      bars03.enter()
        .append("rect")
        .attr("x", w)
        .attr("y", function(d) {
          return h - yScale03(d.CollisionCount01);
        })
        .attr("width", xScale03.rangeBand())
        .attr("height", function(d) {
          return yScale03(d.CollisionCount01);
        })
        .attr("fill", function(d) {
          return "steelblue";
        });

      //Update…
      bars03.transition()
        .duration(500)
        .attr("x", function(d, i) {
          return xScale03(i);
        })
        .attr("y", function(d) {
          return h - yScale03(d.CollisionCount01);
        })
        .attr("width", xScale03.rangeBand())
        .attr("height", function(d) {
          return yScale03(d.CollisionCount01);
        })
        .attr("fill", function(d) {
          return "steelblue";
        });

      //Update all labels

      //Select…
      var labels03 = svg.selectAll("text")
        .data(datasethist);

      //Enter…
      labels03.enter()
        .append("text")
        .text(function(d) {
          return d.CollisionCount01;
        })
        .attr("text-anchor", "middle")
        .attr("x", w)
        .attr("y", function(d) {
          return h - yScale03(d.CollisionCount01) + 13;
        })
         .attr("font-family", "sans-serif")
         .attr("font-size", "11px")
         .attr("fill", "black");
      //Update…
      labels03.transition()
        .duration(500)
        .text(function(d) {
          return d.CollisionCount01;
        })
        .attr("text-anchor", "middle")
        .attr("x", function(d, i) {
          return xScale03(i) + xScale03.rangeBand() / 2;
        })
        .attr("y", function(d) {
           return h - yScale03(d.CollisionCount01) + 13;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "black");

        });

d3.selectAll("#p2")
.on("click", function(){
//See which p was clicked


//Update scale domains
xScale15.domain(d3.range(datasethistnorm.length));
yScale15.domain([0, d3.max(datasethistnorm, function(d) { return d.CollisionCount02; })]);
//Select…
var bars15 = svg.selectAll("rect")
  .data(datasethistnorm);

//Enter…
bars15.enter()
  .append("rect")
  .attr("x", w)
  .attr("y", function(d) {
    return h - yScale15(d.CollisionCount02);
  })
  .attr("width", xScale15.rangeBand())
  .attr("height", function(d) {
    return yScale15(d.CollisionCount02);
  })
  .attr("fill", function(d) {
    return "black";
  });

//Update…
bars15.transition()
  .duration(500)
  .attr("x", function(d, i) {
    return xScale15(i);
  })
  .attr("y", function(d) {
    return h - yScale15(d.CollisionCount02);
  })
  .attr("width", xScale15.rangeBand())
  .attr("height", function(d) {
    return yScale15(d.CollisionCount02);
  })
  .attr("fill", function(d) {
    return "rgb(25,125,75)";
  });

//Update all labels

//Select…
var labels15 = svg.selectAll("text")
  .data(datasethistnorm);

//Enter…
labels15.enter()
  .append("text")
  .text(function(d) {
    return d.CollisionCount02;
  })
  .attr("text-anchor", "middle")
  .attr("x", w)
  .attr("y", function(d) {
    return h - yScale15(d.CollisionCount02) + 13;
  })
   .attr("font-family", "sans-serif")
   .attr("font-size", "11px")
   .attr("fill", "black");
//Update…
labels15.transition()
  .duration(500)
  .text(function(d) {
    return d.CollisionCount02;
  })
  .attr("text-anchor", "middle")
  .attr("x", function(d, i) {
    return xScale15(i) + xScale15.rangeBand() / 2;
  })
  .attr("y", function(d) {
     return h - yScale15(d.CollisionCount02) + 13;
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr("fill", "black");

  });


});
});
