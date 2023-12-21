import { Component } from '@angular/core';
import { MarkerAndColor } from '../../../maps/interfaces/map.interface';
import { Map } from 'mapbox-gl';

@Component({
  selector: 'customer-home-page',
  templateUrl: './home-page.component.html',
  styles: ``,
})
export class HomePageComponent {
  public markers?: MarkerAndColor[];

  public map?: Map;

  changeMarkers(markers: MarkerAndColor[]) {
    this.markers = markers;
  }

  changeMap(map: Map) {
    this.map = map;
  }
}
