import { Injectable } from '@angular/core';
import { Task, TaskWithChildren } from '../../models/task.model';

@Injectable({
	providedIn: 'root',
})
export class UtilityService {
	getDueDateStatus(dueDate: Date | string): 'past' | 'approaching' | 'future' {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const due = new Date(dueDate);
		due.setHours(0, 0, 0, 0);

		const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

		if (diffDays < 0) return 'past';
		if (diffDays <= 3) return 'approaching';
		return 'future';
	}

	buildTaskTree(flatTasks: Task[]): Task[] {
		const taskMap = new Map<string, TaskWithChildren>();
		const roots: Task[] = [];

		for (const task of flatTasks) {
			taskMap.set(task.id, { ...task, children: [] });
		}

		for (const task of flatTasks) {
			if (task.parentId) {
				const parent = taskMap.get(task.parentId);
				if (parent) {
					parent.children?.push(taskMap.get(task.id)!);
				}
			} else {
				roots.push(taskMap.get(task.id)!);
			}
		}

		return roots;
	}
}
