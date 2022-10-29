import { HttpErrorResponse } from '@angular/common/http';
import { isNgContainer } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from './task';
import { TaskService } from './task.service';

enum taskTypes {
  all,
  pending,
  completed
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public allTasks: Task[] = [];
  public pendingTasks: Task[] = [];
  public completedTasks: Task[] = [];
  public displayTasks: Task[] = [];
  enum: typeof taskTypes = taskTypes;
  public selectedTasks: any;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  public getTasks(): void {
    this.taskService.getTasks().subscribe((res: Task[]) => {
      this.allTasks = res;
      this.selectedTasks = taskTypes.all;
      this.displayTasks = res;
      console.log("this.tasks:", this.allTasks);
    }, (err: HttpErrorResponse) => {
      alert(err.message);
    });

    this.getPendingTasks();
    this.getCompletedTasks();
  }

  public getPendingTasks(): void {
    this.taskService.getTasksByCompletion(false).subscribe((res: Task[]) => {
      this.pendingTasks = res;
      console.log("this.pendingTasks:", this.pendingTasks);
    }, (err: HttpErrorResponse) => {
      alert(err.message);
    });
  }

  public getCompletedTasks(): void {
    this.taskService.getTasksByCompletion(true).subscribe((res: Task[]) => {
      this.completedTasks = res;
      console.log("this.completedTasks:", this.completedTasks);
    }, (err: HttpErrorResponse) => {
      alert(err.message);
    });
  }

  public onAddTask(addForm: NgForm):void {
    this.taskService.addTask(addForm.value).subscribe((res: Task) => {
      console.log("new task added: ", res);
      this.getTasks();
      addForm.reset();
    }, (err: HttpErrorResponse) => {
      alert(err.message);
    });
  }

  public onUpdateCompletionStatus(isCompleteIncompleteform: NgForm, task: Task):void {
    console.log("isCompleteIncompleteform.value:", isCompleteIncompleteform.value, task);
    task.isComplete = isCompleteIncompleteform.value.isComplete;
    this.taskService.updateTask(task).subscribe((res: Task) => {
      console.log("task updated: ", res);
      this.getTasks();
    }, (err: HttpErrorResponse) => {
      alert(err.message);
    });
  }

  public onApparentlyDeleteTask(task: Task):void {
    console.log("onApparentlyDeleteTask:", task);
    task.isActive = false;
    this.taskService.updateTask(task).subscribe((res: Task) => {
      console.log("task updated: ", res);
      this.getTasks();
    }, (err: HttpErrorResponse) => {
      alert(err.message);
    });
  }

  public onGetTasks() {
    this.selectedTasks = taskTypes.all;
    this.displayTasks = this.allTasks;
  }

  public onGetPendingTasks() {
    this.selectedTasks = taskTypes.pending;
    this.displayTasks = this.pendingTasks;
  }

  public onGetCompletedTasks() {
    this.selectedTasks = taskTypes.completed;
    this.displayTasks = this.completedTasks;
  }

  public onClearAllCompleted() {
    console.log("onClearAllCompleted");
    this.taskService.clearAllCompleted().subscribe((res: Task[]) => {
      console.log("res clearAllCompleted: ", res);
      this.getTasks();
    }, (err: HttpErrorResponse) => {
      alert(err.message);
    });
  }

  public onMarkAllCompleted() {
    console.log("onMarkAllCompleted");
    this.taskService.markAllCompleted().subscribe((res: Task[]) => {
      console.log("res markAllCompleted: ", res);
      this.getTasks();
    }, (err: HttpErrorResponse) => {
      alert(err.message);
    });
  }
}
