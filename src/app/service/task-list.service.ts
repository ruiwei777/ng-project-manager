import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskList } from '../domain';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TaskListService {

    private readonly domain = 'tasklists';

    constructor(private http: HttpClient,
        @Inject('BASE_CONFIG') private config
    ) { }

    add(taskList: TaskList): Observable<TaskList> {
        const url = `${this.config.uri}/${this.domain}`;
        return this.http.post<TaskList>(url, taskList);
    }

    /**
     * Partial update the name of input task list.
     * This is PATCH, not PUT.
     * @param taskList 
     */
    update(taskList: TaskList): Observable<TaskList> {
        const url = `${this.config.uri}/${this.domain}/${taskList.id}`;
        const toUpdate = { name: taskList.name };
        return this.http.patch<TaskList>(url, toUpdate);
    }

    /**
     * 
     * @param taskList - the task list to delete
     * @returns the deleted task list
     */
    del(taskList: TaskList): Observable<TaskList> {
        const url = `${this.config.uri}/${this.domain}/${taskList.id}`;
        return this.http.delete(url).mapTo(taskList);
    }

    get(projectId: string): Observable<TaskList[]> {
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http.get<TaskList[]>(uri, { params: { projectId } });
    }

    /**
     * Swap the order of the dragged task list and the dropped task list
     * @param src - dragged task list
     * @param target - dropped task list
     * 
     * @returns [ draggedTaskList, droppedTaskList ] 
     */
    swapOrder(src: TaskList, target: TaskList): Observable<TaskList[]> {
        const dragUrl = `${this.config.uri}/${this.domain}/${src.id}`;
        const dropUrl = `${this.config.uri}/${this.domain}/${target.id}`;
        const drag$ = this.http.patch<TaskList>(dragUrl, { order: target.order });
        const drop$ = this.http.patch<TaskList>(dropUrl, { order: src.order });
        return Observable
            .concat(drag$, drop$)
            .reduce((array, y) => [...array, y], [])
    }

}