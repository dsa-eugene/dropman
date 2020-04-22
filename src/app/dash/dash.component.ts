import { Component, OnInit } from '@angular/core';
import {ApiService, Drop, DropPayload, FloatingIp, Size, Snap} from '../api.service';
import config from '../data/config.json';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {

  constructor(
    private apiService: ApiService
  ) { }

  drops: Drop[] | null = null;
  floatingIps: FloatingIp[] | null = null;
  snaps: Snap[] | null = null;
  sizes: Size[] | null = null;
  defaultSize = config.defaultSize;

  ngOnInit(): void {
    this.getDrops();
    this.getFloatingIps();
    this.getSnaps();
    this.getSizes();
  }

  getDrops = () => {
    this.apiService.getDrops().subscribe((data: any) => {
      this.drops = data.droplets;
    });
  }

  getFloatingIps = () => {
    this.apiService.getFloatingIps().subscribe((data: any) => {
      this.floatingIps = data.floating_ips;
    });
  }

  isDeleting = (dropletId: string, callback: any) => {
    this.apiService.getDrop(dropletId).subscribe(
      (dropletData: any) => {
        window.setTimeout(() => this.isDeleting(dropletId, callback), 1500);
      },
      () => callback());
  }

  destroyDrop = (drop: Drop) => {
    if (!confirm(`Are you sure you want to destroy ${drop.name}`)) {
      return false;
    }
    this.apiService.destroyDrop(drop).subscribe((data) => {
      this.isDeleting(drop.id.toString(), this.getDrops);
    });
  }

  assignIP = (floatingIp: FloatingIp, dropId: string) => {
    this.apiService.assignFloatingIps(floatingIp.ip, dropId).subscribe((data: any) => {
      this.getDrops();
      this.getFloatingIps();
    });
  }

  getSnaps = () => {
    this.apiService.getSnaps().subscribe((data: any) => {
      this.snaps = data.snapshots;
    });
  }

  getSizes = () => {
    this.apiService.getSizes().subscribe((data: any) => {
      this.sizes = data.sizes;
    });
  }

  makeDropFromSnap = (snapId: string, sizeSelectSlug: string) => {
    const thisSnap = this.snaps.filter((snapToFilter) => snapToFilter.id === snapId)[0];
    const payload: DropPayload = {
      name: thisSnap.name,
      region: thisSnap.regions[0],
      size: sizeSelectSlug,
      image: snapId
    };
    this.apiService.newDrop(payload).subscribe((data) => {
      this.getDrops();
    });
  }

  destroySnap = (snap: Snap) => {
    if (!confirm(`Are you sure you want to destroy ${snap.name}`)) {
      return false;
    }
    this.apiService.destroySnap(snap).subscribe((data) => this.getDrops());
  }
}
