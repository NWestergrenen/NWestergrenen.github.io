var width = 960,
   height = 800;

var svgKM = d3.select("#KMeans").append("svg")
    .attr("width", width)
    .attr("height", height);


		var gKM = svgKM.append("g");
		var mapLayer = gKM.append('g')
		var pointsLayer = gKM.append('g')
		var centroidLayer = gKM.append('g')

var label_colors = ["(255,0,0)","(0,255,0)","(0,0,255)","(0,255,255)","(255,255,255)","(255,0,255)"]

d3.json("BoroughBoundaries.json", function(error, nycb) {
	// console.log(nycb)

var projectionKM = d3.geo.mercator()
			.center([-73.90, 40.70])
			.scale(70000)
			.translate([(width) / 2, (height)/2]);


var pathKM = d3.geo.path()
			.projection(projectionKM);

		 mapLayer.append("g")
		 .attr("id", "boroughs")
		 .selectAll(".state")
		 .data(nycb.features)
		 .enter().append("path")
		 .attr("class", function(d){ return d.properties.name; })
		 .attr("d", pathKM);


		 d3.csv('Kmeans2.csv', function(KMeans) {
			// 	console.log(data)
		 		//Draw circles
		 		  pointsLayer.selectAll("circle")
		 				.data(KMeans)
		 				.enter().append("circle")
		 				.attr("r", 2)
		 				.attr("opacity", "0.6")
		 				.attr("transform", function(d) {
		 					return "translate(" + projectionKM([
		 					d.Xe,
		 					d.Ye
		 					]) + ")";
		 	 })
		 				.attr("fill",function(d){
		 						return "rgb" + label_colors[d.labels];
		 				});


		 				})

		 				d3.csv('Centroids2.csv', function(KMeans) {

		 						//Draw circles
		 						  centroidLayer.selectAll("circle")
		 								.data(KMeans)
		 								.enter().append("circle")
		 								.attr("r", 35)
										.style("stroke", "black")
										.style("stroke-width", 2)
		 								.attr("opacity", "0.8")
		 								.attr("transform", function(d) {
		 									return "translate(" + projectionKM([
		 									d.Xc,
		 									d.Yc
		 									]) + ")";
		 					 })
		 								.attr("fill",function(d){
		 										return "rgb" + label_colors[d.labels];
		 								})

		 									});


});

function Kfunction(datastring,centroids,title){

		d3.json("BoroughBoundaries.json", function(error, nycb) {
			// console.log(nycb)

		var projectionKM = d3.geo.mercator()
					.center([-73.90, 40.70])
					.scale(70000)
					.translate([(width) / 2, (height)/2]);


		var pathKM = d3.geo.path()
					.projection(projectionKM);



				 mapLayer.append("path") //ændret g til path
				 .attr("id", "boroughs")
				 .selectAll(".state")
				 .data(nycb.features)
				 .enter().append("path")
				 .attr("class", function(d){ return d.properties.name; })
				 .attr("d", pathKM);



		d3.csv(datastring, function(KMeans) {
// console.log(data)
				//Draw circles
				  pointsLayer.selectAll("circle")
						.data(KMeans)
						.transition()
						.duration(1000)
						.attr("r", 2)
						.attr("opacity", ".6")
						.attr("transform", function(d) {
							return "translate(" + projectionKM([
							d.Xe,
							d.Ye
							]) + ")";
			 })
						.attr("fill",function(d){
								return "rgb" + label_colors[d.labels];
						});
						})

						d3.csv(centroids, function(KMeans) {
							// console.log(data)
								//Draw circles
								  centroidLayer.selectAll("circle")
										.data(KMeans)
										.transition()
										.duration(1000)
										.attr("r", 35)
										.attr("opacity", "0.8")
										.attr("transform", function(d) {
											return "translate(" + projectionKM([
											d.Xc,
											d.Yc
											]) + ")";
							 })
										.attr("fill",function(d){
												return "rgb" + label_colors[d.labels];
										});
			})
   });
		};
