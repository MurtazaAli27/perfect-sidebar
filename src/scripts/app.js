// chart colors
var colors = ["#4e67eb", "#56c596", "#f1f2f9", "#c3e6cb", "#dc3545", "#f8d90f"];
// large line chart
var chartData = {
	labels: ["S", "M", "T", "W", "T", "F", "S"],
	datasets: [
		{
			data: [589, 445, 483, 503, 689, 692, 634],
			backgroundColor: "transparent",
			borderColor: colors[0],
			borderWidth: 4,
			pointBackgroundColor: colors[0],
		},
		{
			data: [639, 465, 493, 478, 589, 632, 674],
			backgroundColor: "transparent",
			borderColor: colors[1],
			borderWidth: 4,
			pointBackgroundColor: colors[1],
		},
	],
};
// 3 donut charts
var donutOptions = {
	cutoutPercentage: 85,
	legend: { position: "bottom", padding: 5, labels: { pointStyle: "circle", usePointStyle: true } },
};
// donut 1
var chDonutData1 = {
	labels: ["Bootstrap", "Popper", "Other"],
	datasets: [
		{
			backgroundColor: colors.slice(0, 3),
			borderWidth: 0,
			data: [74, 11, 40],
		},
	],
};
// donut 2
var chDonutData2 = {
	labels: ["Transferred", "Cancelled", "Processing"],
	datasets: [
		{
			backgroundColor: ["#56c596", "#dc3545", "#f8d90f"],
			borderWidth: 0,
			data: [55, 15, 30],
		},
	],
};
$(function () {
	//Navbar Active Class Adder
	$(".side-navbar-nav").on("click", "li", function () {
		$(".side-navbar-nav li.active").removeClass("active");
		$(this).addClass("active");
	});
	//Sidebar Toggler
	$(document).on("click", ".side-navbar-toggler", function () {
		$(".side").toggleClass("collapsed");
	});
	//If toggler is clicked and then window is resized then remove collapsed class
	$(window).resize(function () {
		if ($(".side").css("position") == "sticky") {
			$(".side").removeClass("collapsed");
		}
	});

	// large line chart
	var chLine = document.getElementById("chLine");
	if (chLine) {
		new Chart(chLine, {
			type: "line",
			data: chartData,
			options: {
				scales: {
					xAxes: [
						{
							ticks: {
								beginAtZero: false,
							},
						},
					],
				},
				legend: {
					display: false,
				},
				responsive: true,
			},
		});
	}
	// bar chart
	var chBar = document.getElementById("chBar");
	if (chBar) {
		new Chart(chBar, {
			type: "bar",
			data: {
				labels: ["S", "M", "T", "W", "T", "F", "S"],
				datasets: [
					{
						data: [589, 445, 483, 503, 689, 692, 634],
						backgroundColor: colors[0],
					},
					{
						data: [639, 465, 493, 478, 589, 632, 674],
						backgroundColor: colors[1],
					},
				],
			},
			options: {
				legend: {
					display: false,
				},
				scales: {
					xAxes: [
						{
							barPercentage: 0.4,
							categoryPercentage: 0.5,
						},
					],
				},
			},
		});
	}
	// donut 1
	var chDonut1 = document.getElementById("chDonut1");
	if (chDonut1) {
		new Chart(chDonut1, {
			type: "pie",
			data: chDonutData1,
			options: donutOptions,
		});
	}
	// donut 2
	var chDonut2 = document.getElementById("chDonut2");
	if (chDonut2) {
		new Chart(chDonut2, {
			type: "pie",
			data: chDonutData2,
			options: donutOptions,
		});
	}
});
