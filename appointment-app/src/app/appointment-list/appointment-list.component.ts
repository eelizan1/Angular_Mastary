import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
})
export class AppointmentListComponent implements OnInit {
  newAppointmentTitle: string = '';
  newAppointmentDate: Date = new Date();
  appointments: Appointment[] = [];

  ngOnInit(): void {
    // try to get appointments from local storage
    let savedAppointments = localStorage.getItem('appointments');
    // if there's data then parse to typescript
    this.appointments = savedAppointments ? JSON.parse(savedAppointments) : [];
  }

  // will be called from button
  addAppointment() {
    // check if we have values
    if (this.newAppointmentTitle.trim().length && this.newAppointmentDate) {
      // create new appointment
      let newAppointment: Appointment = {
        id: Date.now(),
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate,
      };

      // add new appointment to appointment array
      this.appointments.push(newAppointment);

      // reset values
      this.newAppointmentTitle = '';
      this.newAppointmentDate = new Date();

      // use local storage to store appointments
      localStorage.setItem('appointments', JSON.stringify(this.appointments));
    }
  }

  // remove appointment
  deleteAppointment(index: number) {
    this.appointments.splice(index, 1);
    // repace with new array
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }
}
