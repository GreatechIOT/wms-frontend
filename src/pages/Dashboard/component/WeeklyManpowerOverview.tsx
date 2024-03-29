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

import LoadingAnimation from 'utilities/Animation/LoadingAnimation';
import { useUser } from 'utilities/Context/UserContext';
import { EmployeeRole } from 'utilities/Constant/ConstantRole';
import { Access } from 'pages/LogFiles/Access';
const WeeklyManpowerOverview = () => {
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
    const { privilege, userDetail } = useUser();
    ChartJS.register(ChartDataZoom, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

    useEffect(() => {
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
            if (res && res?.status) {
                res.data_format.datasets[0].backgroundColor = '#D9534F';
                res.data_format.datasets[1].backgroundColor = '#FFAD60';
                res.data_format.datasets[2].backgroundColor = '#B0C5A4';

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

    // useEffect(() => {
    //     const documentStyle = getComputedStyle(document.documentElement);

    //     const textColor = documentStyle.getPropertyValue('--text-color');
    //     const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    //     const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    //     const data = {
    //         labels: [
    //             'WW1',
    //             'WW2',
    //             'WW3',
    //             'WW4',
    //             'WW5',
    //             'WW6',
    //             'WW7',
    //             'WW8',
    //             'WW9',
    //             'WW10',
    //             'WW11',
    //             'WW12',
    //             'WW13',
    //             'WW14',
    //             'WW15',
    //             'WW16',
    //             'WW17',
    //             'WW18',
    //             'WW19',
    //             'WW20',
    //             'WW21',
    //             'WW22',
    //             'WW23',
    //             'WW24',
    //             'WW25',
    //             'WW26',
    //             'WW27',
    //             'WW28',
    //             'WW29',
    //             'WW30',
    //             'WW31',
    //             'WW32',
    //             'WW33',
    //             'WW34',
    //             'WW35',
    //             'WW36',
    //             'WW37',
    //             'WW38',
    //             'WW39',
    //             'WW40',
    //             'WW41',
    //             'WW42',
    //             'WW43',
    //             'WW44',
    //             'WW45',
    //             'WW46',
    //             'WW47',
    //             'WW48',
    //             'WW49',
    //             'WW50',
    //             'WW51',
    //             'WW52'
    //         ],
    //         datasets: [
    //             {
    //                 label: 'Project',
    //                 backgroundColor: 'rgba(255, 206, 86, 0.8)',
    //                 borderColor: documentStyle.getPropertyValue('--blue-500'),
    //                 data: [73, 28, 85, 100, 73, 65, 43, 79, 73, 47, 83, 76, 74, 51, 60, 37, 59, 71, 96, 66, 61, 78, 64, 48, 70, 74, 44, 79, 47, 71, 74, 94, 50, 90, 99, 44, 82, 38, 66, 74, 21, 96, 66, 80, 45, 60, 86, 60, 49, 79, 60, 40]
    //             },
    //             {
    //                 label: 'RFQ',
    //                 backgroundColor: 'rgba(255, 99, 132, 0.8)',
    //                 borderColor: documentStyle.getPropertyValue('--pink-500'),
    //                 data: [21, 44, 26, 29, 35, 29, 57, 31, 50, 24, 44, 32, 46, 53, 16, 67, 49, 49, 27, 50, 35, 31, 47, 47, 34, 31, 57, 37, 53, 41, 35, 37, 63, 20, 12, 56, 34, 87, 43, 66, 99, 41, 55, 41, 88, 25, 40, 40, 31, 39, 40, 40]
    //             },
    //             {
    //                 label: 'Available',
    //                 backgroundColor: 'rgba(75, 192, 192, 0.8)',
    //                 borderColor: documentStyle.getPropertyValue('--green-500'),
    //                 data: [46, 68, 29, 11, 32, 46, 40, 30, 17, 69, 13, 32, 20, 36, 64, 36, 32, 20, 17, 24, 44, 31, 29, 45, 36, 35, 39, 24, 40, 28, 31, 9, 27, 30, 29, 40, 24, 15, 31, 0, 20, 3, 19, 19, 7, 55, 14, 40, 60, 22, 40, 60]
    //             }
    //         ]
    //     };
    //     setBarChartData(data);
    //     setBarChartOptions(stackedBarChartOption);

    // }, [])

    const handleBarClick = (event: any) => {
        const chartInstance: any = chartRef.current;
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
            {!privilege ? (
                <LoadingAnimation />
            ) : (privilege && privilege?.view_dashboard && userDetail?.job_title === EmployeeRole.CEO) || (privilege && privilege?.view_dashboard && userDetail?.job_title === EmployeeRole.M3) ? (
                <>
                    {loading ? (
                        <LoadingAnimation />
                    ) : (
                        <>
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

                                        {barChartData && barChartOptions && <Bar ref={chartRef} options={barChartOptions} data={barChartData} />}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </>
            ) : (
                <Access />
            )}
        </React.Fragment>
    );
};

export default WeeklyManpowerOverview;
