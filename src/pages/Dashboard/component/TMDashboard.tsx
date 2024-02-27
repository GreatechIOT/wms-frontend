import React, { useEffect, useRef, useState } from 'react';
import { stackedBarChartOption } from './ChartOption';
import { Bar, getDatasetAtEvent } from 'react-chartjs-2';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import ChartDataZoom from 'chartjs-plugin-zoom';
import { Dialog } from 'primereact/dialog';

const TMDashboard = () => {
    const [barChartData, setBarChartData] = useState<any>(null);
    const [barChartOptions, setBarChartOptions] = useState<any>(null);
    const chartRef: any = useRef(null);
    const [visible, setVisible] = useState(false);
    const [label, setLabel] = useState('');
    const [value, setValue] = useState('');
    const [workweek, setWorkweek] = useState('');

    ChartJS.register(ChartDataZoom, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: [
                'WW1',
                'WW2',
                'WW3',
                'WW4',
                'WW5',
                'WW6',
                'WW7',
                'WW8',
                'WW9',
                'WW10',
                'WW11',
                'WW12',
                'WW13',
                'WW14',
                'WW15',
                'WW16',
                'WW17',
                'WW18',
                'WW19',
                'WW20',
                'WW21',
                'WW22',
                'WW23',
                'WW24',
                'WW25',
                'WW26',
                'WW27',
                'WW28',
                'WW29',
                'WW30',
                'WW31',
                'WW32',
                'WW33',
                'WW34',
                'WW35',
                'WW36',
                'WW37',
                'WW38',
                'WW39',
                'WW40',
                'WW41',
                'WW42',
                'WW43',
                'WW44',
                'WW45',
                'WW46',
                'WW47',
                'WW48',
                'WW49',
                'WW50',
                'WW51',
                'WW52'
            ],
            datasets: [
                {
                    label: 'Project',
                    backgroundColor:  'rgba(54, 162, 235, 0.8)',
                    // backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    // borderColor: documentStyle.getPropertyValue('--blue-500'),
                    data: [73, 28, 85, 100, 73, 7, 23, 79, 73, 47, 3, 76, 74, 21, 60, 17, 59, 73, 96, 12, 5, 78, 60, 48, 70, 74, 13, 79, 47, 71, 74, 94, 50, 90, 99, 44, 52, 38, 3, 74, 15, 98, 66, 80, 23, 60, 10, 33, 7, 81, 60, 23]
                },
                {
                    label: 'RFQ',
                    backgroundColor: 'rgba(255, 99, 132, 0.8)',
                    // backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                    // borderColor: documentStyle.getPropertyValue('--pink-500'),
                    data: [5, 44, 26, 29, 35, 29, 38, 31, 50, 24, 44, 32, 46, 5, 26, 47, 40, 19, 6, 7, 16, 31, 27, 27, 34, 31, 39, 34, 11, 41, 35, 37, 49, 20, 12, 16, 8, 2, 43, 5, 9, 41, 50, 6, 39, 20, 28, 21, 31, 39, 13, 36]
                },
                {
                    label: 'Available',
                    backgroundColor: 'rgba(75, 192, 192, 0.8)',
                    // backgroundColor: documentStyle.getPropertyValue('--green-500'),
                    // borderColor: documentStyle.getPropertyValue('--green-500'),
                    data: [3, 19, 3, 5, 23, 11, 20, 21, 8, 2, 13, 20, 3, 16, 6, 23, 22, 2, 17, 22, 12, 15, 19, 22, 9, 5, 25, 24, 4, 3, 6, 18, 6, 8, 4, 1, 13, 15, 7, 4, 25, 3, 19, 19, 7, 10, 14, 21, 13, 22, 12, 22]
                }
            ]
        };

        setBarChartOptions(stackedBarChartOption);
        setBarChartData(data);
    }, []);

    const handleBarClick = (event: any) => {
        console.log(getDatasetAtEvent(chartRef?.current, event));
        const chartInstance: any = chartRef.current;
        console.log(chartInstance);
        const activePoints = chartInstance.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
        if (activePoints.length) {
            const firstPoint = activePoints[0];
            const ww = chartInstance.data.labels[firstPoint.index];
            const value = chartInstance.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
            const label = chartInstance.data.datasets[firstPoint.datasetIndex].label;
            setLabel(label);
            setValue(value);
            setWorkweek(ww);
            setVisible(true);
            //alert('Left Click detected!\nlabel: ' + label + '\nvalue: ' + value + '\nWW: ' + ww);
        }
    };

    return (
        <React.Fragment>
            <Dialog header={workweek} visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <div>
                    Label: {label} &nbsp; Value: {value}
                </div>
            </Dialog>
            <div className="grid">
                <div className="col-12">
                    <div className="card">{barChartData && barChartOptions && <Bar ref={chartRef} onClick={handleBarClick} options={barChartOptions} data={barChartData} />}</div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default TMDashboard;
