import { Component, OnInit } from '@angular/core';
import { Person } from "../Person";
import { PERSONS } from "../mock-persons";

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})

export class PersonsComponent implements OnInit {
  persons = PERSONS;
  selectedPerson: Person;
  onSelect(person: Person): void {
    this.selectedPerson = person;
  }

  constructor() { }

  ngOnInit() {
  }

}
