import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube-embed',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full rounded-xl overflow-hidden aspect-video">
      <iframe
        [src]="safeUrl"
        class="w-full h-full"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  `,
})
export class YoutubeEmbedComponent implements OnChanges {
  @Input() Link!:string
   
  ngOnChanges(changes: SimpleChanges): void {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.Link
    );
    
  }
  videoLink(link: string) {
  
  }

  safeUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}
}