import React from 'react';
import { EmployeeRole } from 'utilities/Constant/ConstantRole';

export const UserMenuOptions = (privilege, job_title) => {
    const menuItem = [];

    if (privilege?.view_dashboard) {
        const dashboardMenu = {
            label: 'Dashboard',
            icon: 'pi pi-chart-bar',
            to: '/Dashboard'
        };

        menuItem.push(dashboardMenu);
    }

    if (privilege?.add_timeline || privilege?.view_timeline) {
        const timelineMenu = {
            label: 'Timeline',
            icon: 'pi pi-clock',
            items: []
        };

        if (privilege?.add_timeline) {
            timelineMenu.items.push({
                label: 'Add Subordinate Timeline',
                icon: 'pi pi-plus',
                to: '/AddSubordinateTimeline'
            });
        }

        if (privilege?.view_timeline) {
            timelineMenu.items.push({
                label: 'Subordinate Timeline Listing',
                icon: 'pi pi-list',
                to: '/SubordinateTimelineListing'
            });
        }

        menuItem.push(timelineMenu);
    }

    if (job_title === EmployeeRole.M3) {
        const userMenu = {
            label: 'User Settings',
            icon: 'pi pi-cog',
            to: '/UserSettings'
        };

        menuItem.push(userMenu);
    }

    return menuItem;
};
