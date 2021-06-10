import { Component, HostListener } from '@angular/core';

interface player{
  name:string;
  file:File;
  index:number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  isDarked: boolean = false
  isFullscreen: boolean = false
  players: player[] = []
  currentPlayerName: string = ''
  currentFile!: File
  currentIndex: number = 0

  t!: HTMLElement
  v!: HTMLVideoElement
  constructor(){
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    switch (event.key) {
      case '&' || '1': // &/1
        this.changePlayer(0)
        break
      case 'é' || '2': // é/2
        if(this.players.length >= 2)
          this.changePlayer(1)
        break
      case '\"' || '3': // "/3
        if(this.players.length >= 3)
         this.changePlayer(2)
        break
      case '\'' || '4': // '/4
        if(this.players.length >= 4)
          this.changePlayer(3)
        break
      case '(' || '5': // (/5
        if(this.players.length >= 5)
          this.changePlayer(4)
        break
      default:
          break;
  }
  }

  changePlayer(index: number) {
    let currentTime = 0
    this.v = document.querySelector('#video'+this.players[this.currentIndex].name)!
    this.isFullscreen = document.fullscreenElement === this.v ? true : false;
    currentTime = this.v.currentTime
    this.currentIndex = index
    this.hideVODS(currentTime)
  }
  onAddPlayer() {
    // On ajoute le joueur et sa VOD à la liste
    this.players.push(
      {
        name: this.currentPlayerName,
        file: document.querySelector('input')!.files![0],
        index: this.players.length+1
      }
    )
    this.currentIndex = this.players.length-1
    this.hideVODS(0)
  }

  hideVODS(currentTime: number) {
    this.currentPlayerName = this.players[this.currentIndex].name
    this.players.forEach(element => {
      if(element.name !== this.currentPlayerName) {
        this.t = document.querySelector("#"+element.name)!
        this.t.style.display = 'none'
        this.v = document.querySelector('#video'+element.name)!
        this.v.style.display = 'none'
        this.muteVOD(this.v)
      } else {
        this.t = document.querySelector("#"+element.name)!
        if(this.t !== null) { // Si c'est pas l'apparition
          this.t.style.display = 'block'
          this.v = document.querySelector('#video'+element.name)!
          this.v.style.display = 'inline-block'
          this.resume(this.v, currentTime)
          this.unmuteVOD(this.v)
          if(this.isFullscreen) 
            this.setFullscreen(this.v)
          else
            this.exitFullscreen()
        }
      }
    })
  }

  resume(vod: HTMLVideoElement, currentTime: number) {
    if(vod.paused) vod.play()
    vod.currentTime = currentTime.valueOf()
  }

  muteVOD(vod: HTMLVideoElement) {
    vod.muted = true
  }

  setFullscreen(vod: HTMLVideoElement) {
    vod.requestFullscreen()
  }

  exitFullscreen() {
    if(document.fullscreenElement !== null)
      document.exitFullscreen()
  }

  unmuteVOD(vod: HTMLVideoElement) {
    vod.muted = false
  }

  onPreviousPlayer() {
    let currentTime = 0
    if(this.currentIndex > 0) {
      this.v = document.querySelector('#video'+this.players[this.currentIndex].name)!
      currentTime = this.v.currentTime
      this.currentIndex--
      this.hideVODS(currentTime)
    } 
  }

  onNextPlayer() {
    let currentTime = 0
    if(this.currentIndex < this.players.length-1) {
      this.v = document.querySelector('#video'+this.players[this.currentIndex].name)!
      currentTime = this.v.currentTime
      this.currentIndex++
      this.hideVODS(currentTime)
    }
  }
  
  onDarkMode() {
    let inputs = document.querySelectorAll('input')
    if(this.isDarked) {
      document.querySelector('body')!.style.backgroundColor = '#FFFFFF'
      document.querySelector('body')!.style.color = '#333333'
      inputs.forEach(element => {
        element.style.backgroundColor = "#FFFFFF"
        element.style.color = "#333333"
      });
      document.querySelector('#btn-darkmode')!.textContent = 'Dark Mode'
    } else {
      document.querySelector('body')!.style.backgroundColor = '#333333'
      document.querySelector('body')!.style.color = '#FFFFFF'
      inputs.forEach(element => {
        element.style.backgroundColor = "#333333"
        element.style.color = "#FFFFFF"
      });
      document.querySelector('#btn-darkmode')!.textContent = 'Light Mode'
    }  
    this.isDarked = !this.isDarked  
  }

}
