import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor() { }

  @Input()
  message = 'Loading...';

  @Input()
  open = false;

  ngOnInit(): void {
  }

}
