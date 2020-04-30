import { Component, OnInit } from '@angular/core';
import {ApiService, Drop, DropPayload, Snap} from '../api.service';
import config from '../data/config.json';

@Component({
  selector: 'app-meet',
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.scss']
})
export class MeetComponent implements OnInit {

  constructor(
    private apiService: ApiService
  ) { }

  drops: Drop[] | null = null;
  snaps: Snap[] | null = null;

  loading: boolean;
  loadingMessage: string;

  ngOnInit(): void {
    this.getDrops();
    this.getSnaps();
  }

  getDrops = () => {
    this.loading = true;
    this.loadingMessage = 'Loading data...';
    this.apiService.getDrops().subscribe((data: any) => {
      this.drops = data.droplets.filter((drop) => drop.name.includes('jitsi'));
      this.loading = false;
    });
  }

  getSnaps = () => {
    this.apiService.getSnaps().subscribe((data: any) => {
      this.snaps = data.snapshots.filter((drop) => drop.name.includes('jitsi'));
    });
  }

  makeJitsiServer = (snapId: string) => {
    this.loading = true;
    this.loadingMessage = 'Creating server...';
    const thisSnap = this.snaps.filter((snapToFilter) => snapToFilter.id === snapId)[0];
    const payload: DropPayload = {
      name: thisSnap.name,
      region: thisSnap.regions[0],
      size: config.defaultSize,
      image: snapId
    };
    this.apiService.newDrop(payload).subscribe((dropletData: any) => this.assignIp(dropletData.droplet.id));
  }

  assignIp = (dropletId) => {
    this.apiService.getDrop(dropletId).subscribe((dropletData: any) => {
      if (dropletData.droplet.status === 'active') {
        this.loadingMessage = 'Assigning IP...';
        this.apiService.assignFloatingIps(config.defaultFloatingIp, dropletId).subscribe((data: any) => {
          this.getDrops();
          this.loading = false;
        });
      } else {
        window.setTimeout(() => this.assignIp(dropletId), 5000);
      }
    });
  }

  isDeleting = (dropletId: string, callback: any) => {
    this.apiService.getDrop(dropletId).subscribe(
      (dropletData: any) => {
        window.setTimeout(() => this.isDeleting(dropletId, callback), 5000);
      },
      () => callback());
  }

  destroyDrop = (drop: Drop) => {
    if (!confirm(`Are you sure you want to shut down ${drop.name}`)) {
      return false;
    }
    this.loading = true;
    this.loadingMessage = 'Deleting server...';
    this.apiService.destroyDrop(drop).subscribe((data) => {
      this.isDeleting(drop.id.toString(), this.getDrops);
    });
  }
}
