/* window.Apex = {
chart: {
    foreColor: '#fff',
    toolbar: {
        show: false
        },
},
colors: ['#FCCF31', '#17ead9', '#f02fc2'],
stroke: {
width: 3
},
dataLabels: {
    enabled: false
},
grid: {
    borderColor: "#40475D",
},
xaxis: {
    axisTicks: {
        color: '#333'
},
axisBorder: {
    color: "#333"
}
},
fill: {
    type: 'gradient',
    gradient: {
        gradientToColors: ['#F55555', '#6078ea', '#6094ea']
},
},
tooltip: {
    theme: 'dark',
    x: {
        formatter: function (val) {
        return moment(new Date(val)).format("HH:mm:ss")
        }
    }
},
yaxis: {
    decimalsInFloat: 2,
    opposite: true,
    labels: {
        offsetX: -10
}
}
}; */

var trigoStrength = 2
var iteration = 11

function getRandom() {
var i = iteration;
    return (Math.sin(i / trigoStrength) * (i / trigoStrength) + i / trigoStrength + 1) * (trigoStrength * 2)
}

function getRangeRandom(yrange) {
    return Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.minbaseval
}


function generateMinuteWiseTimeSeries(baseval, count, yrange) {
var i = 0;
var series = [];
    while (i < count) {
    var x = baseval;
    var y = ((Math.sin(i / trigoStrength) * (i / trigoStrength) + i / trigoStrength + 1) * (trigoStrength * 2))

    series.push([x, y]);
    baseval += 300000;
    i++;
    }
    return series;
}


function getNewData(baseval, yrange) {
    var newTime = baseval + 300000;
        return {
        x: newTime,
        y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
        }
}

var optionsLine = {
chart: {
height: 350,
type: 'line',
stacked: true,
animations: {
    enabled: true,
    easing: 'linear',
    dynamicAnimation: {
    enabled: true,
    speed: 1000
    }
},
dropShadow: {
    enabled: true,
    opacity: 0.3,
    blur: 5,
    left: -7,
    top: 22
},
events: {
    animationEnd: function (chartCtx, opts) {
    const newData1 = chartCtx.w.config.series[0].data.slice()
    newData1.shift()
    const newData2 = chartCtx.w.config.series[1].data.slice()
    newData2.shift()

    // check animation end event for just 1 series to avoid multiple updates
    if (opts.el.node.getAttribute('index') === '0') {
        window.setTimeout(function () {
        chartCtx.updateOptions({
            series: [{
            data: newData1
            }, {
            data: newData2
            }],
            subtitle: {
            text: parseInt(getRandom() * Math.random()).toString(),
            }
        }, false, false)
        }, 300)
    }

    }
},
toolbar: {
    show: false
},
zoom: {
    enabled: false
}
},
dataLabels: {
    enabled: true
},
stroke: {
    curve: 'straight',
    width: 5,
},
grid: {
    padding: {
        left: 0,
        right: 0
    }
},
markers: {
    size: 0,
    hover: {
        size: 0
    }
},
series: [{
    name: 'Trmperture',
    data: generateMinuteWiseTimeSeries(new Date().getTime(), 12, {
        min: 30,
        max: 110
    })
}, {
    name: 'Water',
    data: generateMinuteWiseTimeSeries(new Date().getTime(), 12, {
        min: 30,
        max: 110
    })
}],
xaxis: {
    type: 'datetime',
    range: 2700000
},
title: {
    text: 'Processes',
    align: 'left',
    style: {
        fontSize: '12px'
    }
},
subtitle: {
    text: '20',
    floating: true,
    align: 'right',
    offsetY: 0,
    style: {
        fontSize: '22px'
    }
},
legend: {
    show: true,
    floating: true,
    horizontalAlign: 'left',
    onItemClick: {
        toggleDataSeries: false
    },
    position: 'top',
    offsetY: -28,
    offsetX: 60
},
}

var chartLine = new ApexCharts(
document.querySelector("#linechart"),
optionsLine
);
chartLine.render()


window.setInterval(function () {

iteration++;

chartLine.updateSeries([{
data: [...chartLine.w.config.series[0].data,
    [
    chartLine.w.globals.maxX + 300000,
    getRandom()//value
    ]
]
}, {
data: [...chartLine.w.config.series[1].data,
    [
    chartLine.w.globals.maxX + 300000,
    getRandom()
    ]
]
}])
}, 3000);


/* -------------------------------------------------------- */

/* window.Apex = {
    chart: {
        foreColor: '#fff',
        toolbar: {
            show: false
        },
    },
    colors: ['#FCCF31', '#17ead9', '#f02fc2'],
    stroke: {
        width: 3
    },
    dataLabels: {
        enabled: false
    },
    grid: {
        borderColor: "#40475D",
    },
    xaxis: {
        axisTicks: {
            color: '#333'
        },
        axisBorder: {
            color: "#333"
        }
    },
    fill: {
        type: 'gradient',
        gradient: {
            gradientToColors: ['#F55555', '#6078ea', '#6094ea']
        },
    },
    tooltip: {
        theme: 'dark',
        x: {
            formatter: function (val) {
                return moment(new Date(val)).format("HH:mm:ss")
            }
        }
    },
    yaxis: {
        decimalsInFloat: 2,
        opposite: true,
        labels: {
            offsetX: -10
        }
    }
}; */

/* var trigoStrength = 3
var iteration = 11

function getRandom() {
    var i = iteration;
    return (Math.sin(i / trigoStrength) * (i / trigoStrength) + i / trigoStrength + 1) * (trigoStrength * 2)
}

function getRangeRandom(yrange) {
    return Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
}

function generateMinuteWiseTimeSeries(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
        var x = baseval;
        var y = ((Math.sin(i / trigoStrength) * (i / trigoStrength) + i / trigoStrength + 1) * (trigoStrength * 2))

        series.push([x, y]);
        baseval += 300000;
        i++;
    }
    return series;
}



var optionsCircle = {
    chart: {
        type: 'radialBar',
        height: 320,
        offsetY: -30,
        offsetX: 20
    },
    plotOptions: {
        radialBar: {
            size: undefined,
            inverseOrder: false,
            hollow: {
                margin: 5,
                size: '48%',
                background: 'transparent',
            },
            track: {
                show: true,
                background: '#40475D',
                strokeWidth: '10%',
                opacity: 1,
                margin: 3, // margin is in pixels
            },


        },
    },
    series: [71, 63],
    labels: ['Device 1', 'Device 2'],
    legend: {
        show: true,
        position: 'left',
        offsetX: -30,
        offsetY: 10,
        formatter: function (val, opts) {
            return val + " - " + opts.w.globals.series[opts.seriesIndex] + '%'
        }
    },
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
        }
    }
}

var chartCircle = new ApexCharts(document.querySelector('#circlechart'), optionsCircle);
chartCircle.render();



window.setInterval(function () {

    chartCircle.updateSeries([

        getRangeRandom({ min: 0, max: 60 }), 
        getRangeRandom({ min: 0, max: 60 })
        

    ])
}, 3000);
 */