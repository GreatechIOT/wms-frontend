import React, { useEffect, useState } from 'react';
import '@bitnoi.se/react-scheduler/dist/style.css';
import { Scheduler, SchedulerData } from '@bitnoi.se/react-scheduler';
import './GanttChart.css';
const GanttChart = () => {
    const [filterButtonState, setFilterButtonState] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const mockedSchedulerData: SchedulerData = [
        {
            id: '070ac5b5-8369-4cd2-8ba2-0a209130cc60',
            label: {
                icon: 'https://picsum.photos/24',
                title: 'Joe Doe',
                subtitle: 'Frontend Developer'
            },
            data: [
                {
                    id: '8b71a8a5-33dd-4fc8-9caa-b4a584ba3762',
                    startDate: new Date('2024-10-28T10:28:22.649Z'),
                    endDate: new Date('2024-11-28T10:28:22.649Z'),
                    occupancy: 3600,
                    title: 'Project A',
                    subtitle: 'Subtitle A',
                    description: 'array indexing Salad West Account',
                    bgColor: '#D9534F'
                },
                {
                    id: '22fbe237-6344-4c8e-affb-64a1750f33bd',
                    startDate: new Date('2022-01-07T08:16:31.123Z'),
                    endDate: new Date('2022-02-15T21:55:23.582Z'),
                    occupancy: 2852,
                    title: 'Project B',
                    subtitle: 'Subtitle B',
                    description: 'Tuna Home pascal IP drive',
                    bgColor: '#FFAD60'
                }
            ]
        },
        {
            id: '070ac5b5-8369-4cd2-8ba2-0a209130cc60',
            label: {
                icon: 'https://picsum.photos/24',
                title: 'Joe Doe',
                subtitle: 'Frontend Developer'
            },
            data: [
                {
                    id: '8b71a8a5-33dd-4fc8-9caa-b4a584ba3762',
                    startDate: new Date('2024-08-13T15:31:24.272Z'),
                    endDate: new Date('2024-09-28T10:28:22.649Z'),
                    occupancy: 3600,
                    title: 'Project A',
                    subtitle: 'Subtitle A',
                    description: 'array indexing Salad West Account',
                    bgColor: '#D9534F'
                },
                {
                    id: '22fbe237-6344-4c8e-affb-64a1750f33bd',
                    startDate: new Date('2022-09-07T08:16:31.123Z'),
                    endDate: new Date('2022-11-15T21:55:23.582Z'),
                    occupancy: 2852,
                    title: 'Project B',
                    subtitle: 'Subtitle B',
                    description: 'Tuna Home pascal IP drive',
                    bgColor: '#FFAD60'
                }
            ]
        }
    ];
    return (
        <div>
            <Scheduler
                data={mockedSchedulerData}
                isLoading={isLoading}
                onRangeChange={(newRange) => console.log(newRange)}
                onTileClick={(clickedResource) => console.log(clickedResource)}
                onItemClick={(item) => console.log(item)}
                onFilterData={() => {
                    // Some filtering logic...
                    setFilterButtonState(1);
                }}
                onClearFilterData={() => {
                    // Some clearing filters logic...
                    setFilterButtonState(0);
                }}
                config={{
                    zoom: 0,
                    filterButtonState: -1,
                    includeTakenHoursOnWeekendsInDayView: false
                }}
            />
        </div>
    );
};

export default GanttChart;
