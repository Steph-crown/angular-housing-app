import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService } from '../housing.service';
import { Housinglocation } from '../housinglocation';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HousingLocationComponent, CommonModule, ReactiveFormsModule],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #query />
        <button
          class="primary"
          type="button"
          (click)="filterLocations(query.value)"
        >
          Search
        </button>
      </form>
    </section>
    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of filteredLocationList"
        [housingLocation]="housingLocation"
      ></app-housing-location>
    </section>
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent {
  housingService = inject(HousingService);
  // housingLocationList: Housinglocation[] = [];
  filteredLocationList: Housinglocation[] = [];

  applyForm = new FormGroup({
    query: new FormControl(''),
  });

  constructor() {
    // this.filteredLocationList = this.housingService.getAllHousingLocations();

    this.housingService
      .getAllHousingLocations()
      .then((housingLocationList: Housinglocation[]) => {
        this.filteredLocationList = housingLocationList;
      });
  }

  filterLocations(query: string) {
    console.log('filter', this.applyForm);
    if (!query?.trim()) return;

    // const query = this.applyForm.value.query;
    console.log({ query: query });

    this.filteredLocationList =
      this.housingService.filterHousingLocations(query);
  }
}
