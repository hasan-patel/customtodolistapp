import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Task } from './task';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class TaskService {
    private apiServerUrl = environment.apiTaskBaseUrl;

    constructor(private http: HttpClient) {}

    public getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(`${this.apiServerUrl}/task/getAllActive`);
    }

    public getTasksByCompletion(isComplete: boolean): Observable<Task[]> {
        return this.http.get<Task[]>(`${this.apiServerUrl}/task/getAllActive/${isComplete}`);
    }
    
    public addTask(task: Task): Observable<Task> {
        return this.http.post<Task>(`${this.apiServerUrl}/task/addTask`, task);
    }
    
    public updateTask(task: Task): Observable<Task> {
        return this.http.put<Task>(`${this.apiServerUrl}/task/updateTask`, task);
    }
    
    public clearAllCompleted(): Observable<Task[]> {
        return this.http.put<Task[]>(`${this.apiServerUrl}/task/clearAllCompleted`, null);
    }
    
    public markAllCompleted(): Observable<Task[]> {
        return this.http.put<Task[]>(`${this.apiServerUrl}/task/markAllCompleted`, null);
    }
    
    //making this endpoint for the formality of it. but i do not intend to use it.
    public deleteTask(taskId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/task/deleteTask/${taskId}`);
    }
}