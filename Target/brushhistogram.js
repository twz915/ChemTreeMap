// Brushing based histogram display
// Adapted from Mike Bostock's example

var result;

var plotHist = (function(){

  var margin = {top: 5, right: 15, bottom: 30, left: 50},
      width = 400 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

  var svg = d3.select(".stat").append("div")
      .classed("histogram", true)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  return function(values){
    var x = d3.scale.linear()
        .domain([0, d3.max(values)])
        .range([0, width]);

    // Generate a histogram using twenty uniformly-spaced bins.
    var data = d3.layout.histogram()
        .bins(x.ticks(20))
        (values);

    var y = d3.scale.linear()
        .domain([0, d3.max(data, function(d) { return d.y; })])
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var bar = svg.selectAll(".bar")
        .data(data)
      .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

    bar.exit().remove();

    result = bar;
    bar.select("rect")
        .attr("x", 1)
        .attr("width", x(data[0].dx) - 1)
        .attr("height", function(d) { return height - y(d.y); });

    svg.select("g.xaxis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.select("g.yaxis")
        .call(yAxis);
  }
})()

$(function() {
  $( "button[class=hist]" )
    .button()
    .click(function( event ) {
      var values = d3.range(1000).map(d3.random.bates(10));
      plotHist(values);
    });
});
