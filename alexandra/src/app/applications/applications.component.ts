import { Component, OnInit } from '@angular/core';
import { Application } from "../Application";
import { APPLICATIONS } from "../mock-applications";

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})

export class ApplicationsComponent implements OnInit {
  applications = APPLICATIONS;
  selectedApplication: Application;
  onSelect(application: Application): void {
    this.selectedApplication = application;
  }

  constructor() { }

  ngOnInit() {
  }

}
