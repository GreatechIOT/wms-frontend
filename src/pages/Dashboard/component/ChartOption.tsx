const documentStyle = getComputedStyle(document.documentElement);
const textColor = documentStyle.getPropertyValue('--text-color');
const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

export const stackedBarChartOption = () => {
    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Weekly Manpower Overview: Available vs Unavailable Resources in Greatech'
            }
        },
        responsive: true,
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true
            }
        }
    };
    return options;
};