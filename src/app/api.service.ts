import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from './data/config.json';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getDrops() {
    return this.httpClient.get(`https://${config.server}/droplets`);
  }

  public getDrop(id) {
    return this.httpClient.get(`https://${config.server}/droplets/${id}`);
  }

  public newDrop(payload: DropPayload) {
    return this.httpClient.post(`https://${config.server}/droplets`, payload);
  }

  public destroyDrop(drop: Drop) {
    return this.httpClient.delete(`https://${config.server}/droplets/${drop.id}`);
  }

  public getSnaps() {
    return this.httpClient.get(`https://${config.server}/snapshots`);
  }

  public destroySnap(snap: Snap) {
    return this.httpClient.delete(`https://${config.server}/snapshots/${snap.id}`);
  }

  public getSizes() {
    return this.httpClient.get(`https://${config.server}/sizes`);
  }

  public getFloatingIps() {
    return this.httpClient.get(`https://${config.server}/floating_ips`);
  }

  public assignFloatingIps(ip: string, dropletId: string) {
    return this.httpClient.post(
      `https://${config.server}/floating_ips/${ip}/actions`,
      {
        type: 'assign',
        droplet_id: dropletId
      });
  }


}

export interface Drop {
  id: number;
  name: string;
  status: string;
  created_at: string;
  size_slug: string;
}

export interface Snap {
  id:	string;
  name:	string;
  created_at:	string;
  regions: string[];
  resource_id:	string;
  resource_type:	string;
  min_disk_size:	number;
  size_gigabytes:	number;
  tags:	string[];
}

export interface DropPayload {
  name:	string;
  region:	string;
  size:	string;
  image: number | string;
}

export interface Size {
  slug:	string; // A human-readable string that is used to uniquely identify each size.
  available:	boolean; // This is a boolean value that represents whether new Droplets can be created with this size.
  transfer:	number; // The amount of transfer bandwidth that is available for Droplets created in this size. This only counts traffic on the public interface. The value is given in terabytes.
  price_monthly:	number; // This attribute describes the monthly cost of this Droplet size if the Droplet is kept for an entire month. The value is measured in US dollars.
  price_hourly:	number; // This describes the price of the Droplet size as measured hourly. The value is measured in US dollars.
  memory:	number; // The amount of RAM allocated to Droplets created of this size. The value is represented in megabytes.
  vcpus:	number; // The integer of number CPUs allocated to Droplets of this size.
  disk:	number; // The amount of disk space set aside for Droplets of this size. The value is represented in gigabytes.
  regions:	string[]; //
}

export interface FloatingIp {
  ip:	string; // The public IP address of the floating IP. It also serves as its identifier.
  region:	any; // The region that the floating IP is reserved to. When you query a floating IP, the entire region object will be returned.
  droplet: Drop | null; // The Droplet that the floating IP has been assigned to. When you query a floating IP, if it is assigned to a Droplet, the entire Droplet object will be returned. If it is not assigned, the value will be null.
}
