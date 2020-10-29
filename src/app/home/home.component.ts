import { Component, OnInit } from '@angular/core';
import { ChannelsService } from '../services/channels.service';
import { DatapassService } from '../services/datapass.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  channels: any;
  constructor(
    private channelService: ChannelsService,
    private dataserv: DatapassService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.channelService.getChannels('a').subscribe((x) => {
      console.log(x);
      this.channels = x;
    });
  }
  // tslint:disable-next-line:typedef
  search(event: any) {
    console.log(event.target.value);
    this.channelService.getChannels(event.target.value).subscribe((x) => {
      console.log(x);
      this.channels = [];
      this.channels = x;
    });
  }
  // tslint:disable-next-line:typedef
  selectChannel(index: number) {
    console.log(`index is ${index} , data ${this.channels[index].url}`);
    this.dataserv.link = this.channels[index].url;
    console.log(this.dataserv.link);
    this.router.navigate(['video']);
  }
  brokenImage(index: number) {
    console.log(`image error on ${index}`);

    this.channels[index].logo = '/assets/img/not.jpg';
  }
  selectCategory(num: number) {
    switch (num) {
      case 0:
        this.channelService.getChannels('').subscribe((x) => {
          console.log(x);
          this.channels = [];
          this.channels = x;
        });
        break;
      case 1:
        this.channelService.getByType('', 'Business').subscribe((x) => {
          console.log(x);
          this.channels = [];
          this.channels = x;
        });
        break;
      case 2:
        this.channelService.getByType('', 'Movies').subscribe((x) => {
          console.log(x);
          this.channels = [];
          this.channels = x;
        });
        break;

      default:
        break;
    }
  }
}
