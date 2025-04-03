import { Injectable } from '@angular/core';
import { ThemeColorsPipe, ThemeType } from '../../pipes/app-theme-color/theme-color.pipe'; // Import ThemeType
import { StorageService } from '../storage/storage.service';

type Theme = 'system' | 'dark' | 'light';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  currentTheme: Theme = 'system';
  isDarkTheme = false;
  modeChangedHandlers: Array<{ themeValue: Theme; callback: () => void }> = [];

  constructor(private themeColorsPipe: ThemeColorsPipe, public storage: StorageService) {
    this.initializeTheme();
  }

  get themeState(): string {
    return this.isDarkTheme ? 'dark' : 'light';
  }

  set modeChanged(handlers: Array<{ themeValue: Theme; callback: () => void }>) {
    this.modeChangedHandlers = handlers || [];
  }

  get modeChanged(): Array<{ themeValue: Theme; callback: () => void }> {
    return this.modeChangedHandlers;
  }

  async initializeTheme(): Promise<void> {
    await this.loadThemeFromStorage();
    this.applyTheme();
    this.attachSystemThemeListener();
  }

  private async loadThemeFromStorage(): Promise<void> {
    const savedTheme = (await this.storage.get('theme')) as Theme; 
    this.currentTheme = savedTheme ?? 'system';
  }

  private attachSystemThemeListener(): void {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', this.applyTheme.bind(this));
  }

  private async applyTheme(): Promise<void> {
    this.isDarkTheme =
      this.currentTheme === 'dark' ||
      (this.currentTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    document.body.classList.toggle('dark-theme', this.isDarkTheme);
    document.body.classList.toggle('light-theme', !this.isDarkTheme);

    this.updateCSSVariables();
    await this.storage.set('theme', this.currentTheme);
  }

  private updateCSSVariables(): void {
    // Convert isDarkTheme into ThemeType
    const themeType: ThemeType = this.isDarkTheme ? ThemeType.Dark : ThemeType.Light;
    const themeColors = this.themeColorsPipe.transform(themeType);

    Object.entries(themeColors).forEach(([key, value]) => {
      document.body.style.setProperty(`--zill-${key}`, value);
    });
  }

  async setTheme(theme: Theme): Promise<void> {
    debugger
    this.currentTheme = theme;
    await this.applyTheme();

    const handler = this.modeChangedHandlers.find((mode) => mode.themeValue === theme);
    handler?.callback();
  }

  onKeydown(event: KeyboardEvent, theme: Theme): void {
    if (['Enter', ' '].includes(event.key)) {
      this.setTheme(theme);
      event.preventDefault();
    }
  }
}
