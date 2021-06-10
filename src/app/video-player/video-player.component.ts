import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  @Input() playerName: string = ''
  @Input() file!: File
  video!: HTMLVideoElement
  id: string = ''

  constructor() { 
  }
  
  ngOnInit(): void {
    this.id = 'video'+this.playerName
  }

  ngAfterViewInit(): void {
    this.video = document.querySelector('#video'+this.playerName)!
    this.video.src = URL.createObjectURL(this.file)
  }

}
