export interface Task {
	id: string;
	name: string;
	description?: string;
	status: TaskStatus;
	createdAt: string;
	updatedAt: string;
	assignedTo?: string;
	dueDate?: string;
}

export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface CreateTaskDto {
	name: string;
	description?: string;
	assignedTo?: string;
	dueDate?: string;
}

export interface TaskResponse {
	data: Task;
	message: string;
}
