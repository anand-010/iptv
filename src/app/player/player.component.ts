import {Component, OnInit, ViewChild} from '@angular/core';
import * as Plyr from 'plyr';
import {DatapassService} from '../services/datapass.service';
declare var Hls;
declare global {
  interface Window {
    hls: any;
  }
}
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  constructor(private dataServ: DatapassService) {}

  ngOnInit(): void {
    const defaultOptions: any = { controls: ['play-large', 'play', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'], autoplay: true};
    const video = document.querySelector('video');
    if (Hls.isSupported()) {
      const hls = new Hls({
        autoStartLoad: true,
      });
      // hls.loadSource('https://cnbctv18-lh.akamaihd.net/i/cnbctv18_1@174868/index_5_av-p.m3u8?sd=10');
      hls.loadSource(this.dataServ.link);
      hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {

        // Transform available levels into an array of integers (height values).
        const availableQualities = hls.levels.map((l) => l.height);

        // Add new qualities to option
        defaultOptions.quality = {
          default: availableQualities[0],
          options: availableQualities,
          // this ensures Plyr to use Hls to update quality level
          forced: true,
          onChange: (e) => this.updateQuality(e)
        };

        // Initialize here
        const player = new Plyr(video, defaultOptions);
      });
      hls.attachMedia(video);
      window.hls = hls;
    } else {
      // default options with no quality update in case Hls is not supported
      const player = new Plyr(video, defaultOptions);
    }
  }

  // tslint:disable-next-line:typedef
  updateQuality(newQuality) {
    window.hls.levels.forEach((level, levelIndex) => {
      if (level.height === newQuality) {
        console.log("Found quality match with " + newQuality);
        window.hls.currentLevel = levelIndex;
      }
    });
  }

}
