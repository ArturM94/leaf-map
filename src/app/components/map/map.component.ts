import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, marker, Marker } from 'leaflet';

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
  lt: number;
  lg: number;
  options: object;
  layers: Marker[];
  DATA: object[];
  ACTIVE: object[];

  constructor() { }

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 5,
    center: latLng(46.879966, -121.726909)
  };

  layers = [
    marker([ 46.879966, -121.726909 ])
  ];

  ngOnInit() {
  }

}
