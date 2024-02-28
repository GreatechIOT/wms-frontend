import { CategoryType } from './CategoryInterface';
import { ItemType } from './ItemInterface';

export interface TimelineType {
    project_category: any;
    project_id: any;
    members: any;
    timeline: Date[] | null;
}
