import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, marker, Marker } from 'leaflet';
import * as _ from 'lodash';
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
    console.log('INIT layers', this.layers);
  }

  addMarker(id: number): void {
    const newMarker: Marker = marker([ this.lt + 5 * (Math.random() - 0.5), this.lg + 5 * (Math.random() - 0.5) ]);
    console.log('MARKER:', newMarker);
    this.layers.push(newMarker);
    const activeMarker = _.remove(this.DATA, (mark: Mark) => mark.id === id);

    console.log('Marker ID:', id);
    console.log('Active marker:', activeMarker);

    this.ACTIVE.push(activeMarker[0]);
  }

  removeMarker(id: number): void {
    const inactiveMarker = _.remove(this.ACTIVE, (mark: Mark) => mark.id === id);
    console.log('Layers:', this.layers);
    console.log('MARKER', inactiveMarker);
    this.layers.splice(id - 1, 1);

    this.DATA.push(inactiveMarker[0]);
  }

  handleAddMarker(id: number): void {
    this.addMarker(id);
    console.log('AFTER ADD', this.layers);
  }

  handleRemoveMarker(id: number): void {
    this.removeMarker(id);
    console.log('AFTER REMOVE', this.layers);
  }

  handleMenu(): void {
    this.isVisible = !this.isVisible;
  }

}
