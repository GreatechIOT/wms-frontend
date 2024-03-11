import { Paginator } from 'primereact/paginator';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { heatMapOption } from './ChartOption';
import TimelineService from 'services/TimelineService';
import { callApi } from 'utilities/Function/CallAPI';
import { useNavigate } from 'react-router-dom';
import { showErrorToast } from 'utilities/Function/CustomToast';
import LoadingAnimation from 'utilities/Animation/LoadingAnimation';
import { Calendar } from 'primereact/calendar';
import moment from 'moment';

const TeamProjectAllocation = () => {
    const options = heatMapOption();
    const timelineService = new TimelineService();
    const [loading, setLoading] = useState(false);
    const [seriesArray, setSeriesArray] = useState([]);
    const [firstNumber, setFirstNumber] = useState(0);
    const [rows, setRows] = useState(20);
    const [filteredSeriesArray, setFilteredSeriesArray] = useState([]);
    const [series, setSeries] = useState([]);
    const [date, setDate] = useState(new Date());
    const minDate = new Date(2024, 0);
    const navigate = useNavigate();

    const getSeriesWithPage = (series, firstNumber) => {
        const seriesArray = series.slice(firstNumber, firstNumber + rows);
        setSeriesArray(seriesArray);
    };

    useEffect(() => {
        let apiFunc = timelineService.heatmap;

        callApi(
            {
                apiFunc,
                setLoading,
                navigateToLogin: () => {
                    navigate('/login');
                }
            },
            { year: moment(date).format('YYYY') }
        ).then((res) => {
            if (res && res?.status) {
                const firstNumber = 0;
                //setOptions(optionsDemo);
                setSeries(res.series);
                setFirstNumber(0);
                setFilteredSeriesArray(res.series);
                getSeriesWithPage(res.series, firstNumber);
            } else {
                if (!res.showError) {
                    showErrorToast(res?.message);
                }
            }
        });
    }, [date]);
    const onPageChange = (event) => {
        const { first } = event ?? { first: 0 }; // Default to 0 if event is null or undefined
        setFirstNumber(first);
        setRows(event?.rows);
        getSeriesWithPage(filteredSeriesArray, first);
    };
    return (
        <>
            {loading ? (
                <LoadingAnimation />
            ) : (
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
                                        onChange={(e) => setDate(e.value)}
                                        view="year"
                                        dateFormat="yy"
                                        placeholder="Select a Year"
                                        showIcon
                                        //maxDate={maxDate}
                                        minDate={minDate}
                                        disabled={loading}
                                    />
                                </div>
                            <ReactApexChart options={options} series={seriesArray} type="heatmap" height="700vh" />
                            <Paginator first={firstNumber} rows={rows} totalRecords={filteredSeriesArray.length} onPageChange={onPageChange} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TeamProjectAllocation;
