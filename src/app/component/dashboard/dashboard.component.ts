import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/curd.service';
import { NgConfirmService } from 'ng-confirm-box';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObj: Task = new Task();
  taskArr: Task[] = [];

  addTaskValue: string = '';
  editTaskValue: string = '';
  user: any;

  constructor(private crudService: CrudService, private router: Router, private confirmService: NgConfirmService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    if (this.user && this.user?.id) {
      this.editTaskValue = '';
      this.addTaskValue = '';
      this.taskObj = new Task();
      this.taskObj.createdBy = this.user.id;
      this.taskObj.date = new Date();
      this.taskArr = [];
      this.getAllTask();
    } else {
      this.router.navigate(['login']);
    }

  }
  getAllTask() {
    this.crudService.getAllTask().subscribe(res => {
      this.taskArr = res.filter(t => t.createdBy == this.user.id);
      // this.taskArr = res;
    }, err => {
      alert("Unable to get list of tasks");
    });
  }

  addTask() {
    if (this.addTaskValue === '') {
      alert('your Input field is empty')
    } else {
      this.taskObj.task_name = this.addTaskValue;
      this.taskObj.date = new Date().toUTCString();
      // this.taskObj.id =   this.generateGuid();
      this.crudService.addTask(this.taskObj).subscribe(res => {
        this.ngOnInit();
        this.addTaskValue = '';
      }, err => {
        alert(err);
      })
    }
  }

  // generateGuid() : string {
  //   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
  //     var r = Math.random() * 16 | 0,
  //       v = c == 'x' ? r : (r & 0x3 | 0x8);
  //     return v.toString(16);
  //   });
  //}

  editTask() {
    this.taskObj.task_name = this.editTaskValue;
    this.taskObj.updatedDate = new Date().toUTCString();
    this.crudService.editTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert("Failed to update task");
    })
  }

  deleteTask(etask: Task) {
    this.confirmService.showConfirm("Are you sure want to Delete?",
      () => {
        this.crudService.deleteTask(etask).subscribe(res => {
          this.ngOnInit();
        }, err => {
          alert("Failed to delete task");
        });
      },

      () => { })
  }


  call(etask: Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
  }

}