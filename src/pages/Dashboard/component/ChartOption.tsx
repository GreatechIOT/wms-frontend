import moment from 'moment';

const documentStyle = getComputedStyle(document.documentElement);
const textColor = documentStyle.getPropertyValue('--text-color');
const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

export const stackedBarChartOption = () => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const
            },
            title: {
                display: true,
                text: 'Weekly Manpower Overview: Available vs Unavailable Resources in Greatech'
            },
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'x'
                }
            }
        }
    };
    // const options = {
    //     plugins: {
    //         title: {
    //             display: true,
    //             text: 'Weekly Manpower Overview: Available vs Unavailable Resources in Greatech'
    //         }
    //     },
    //     responsive: true,
    //     scales: {
    //         x: {
    //             stacked: true
    //         },
    //         y: {
    //             stacked: true
    //         }
    //     }
    // };
    return options;
};

export const heatMapOption = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    const options = {
        chart: {
            height: 'auto',
            type: 'heatmap',
            events: {
                // click: function (event, chartContext, config) {
                //   console.log(chartContext);
                // var el = event.target;
                // var seriesIndex = parseInt(el.getAttribute("i"));
                // var dataPointIndex = parseInt(el.getAttribute("j"));

                // var seriesName = config.globals.seriesNames[seriesIndex];
                // // var xAxisLabels =
                // //   config.xaxis && config.xaxis.categories
                // //     ? config.xaxis.categories
                // //     : [];
                // // // var xAxisLabel = xAxisLabels[dataPointIndex];

                // // console.log(el);
                // console.log(seriesIndex);
                // console.log(series[seriesIndex]);
                // console.log(seriesName);
                // console.log(dataPointIndex);
                // console.log(xAxisLabels);

                // },
                click: function (event: any, chartContext: any, config: any) {
                    var el = event.target;
                    var seriesIndex = parseInt(el.getAttribute('i'));
                    var dataPointIndex = parseInt(el.getAttribute('j'));

                    var seriesName = config.globals.seriesNames[seriesIndex];
                    if (el.tagName === 'tspan' && el.id && el.id.includes('SvgjsTspan')) {
                        alert('This username: ' + el.textContent);
                    }
                    console.log(el, seriesIndex, dataPointIndex, seriesName);
                    console.log(seriesIndex);
                }
            },
            animations: {
                enabled: false
            },
            toolbar:{
                show: false
            }
            
        },

        toolbar: {
            tools: {
                show: false,
                download: {
                    csv: false, // Set csv to false to disable CSV download
                    svg: true,
                    png: true
                },
                selection: true,
                zoom: true,
                zoomin: true,
                zoomout: true,
                pan: true,
                reset: true,
                customIcons: [] // You can add custom icons if needed
            },
            autoSelected: 'zoom' // Auto-select zoom tool on load if needed
        },
        plotOptions: {
            heatmap: {
                enableShades: false,
                // shadeIntensity: 5.0,
                // reverseNegativeShade: true,
                // radius: 5,
                // distributed: false,
                colorScale: {
                    ranges: [
                        {
                            from: 0,
                            to: 0,
                            color: '#6895D2',
                            // Set your desired color for 0
                            name: 'Available'
                        },
                        {
                            from: 1,
                            to: 1, // Assuming your data goes up to 31
                            color: '#D04848',
                            //color: '#F8C146', // Set your desired color for non-zero values
                            name: 'Project'
                        },
                        {
                            from: 2,
                            to: 2, // Assuming your data goes up to 31
                            color: '#F3B95F', // Set your desired color for non-zero values
                            name: 'RFQ'
                        }
                    ]
                }
            }
        },
        dataLabels: {
            enabled: false,
            enabledOnSeries: undefined,
            formatter: function (val: any, opts: any) {
                if (val === 0) {
                    return 'A';
                } else if (val === 1) {
                    return 'P';
                } else {
                    return 'R';
                }
            }
        },
        tooltip: {
            custom: function ({ seriesIndex, dataPointIndex, w }: { seriesIndex: number; dataPointIndex: number; w: any }) {
                let category;
                if (w.globals.series[seriesIndex][dataPointIndex] === 0) {
                    category = 'Available';
                } else if (w.globals.series[seriesIndex][dataPointIndex] === 1) {
                    category = 'Project';
                } else {
                    category = 'RFQ';
                }
                return (
                    '<div class="tooltip"  style=" padding: 10px;">' +
                    '<span>Name: ' +
                    w.globals.seriesNames[seriesIndex]?.split('@')[0] +
                    '</span><br>' +
                    '<span>Category: ' +
                    category +
                    // value
                    '</span>' +
                    '</span><br>' +
                    '<span>Week:  ' +
                    w.globals.labels[dataPointIndex]
                );
            }
        },

        yaxis: {
            max: 100,
            reversed: true,
            labels: {
                show: true,
                maxWidth: 150,
                mixWidth: 150,
                align: 'right',

                formatter: (value: string) => {
                    if (value) {
                        if (typeof value === 'string') {
                            const name = value.split('@');
                            return name[0];
                        }
                    }
                }
            }
        }
    };

    return options;
};
