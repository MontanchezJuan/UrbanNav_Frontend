import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Map } from 'mapbox-gl';

import { MarkerAndColor } from '../../../maps/interfaces/map.interface';
import { environments } from '../../../../environments/environments';
import { ServiceService } from '../../../shared/services/ms-business/service.service';
import { AuthService } from '../../../auth/services/auth.service';
import { SwalService } from '../../../shared/services/swal.service';

@Component({
  selector: 'costumer-search-service',
  templateUrl: './search-service.component.html',
  styles: ``,
})
export class SearchServiceComponent {
  @Input()
  public markers: MarkerAndColor[] = [];

  @Input()
  public map?: Map;

  constructor(
    private authService: AuthService,
    private serviceService: ServiceService,
    private swalService: SwalService,
    private http: HttpClient,
  ) {}

  public searchRoute(): void {
    if (!this.map) throw 'Mapa no inicializado';

    const marker1 = this.markers[0].marker.getLngLat();
    const marker2 = this.markers[1].marker.getLngLat();

    this.http
      .get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${marker1.lng},${marker1.lat};${marker2.lng},${marker2.lat}?steps=true&geometries=geojson&access_token=${environments.mapbox_key}`,
      )
      .subscribe((response: any) => {
        const data = response.routes[0];
        const route = data.geometry.coordinates;

        const dataService = {
          service: {
            customer_id: this.authService.currentUser._id,
            price: 0,
            status: 0,
          },
          trip: {
            driver_id: 0,
            distance: data.distance,
            status: 0,
          },
          trippoints: {
            origin: {
              latitude: marker1.lat,
              longitude: marker1.lng,
            },
            destination: {
              latitude: marker2.lat,
              longitude: marker2.lng,
            },
          },
        };

        this.serviceService.store(dataService).subscribe({
          next: (response) => {
            console.log(response);

            this.map!.addSource('route', {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'LineString',
                  coordinates: route,
                },
              },
            });

            this.map!.addLayer({
              id: 'route',
              type: 'line',
              source: 'route',
              layout: {
                'line-join': 'round',
                'line-cap': 'round',
              },
              paint: {
                'line-color': 'black',
                'line-width': 5,
              },
            });
          },
          error: (error) => {
            this.swalService.error(error);
          },
        });
      });
  }

  deleteMarker(index: number) {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }
}
