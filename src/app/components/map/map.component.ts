import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, marker, Marker } from 'leaflet';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';

import data from 'src/assets/data.json';

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
  }

  handleMenu(): void {
    this.isVisible = !this.isVisible;
  }

}
