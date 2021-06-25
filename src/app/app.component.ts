import { Component, OnInit } from '@angular/core';
import { Item } from 'src/models/Item';
import { ToDoListService } from '../services/ToDoListService'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [ToDoListService]
})
export class AppComponent implements OnInit  {

	constructor(private todoListService: ToDoListService){}
	ngOnInit(): void {
		this.todoListService.getItems().subscribe((data) => {
			this.items = [...data];
		});
	}

  	title = 'my-todo-list';
	/* An empty array that is responsible
	to add a division */
	public items : Item[] = [];

	/* A two-way binding performed which
	pushes text on division */
	public newTask: string = '';


	/* When input is empty, it will
	not create a new division */
	public addToList() {
		if (this.newTask == '') {
		}
		else {
			var newItem: Item = {name: this.newTask};
			this.todoListService.addItem(newItem).subscribe(res => {
				this.items.push(res);
				this.newTask = '';
			});
		}
	}

	/* This function takes to input the
	task, that has to be deleted*/
	public deleteTask(id? : string) {
		this.items.forEach((value,index)=>{
			if(value.id==id && id !== undefined) {
				this.todoListService.deleteItem(id).subscribe(res => {
					this.items.splice(index,1);
				});
			}
		});
	}
}
