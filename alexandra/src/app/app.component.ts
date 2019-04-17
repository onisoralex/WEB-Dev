import { Component } from "@angular/core";
import { trigger, animate, style, transition, keyframes } from "@angular/animations";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  animations: [
    trigger("moveInLeft", [
      transition("void=> *", [style({
        transform: "translateX(300px)"
      }),
      animate(200, keyframes([
        style({
          transform: "translateX(300px)"
        }),
        style({
          transform: "translateX(0)"
        })
      ]))
      ]),
      transition("*=>void", [style({
        transform: "translateX(0px)"
      }),
      animate(100, keyframes([
        style({
          transform: "translateX(0px)"
        }),
        style({
          transform: "translateX(300px)"
        })
      ]))
      ])
    ])
  ]
})

export class AppComponent {
  todoArray = [];
  todo;

  // todoForm: new FormGroup()
  addTodo(value) {
    if (value !== "") {
      this.todoArray.push(value)
      //console.log(this.todos) 
    } else {
      alert("Field required **")
    }
  }

  // delete item
  deleteItem(todo) {
    for (let i = 0; i <= this.todoArray.length; i++) { // Go through the whole list
      if (todo == this.todoArray[i]) { // If the correct item is found...
        this.todoArray.splice(i, 1) // delete that item from the list
      }
    }
  }

  // submit Form
  todoSubmit(value: any) {
    if (value !== "") {
      this.todoArray.push(value.todo)
      //this.todoForm.reset()
    } else {
      alert("Field required **")
    }
  }
}
