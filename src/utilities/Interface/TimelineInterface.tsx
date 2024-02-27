import { CategoryType } from './CategoryInterface';
import { ItemType } from './ItemInterface';

export interface TimelineType {
    project_category: CategoryType;
    project_id: ItemType;
    members: any;
    timeline: Date[] | null;
}
