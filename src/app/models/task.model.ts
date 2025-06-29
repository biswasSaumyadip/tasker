export interface Task {
	id: string; // UUID or string
	title: string;
	description: string;
	completed: boolean;
	priority: 'low' | 'medium' | 'high';
	dueDate: string; // ISO 8601 format: e.g. '2025-05-16T02:07:37.195Z'
	createdAt: string; // ISO 8601
	assignedTo: string; // user ID or reference
	parentId: string | null; // null if top-level
	tags: string[]; // optional categorization
	profilePicture: string;
}

export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface CreateTaskDto {
	name: string;
	description?: string;
	assignedTo?: string;
	dueDate?: string;
}

export interface TaskWithChildren extends Task {
	children?: TaskWithChildren[];
}

export class TaskResponse<T> {
	data!: T;
	message: string = '';
	errors: string = '';
	status: string = '';
	errorCode: string = '';
}

export interface TaskAccordionItem {
	id: string;
	task: Task;
	isExpanded: boolean;
	children?: TaskAccordionItem[]; // optional nested items
}

export interface Profile {
	name: string;
	avatar: string;
}

export interface TaskDetail {
	id: string;
	title: string;
	description: string;
	assignedTo: string;
	assignedToName: string;
	parentId: string;

	completed: boolean; // default: false
	priority: 'LOW' | 'MEDIUM' | 'HIGH'; // assuming these are the enum values

	dueDate: string; // use string or Date depending on how you handle Instants
	tags: string[];

	attachments: Attachment[]; // needs a separate interface
	teamMembers: string[];
}

export interface Attachment {
	url: string;
	fileName: string;
	fileType: string;
	uploadedAt: string; // or Date
}
