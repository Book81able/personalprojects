// global visualization size variables
var width = 960;
var height = 500;

var barOn = true;
var lineOn = false;

var margin = {
    top: 20,
    right: 10,
    bottom: 50,
    left: 45
    }
var aniTime = 1000

var parseDate = d3.timeParse("%m/%d/%y")

var svg = d3
  .select("#vis-svg")
  .append("g");

var space = svg.append("g")
        .attr("width",width)
        .attr("height",height)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var ySpace = space.append("g");

var barChart,linePath,x,y,barH,barW;

var fullDataset;

var Tooltip = d3.select("#vis-svg")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

    

d3.csv("https://raw.githubusercontent.com/nychealth/coronavirus-data/master/case-hosp-death.csv").then(function(data){
  const cumulativeSum = (sum => value => sum += value)(0);
  const cumulativeSumD =  (sum => value => sum += value)(0);
  const cumulativeSumH =  (sum => value => sum += value)(0);

  let changeInLast = function(d){
    diff = d - last;
    last = d;
    return diff;
  }

  data.forEach(function(d) {
        d.DATE_OF_INTEREST = parseDate(d.DATE_OF_INTEREST);
        d.CASE_COUNT = +d.CASE_COUNT;
        d.DEATH_COUNT = +d.DEATH_COUNT;
        d.HOSPITALIZED_COUNT = +d.HOSPITALIZED_COUNT
    });

  cumultive = data.map(function(d){
    return d.CASE_COUNT
  }).map(cumulativeSum);

  cumultiveD = data.map(function(d){
    return d.DEATH_COUNT
  }).map(cumulativeSumD);

  cumultiveH = data.map(function(d){
    return d.HOSPITALIZED_COUNT
  }).map(cumulativeSumH);

  let last = 0;
  accel = data.map(function(d){
    return changeInLast(d.CASE_COUNT)
  });

  last = 0
  daccel = data.map(function(d){
    return changeInLast(d.DEATH_COUNT)
  });

  last = 0
  haccel = data.map(function(d){
    return changeInLast(d.HOSPITALIZED_COUNT)
  });

  for (var i = 0; i < data.length; i++) {
    data[i].totalcases = cumultive[i];
    data[i].totaldeaths = cumultiveD[i];
    data[i].ratecase = accel[i];
    data[i].ratedeath = daccel[i];
    data[i].totalhosp = cumultiveH[i];
    data[i].ratehosp = haccel[i];
  }

  fullDataset = data;
  console.log(data)
	drawBar("CASE_COUNT");
});


function drawBar(parameter){
	svg.data();

  	barW = width - margin.right - margin.left
  	barH = height - margin.top - margin.bottom

  	x = d3.scaleBand()
  			.range([0,barW])
  			.padding(0.1)

  	y = d3.scaleLinear()
  			.range([barH,0])

    const t = d3.transition().duration(aniTime);
  	space.transition(t);

  	x.domain(fullDataset.map(function(d){
  		return d.DATE_OF_INTEREST;
  	}));


  	y.domain([d3.min(fullDataset,d => d[parameter]),d3.max(fullDataset,d => d[parameter])]);

  	barChart = space.selectAll("rect")
  			.data(fullDataset)
  			.enter()
  			.append("rect")
  			.attr("y",function(d){
  				return barH;
  			})
  			.attr("height", function(d){
  				return 0;
  			})
  			.attr("width",x.bandwidth())
  			.attr("x",function(d){
  				return x(d.DATE_OF_INTEREST)
  			})
  			.style("fill", "lightblue");

  	barChart.transition(t)
  			.attr("height",function(d){
  				return barH - y(d[parameter]);
  			})
  			.attr("y", function(d){
  				return y(d[parameter]);
  			})

    linePath = svg.append("path")
      .datum(fullDataset)
      .attr("fill", "none")
      .attr("stroke", "grey")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.DATE_OF_INTEREST) + margin.left + x.bandwidth()/2 })
        .y(function(d) { return margin.top + y(d[parameter]) })
        )
      .style("opacity",0);

  	space.append("g")
  		.attr("transform", "translate(0," + barH + ")")
  		.call(d3.axisBottom(x).tickFormat(d3.timeFormat("%a, %b %d ")))
  		.selectAll("text")
  		.attr("dx", "-4em")
      	.attr("dy", "-.60em")
  		.attr("transform", "rotate(-90)" );

  	ySpace
      .transition(t)
  		.call(d3.axisLeft(y));
}

function updateChart(parameter){

    const t = d3.transition().duration(aniTime);
    space.transition(t);


    y.domain([d3.min(fullDataset,d => d[parameter]),d3.max(fullDataset,d => d[parameter])]);

    barChart.transition(t)
        .attr("height",function(d){
          return barH - y(d[parameter]);
        })
        .attr("y", function(d){
          return y(d[parameter]);
        })

    linePath.transition(t).attr("d",d3.line().x(function(d) { return x(d.DATE_OF_INTEREST) + margin.left + x.bandwidth()/2 })
        .y(function(d,i) { return margin.top + y(d[parameter])}));

    ySpace
      .transition(t)
      .call(d3.axisLeft(y));
}

function updateUpDown(parameter,fillColor = "lightblue"){
    const t = d3.transition().duration(aniTime);
    space.transition(t);


    y.domain([d3.min(fullDataset,d => d[parameter]),d3.max(fullDataset,d => d[parameter])]);

    barChart.transition(t)
        .attr("height",function(d){
          if(d[parameter] >= 0){
            return y(0) - y(d[parameter]);
          }else{
            return  y(d[parameter]) - y(0);
          } 
        })
        .attr("y", function(d){
          if(d[parameter] >= 0){
            return y(d[parameter]);
          }else{
            return y(0);
          }
        })
        .style("fill",function(d){
          if(d[parameter]<0){
            return fillColor;
          }else{
            return "red";
          }
        })


    ySpace
      .transition(t)
      .call(d3.axisLeft(y));
}

function toggleBar(){
  const t = d3.transition().duration(aniTime);

  if(barOn){
    barOn = false;

    barChart
    .transition(t)
    .style("opacity", 0);
  }else{
    barOn = true;
    barChart.transition(t)
    .style("opacity",1)
  }
}

function toggleLine(){
  const t = d3.transition().duration(aniTime);

  if(lineOn){
    lineOn = false;
    linePath.transition(t).style("opacity",0);
  }else{
    lineOn = true;
    linePath.transition(t).style("opacity",1);
  }
}









