var width = 960,
   height = 800;


   //Dynamic, random dataset
   var datasetTF = [];											//Initialize empty array
   d3.csv("TopFacts_ForPlotting.csv", function(error, data03) {
    //  console.log(data03);
     datasetTF=data03;
     data03.forEach(function(d) {
       d.facts01 = +d.facts;
       d.Longitude01 = +d.longitude;
       d.Latitude01 = +d.latitude;
    });

var svg = d3.select("#FunFacts").append("svg")
    .attr("width", width)
    .attr("height", height);

  d3.json("BoroughBoundaries.json", function(error, nyb) {

  	// console.log(nyb)

    var projection = d3.geo.mercator()
  					.center([-73.90, 40.70])
  					.scale(70000)
  					.translate([(width) / 2, (height)/2]);

	var path = d3.geo.path()
			.projection(projection);

  var farve = function(d){
          if(d.facts == "Alcohol Involvement"){
              return d3.rgb("#FF0000"); //Rød
          }else if(d.facts == "Prescription Medication"){
              return d3.rgb("#820AC3"); //Lilla
          }
          // else if(d.facts == "Lost Consciousness"){
          //     return d3.rgb(); //Grøn
          // }
          else if(d.facts == "Drugs (Illegal)"){
              return d3.rgb("#00DB00"); //Grøn
          }
          else if(d.facts == "Fell Asleep"){
              return d3.rgb("#FF7400"); //Orange
          }
          else if(d.facts == "Aggressive Driving/Road Rage"){
              return d3.rgb("#FFFF00"); //Gul
          }
          else if(d.facts == "Animals Action"){
              return d3.rgb("#DB007C"); //Pink
          }
          }
// Alcohol, Prescription, Drugs, Fell asleep, aggressive, animals
  function colores(n) {
    var colores_g = ["#FF0000", "#820AC3", "#00DB00", "#FF7400", "#FFFF00", "#DB007C"];
    return colores_g[n % colores_g.length];
  }
	var g = svg.append("g");


	g.append("g")
		.attr("id", "boroughs")
		.selectAll(".state")
		.data(nyb.features)
		.enter().append("path")
		.attr("class", function(d){ return d.properties.name; })
		.attr("d", path);

    // Nest the entries by symbol
  var dataNest = d3.nest()
      .key(function(d) {return d.facts;})
      .entries(datasetTF);

var color = d3.scale.category10();

  // Loop through each symbol / key
  dataNest.forEach(function(d, i) {

    svg.selectAll(".pin")
     .data(datasetTF)
     .enter().append("circle", ".pin")
     .attr("r", 2)
    .attr("fill", farve)
     .attr("opacity", ".6")
     .attr("transform", function(d) {
       return "translate(" + projection([
         d.Longitude01,
         d.Latitude01
       ]) + ")";
     });

     // Add legend
    legend = svg.append("text")
     	.attr("x", width - 200)
      .attr("y", i * 20 + 30)
     	.attr("class", "legend")
      .attr("fill", function(a,b) { return colores(i); } ) //Gul skrift på hvid baggrund er dårligt
      // .attr("transform","translate(-50,30)")
     	.text(d.key);

  });

	});
	});
