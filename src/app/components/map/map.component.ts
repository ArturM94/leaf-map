import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, marker, Marker } from 'leaflet';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';

import data from 'src/assets/data.json';
import { Mark } from '../../interfaces/mark';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  parentDataMatListIcon: string;
  childDataMatListIcon: string;
  activeMatListIcon: string;
  isVisible: boolean;
  lt: number;
  lg: number;
  options: object;
  layers: Marker[];
  DATA: object[];
  ACTIVE: object[];

  constructor() { }

  ngOnInit() {
    this.parentDataMatListIcon = 'arrow_forward_ios';
    this.childDataMatListIcon = 'subdirectory_arrow_right';
    this.activeMatListIcon = 'arrow_back_ios';
    this.isVisible = true;
    this.lt = 48.879966;
    this.lg = 11.726909;
    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
      zoom: 4,
      center: latLng(this.lt, this.lg)
    };
    this.layers = [];
    this.DATA = data;
    this.ACTIVE = [];
  }

  addMarker(id: number): void {
    const newMarker: Marker = marker([ this.lt + 5 * (Math.random() - 0.5), this.lg + 5 * (Math.random() - 0.5) ]);
    this.layers.push(newMarker);
    const activeMarker = this.DATA.find((mark: Mark) => mark.id === id);
    console.log('Marker ID:', id);
    console.log('Active marker:', activeMarker);
    if ('children' in activeMarker) {
      console.log('Marker has children');

      const removeIndex = this.DATA.map((mark: Mark) => mark.id).indexOf(id - 1);

      const addedMarker = this.DATA.splice(removeIndex, 1);
      console.log('Added marker', addedMarker);

      this.ACTIVE.push(activeMarker);
      console.log('ACTIVE:', this.ACTIVE);
    }
  }

  removeMarker(id: number): void {
    this.layers.splice(id - 1, 1);
    const removeIndex = this.ACTIVE.map((mark: Mark) => mark.id).indexOf(id - 1);

    const removedMarker = this.ACTIVE.splice(removeIndex, 1)[0];
    console.log('Removed marker', removedMarker);

    this.DATA.push(removedMarker);
    console.log('DATA:', this.DATA);
  }

  handleAddMarker(id: number): void {
    this.addMarker(id);
    console.log('Marked!');
  }

  handleRemoveMarker(id: number): void {
    this.removeMarker(id);
    console.log('Removed!');
  }

  handleMenu(): void {
    this.isVisible = !this.isVisible;
  }

}
