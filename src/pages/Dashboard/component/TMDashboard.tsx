import React, { useEffect, useRef, useState } from 'react';
import { stackedBarChartOption } from './ChartOption';
import { Bar, getDatasetAtEvent } from 'react-chartjs-2';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import ChartDataZoom from 'chartjs-plugin-zoom';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { Nullable } from 'primereact/ts-helpers';
import TimelineService from 'services/TimelineService';
import { callApi } from 'utilities/Function/CallAPI';
import { useNavigate } from 'react-router-dom';
import { showErrorToast } from 'utilities/Function/CustomToast';
import moment from 'moment';
import LoadingAnimation from '../../../assets/lottie/loading.json';

import { Player } from '@lottiefiles/react-lottie-player';
const TMDashboard = () => {
    const [barChartData, setBarChartData] = useState<any>(null);
    const [barChartOptions, setBarChartOptions] = useState<any>(null);
    const chartRef: any = useRef(null);
    const [visible, setVisible] = useState(false);
    const [label, setLabel] = useState('');
    const [value, setValue] = useState('');
    const [workweek, setWorkweek] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const [date, setDate] = useState<Nullable<Date>>(new Date());
    const navigate = useNavigate();
    const maxDate = new Date();
    const minDate = new Date(2024, 0);
    const timelineService = new TimelineService();
    ChartJS.register(ChartDataZoom, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

    useEffect(() => {
        console.log(date);
        let apiFunc = timelineService.getAvailability;

        callApi(
            {
                apiFunc,
                setLoading,
                navigateToLogin: () => {
                    navigate('/login');
                }
            },
            { year: moment(date).format('YYYY') }
        ).then((res: any) => {
            console.log(res.data_format.datasets[0]);
            console.log(res.data_format.datasets[1]);
            console.log(res.data_format.title);
            if (res && res?.status) {
                console.log(res);
                res.data_format.datasets[0].backgroundColor = 'rgba(54, 162, 235, 0.8)';
                res.data_format.datasets[1].backgroundColor = 'rgba(255, 99, 132, 0.8)';
                res.data_format.datasets[2].backgroundColor = 'rgba(75, 192, 192, 0.8)';

                const data = {
                    labels: res.data_format.title,
                    datasets: res.data_format.datasets
                };
                setBarChartOptions(stackedBarChartOption);
                setBarChartData(data);
            } else {
                if (!res.showError) {
                    showErrorToast(res?.message);
                }
            }
        });
    }, [date]);

    // const handleBarClick = (event: any) => {
    //     console.log(getDatasetAtEvent(chartRef?.current, event));
    //     const chartInstance: any = chartRef.current;
    //     console.log(chartInstance);
    //     const activePoints = chartInstance.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
    //     if (activePoints.length) {
    //         const firstPoint = activePoints[0];
    //         const ww = chartInstance.data.labels[firstPoint.index];
    //         const value = chartInstance.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
    //         const label = chartInstance.data.datasets[firstPoint.datasetIndex].label;
    //         setLabel(label);
    //         setValue(value);
    //         setWorkweek(ww);
    //         setVisible(true);
    //         //alert('Left Click detected!\nlabel: ' + label + '\nvalue: ' + value + '\nWW: ' + ww);
    //     }
    // };

    return (
        <React.Fragment>
            <Dialog header={workweek} visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <div>
                    Label: {label} &nbsp; Value: {value}
                </div>
            </Dialog>
            <div className="grid">
                <div className="col-12">
                    <div className="card">
                        <div>
                            <Calendar
                                className="w-full md:w-15rem"
                                style={{
                                    backgroundColor: 'white',
                                    borderBottom: '1px solid #ccc',
                                    borderRadius: '4px',
                                    outline: 'none'
                                }}
                                value={date}
                                onChange={(e: any) => setDate(e.value)}
                                view="year"
                                dateFormat="yy"
                                placeholder="Select a Year"
                                showIcon
                                //maxDate={maxDate}
                                minDate={minDate}
                                disabled={loading}
                            />
                        </div>
                        {loading ? (
                            <Player src={LoadingAnimation} className="player" style={{ height: '400px', width: '400px' }} loop autoplay />
                        ) : (
                            // barChartData && barChartOptions && <Bar ref={chartRef} onClick={handleBarClick} options={barChartOptions} data={barChartData} />
                            barChartData && barChartOptions && <Bar ref={chartRef} options={barChartOptions} data={barChartData} />
                        )}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default TMDashboard;
