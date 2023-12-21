import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  NgZone,
  Output,
  ViewChild,
} from '@angular/core';

import { LngLat, Map, Marker } from 'mapbox-gl';
import { MarkerAndColor } from '../../interfaces/map.interface';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../../environments/environments';
import Swal from 'sweetalert2';
import { SwalService } from '../../../shared/services/swal.service';

@Component({
  selector: 'maps-full-screen',
  templateUrl: './full-screen.component.html',
  styleUrls: ['./full-screen.component.scss'],
})
export class FullScreenComponent implements AfterViewInit {
  @ViewChild('map')
  public divMap?: ElementRef;

  public map?: Map;

  public markers: MarkerAndColor[] = [];

  @Output()
  public markersOut: EventEmitter<MarkerAndColor[]> = new EventEmitter();

  @Output()
  public mapOut: EventEmitter<Map> = new EventEmitter();

  constructor(private swalService: SwalService) {}

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'No se encontró el elemento';

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-75.49347608717557, 5.0554406512589765], // starting position [lng, lat]
      zoom: 14, // starting zoom
    });

    this.mapListeners();
  }

  mapListeners() {
    if (!this.map) throw 'Mapa no inicializado';

    this.map.on('click', (ev) => {
      this.createMarker(ev.lngLat);
    });
  }

  createMarker(lngLat: LngLat) {
    if (!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16),
    );

    this.addMarkerCustomer(lngLat, color);

    this.mapOut.emit(this.map);
  }

  addMarkerCustomer(lngLat: LngLat, color: string) {
    if (!this.map) return;

    if (this.markers.length === 2) {
      this.swalService.error(
        'No se pueden añadir más puntos, intenta eliminar uno',
      );
      return;
    }

    const marker = new Marker({
      color: color,
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    this.markers.push({ color, marker });
    this.markersOut.emit(this.markers);
  }
}
