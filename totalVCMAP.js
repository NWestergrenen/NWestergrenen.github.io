var width1 = 960,
   height1 = 800;

   //Dynamic, random dataset
   var dataset03 = [];											//Initialize empty array
   d3.csv("VC_location_data.csv", function(error, data03) {
     console.log(data03);
     dataset03=data03;
     data03.forEach(function(d) {
       d.Longitude01 = +d.longitude;
       d.Latitude01 = +d.latitude;

   });

var svg = d3.select("#VCtotal").append("svg")
    .attr("width1", width1)
    .attr("height1", height1);

  d3.json("BoroughBoundaries.json", function(error, nyb) {

  	console.log(nyb)

    var projection = d3.geo.mercator()
  					.center([-73.90, 40.70])
  					.scale(70000)
  					.translate([(width1) / 2, (height1)/2]);

	var path = d3.geo.path()
			.projection(projection);

	var g = svg.append("g");

	g.append("g")
		.attr("id", "boroughs")
		.selectAll(".state")
		.data(nyb.features)
		.enter().append("path")
		.attr("class", function(d){ return d.properties.name; })
		.attr("d", path);

    svg.selectAll(".pin")
     .data(dataset03)
     .enter().append("circle", ".pin")
     .attr("r", 1)
     .attr("fill", function(d) {
      return d3.rgb("#FF7400");
     })
     .attr("opacity", ".6")
     .attr("transform", function(d) {
       return "translate(" + projection([
         d.Longitude01,
         d.Latitude01
       ]) + ")";
     });

	});
	});
