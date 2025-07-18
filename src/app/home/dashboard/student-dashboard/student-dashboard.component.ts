// student-dashboard.component.ts
import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import { AppService } from '../../../app.service';
import { DataService } from '../../../common/services/data/data.service';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { PageLodingComponent } from '../../../app-core/page-loding/page-loding.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'app-student-dashboard',
  imports: [
    PageLodingComponent,
    MatProgressBarModule
  ],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss',
})
export class StudentDashboardComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoContainer') videoContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('videoRange') videoRange!: ElementRef<HTMLInputElement>;
  @ViewChild('volumeRange') volumeRange!: ElementRef<HTMLInputElement>;

  // Component state properties
  isLoading = false;
  percentage = 75;
  studentDetails: any;
  StudyMaterial: any;
  today!: string;

  // Video player properties
  showvideoContainer = false;
  isVideoPlaying = false;
  currentVideoTime = 0;
  videoDuration = 0;
  videoVolume = 1;
  isMuted = false;
  isFullscreen = false;

  // Control timeout for auto-hide
  private controlsTimeout: any;
  private isControlsVisible = true;

  constructor(
    public data: DataService,
    public appService: AppService,
    private apiService: ApplicationApiService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.data.checkToken();
    this.setToday();
    this.getStudentDetails();
    this.setupFullscreenListener();
  }

  setToday(): void {
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const dayName = date.toLocaleDateString('en-US', {
      weekday: 'long'
    });
    this.today = `${formattedDate} | ${dayName}`;
  }

  getStudentDetails(): void {
    const payload = {
      studentId: this.appService.user
    };
    this.apiService.getStudent(payload).subscribe((response: any) => {
      this.studentDetails = response.student;
      this.StudyMaterial = response.study_material;
      this.isLoading = true;
      console.log('Student Details:', this.studentDetails);
    });
  }

  // Video Player Methods
  playVideo(): void {
    this.showvideoContainer = true;
    // Allow some time for the video element to be rendered
    setTimeout(() => {
      if (this.videoPlayer?.nativeElement) {
        this.setupVideoEvents();
      }
    }, 100);
  }

  setupVideoEvents(): void {
    const video = this.videoPlayer.nativeElement;

    video.addEventListener('loadedmetadata', () => {
      this.videoDuration = video.duration;
    });

    video.addEventListener('timeupdate', () => {
      this.currentVideoTime = video.currentTime;
      this.updateVideoProgressBar();
    });

    video.addEventListener('play', () => {
      this.isVideoPlaying = true;
      this.startControlsAutoHide();
    });

    video.addEventListener('pause', () => {
      this.isVideoPlaying = false;
      this.showControls();
    });

    video.addEventListener('volumechange', () => {
      this.videoVolume = video.volume;
      this.isMuted = video.muted;
      this.updateVolumeProgressBar();
    });

    video.addEventListener('ended', () => {
      this.isVideoPlaying = false;
      this.showControls();
    });

    // Initialize progress bars
    setTimeout(() => {
      this.updateVideoProgressBar();
      this.updateVolumeProgressBar();
    }, 100);
  }

  updateVideoProgressBar(): void {
    if (this.videoRange?.nativeElement) {
      const progressOverlay = this.videoRange.nativeElement.parentElement?.querySelector('.progress-overlay') as HTMLElement;
      if (progressOverlay) {
        const percentage = this.getProgressPercentage();
        progressOverlay.style.width = `${percentage}%`;
      }
    }
  }

  updateVolumeProgressBar(): void {
    if (this.volumeRange?.nativeElement) {
      const progressOverlay = this.volumeRange.nativeElement.parentElement?.querySelector('.progress-overlay') as HTMLElement;
      if (progressOverlay) {
        const percentage = this.videoVolume * 100;
        progressOverlay.style.width = `${percentage}%`;
      }
    }
  }

  togglePlayPause(): void {
    const video = this.videoPlayer.nativeElement;
    if (this.isVideoPlaying) {
      video.pause();
    } else {
      video.play();
    }
    this.showControls();
  }

  seekVideo(event: Event): void {
    const input = event.target as HTMLInputElement;
    const video = this.videoPlayer.nativeElement;
    const seekTime = (parseFloat(input.value) / 100) * this.videoDuration;
    video.currentTime = seekTime;
    this.updateVideoProgressBar();
    this.showControls();
  }

  changeVolume(event: Event): void {
    const input = event.target as HTMLInputElement;
    const video = this.videoPlayer.nativeElement;
    const volume = parseFloat(input.value) / 100;
    video.volume = volume;
    this.videoVolume = volume;

    if (volume > 0) {
      this.videoPlayer.nativeElement.muted = false;
      this.isMuted = false;
    } else {
      this.videoPlayer.nativeElement.muted = true;
      this.isMuted = true;
    }

    this.updateVolumeProgressBar();
    this.showControls();
  }

  toggleMute(): void {
    const video = this.videoPlayer.nativeElement;
    video.muted = !video.muted;
    this.isMuted = video.muted;

    if (video.muted) {
      this.videoVolume = 0;
    } else {
      this.videoVolume = video.volume || 1;
      video.volume = this.videoVolume;
    }

    this.updateVolumeProgressBar();
    this.showControls();
  }

  // Fullscreen Methods
  showFullScreen(): void {
    const container = this.videoContainer.nativeElement;

    if (container.requestFullscreen) {
      container.requestFullscreen();
    } else if ((container as any).webkitRequestFullscreen) {
      (container as any).webkitRequestFullscreen();
    } else if ((container as any).msRequestFullscreen) {
      (container as any).msRequestFullscreen();
    } else if ((container as any).mozRequestFullScreen) {
      (container as any).mozRequestFullScreen();
    }
  }

  exitFullscreen(): void {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      (document as any).mozCancelFullScreen();
    }
  }

  toggleFullscreen(): void {
    if (this.isFullscreen) {
      this.exitFullscreen();
    } else {
      this.showFullScreen();
    }
    this.showControls();
  }

  setupFullscreenListener(): void {
    const handleFullscreenChange = () => {
      this.isFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).msFullscreenElement ||
        (document as any).mozFullScreenElement
      );

      if (this.isFullscreen) {
        this.startControlsAutoHide();
      } else {
        this.showControls();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
  }

  // Control visibility methods
  showControls(): void {
    this.isControlsVisible = true;
    const controls = this.videoContainer?.nativeElement?.querySelector('.video-controls') as HTMLElement;
    if (controls) {
      controls.style.opacity = '1';
    }
    this.startControlsAutoHide();
  }

  hideControls(): void {
    if (this.isVideoPlaying && this.isFullscreen) {
      this.isControlsVisible = false;
      const controls = this.videoContainer?.nativeElement?.querySelector('.video-controls') as HTMLElement;
      if (controls) {
        controls.style.opacity = '0';
      }
    }
  }

  startControlsAutoHide(): void {
    if (this.controlsTimeout) {
      clearTimeout(this.controlsTimeout);
    }

    if (this.isVideoPlaying && this.isFullscreen) {
      this.controlsTimeout = setTimeout(() => {
        this.hideControls();
      }, 3000); // Hide after 3 seconds
    }
  }

  onMouseMove(): void {
    if (this.isFullscreen) {
      this.showControls();
    }
  }

  onVideoDoubleClick(): void {
    this.toggleFullscreen();
  }

  // Keyboard event handler
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (this.showvideoContainer) {
      switch (event.key.toLowerCase()) {
        case 'f':
          event.preventDefault();
          this.toggleFullscreen();
          break;
        case 'escape':
          if (this.isFullscreen) {
            this.exitFullscreen();
          }
          break;
        case ' ':
          event.preventDefault();
          this.togglePlayPause();
          break;
        case 'm':
          event.preventDefault();
          this.toggleMute();
          break;
        case 'arrowleft':
          event.preventDefault();
          this.seekBackward();
          break;
        case 'arrowright':
          event.preventDefault();
          this.seekForward();
          break;
        case 'arrowup':
          event.preventDefault();
          this.volumeUp();
          break;
        case 'arrowdown':
          event.preventDefault();
          this.volumeDown();
          break;
      }
    }
  }

  // Additional control methods
  seekBackward(): void {
    const video = this.videoPlayer.nativeElement;
    video.currentTime = Math.max(0, video.currentTime - 10);
    this.showControls();
  }

  seekForward(): void {
    const video = this.videoPlayer.nativeElement;
    video.currentTime = Math.min(this.videoDuration, video.currentTime + 10);
    this.showControls();
  }

  volumeUp(): void {
    const video = this.videoPlayer.nativeElement;
    const newVolume = Math.min(1, video.volume + 0.1);
    video.volume = newVolume;
    this.videoVolume = newVolume;
    if (newVolume > 0) {
      video.muted = false;
      this.isMuted = false;
    }
    this.updateVolumeProgressBar();
    this.showControls();
  }

  volumeDown(): void {
    const video = this.videoPlayer.nativeElement;
    const newVolume = Math.max(0, video.volume - 0.1);
    video.volume = newVolume;
    this.videoVolume = newVolume;
    if (newVolume === 0) {
      video.muted = true;
      this.isMuted = true;
    }
    this.updateVolumeProgressBar();
    this.showControls();
  }

  closeVideo(): void {
    if (this.isFullscreen) {
      this.exitFullscreen();
    }

    if (this.controlsTimeout) {
      clearTimeout(this.controlsTimeout);
    }

    this.showvideoContainer = false;
    this.isVideoPlaying = false;
    this.currentVideoTime = 0;
    this.isControlsVisible = true;
  }

  // Utility methods
  formatTime(seconds: number): string {
    if (isNaN(seconds) || seconds < 0) return '0:00';

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
      return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
  }

  getProgressPercentage(): number {
    return this.videoDuration > 0 ? (this.currentVideoTime / this.videoDuration) * 100 : 0;
  }

  // Download methods (keeping your existing download functionality)
  download(studyMaterial?: any): void {
    try {
      const material = studyMaterial || this.StudyMaterial;

      if (!material || !material.documents) {
        console.error('No document found in study material');
        this.showNotification('No document available for download', 'error');
        return;
      }

      const document = material.documents;

      if (!document.documentContent && !document.documentContant) {
        console.error('Document content is missing');
        this.showNotification('Document content is missing', 'error');
        return;
      }

      const documentContent = document.documentContent || document.documentContant;
      const base64Data = documentContent.split(',')[1];
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const mimeType = document.documentsExtention || document.documentsExtension || 'application/pdf';
      const blob = new Blob([byteArray], { type: mimeType });

      const url = window.URL.createObjectURL(blob);
      const link = window.document.createElement('a');
      link.href = url;
      link.download = document.documentName || 'study-material.pdf';

      window.document.body.appendChild(link);
      link.click();

      window.document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log(`Downloaded: ${document.documentName}`);
      this.showNotification(`Downloaded: ${document.documentName}`, 'success');

    } catch (error) {
      console.error('Error downloading file:', error);
      this.showNotification('Failed to download file', 'error');
    }
  }

  downloadAll(): void {
    if (Array.isArray(this.StudyMaterial)) {
      this.StudyMaterial.forEach((material: any, index: number) => {
        setTimeout(() => {
          this.download(material);
        }, index * 100);
      });
    } else {
      this.download();
    }
  }

  private showNotification(message: string, type: 'success' | 'error'): void {
    console.log(`${type.toUpperCase()}: ${message}`);
    // You can implement a toast notification service here
  }

  canDownload(studyMaterial?: any): boolean {
    const material = studyMaterial || this.StudyMaterial;
    return !!(material?.documents?.documentContent || material?.documents?.documentContant);
  }

  // Component cleanup
  ngOnDestroy(): void {
    if (this.controlsTimeout) {
      clearTimeout(this.controlsTimeout);
    }

    if (this.isFullscreen) {
      this.exitFullscreen();
    }
  }
}
