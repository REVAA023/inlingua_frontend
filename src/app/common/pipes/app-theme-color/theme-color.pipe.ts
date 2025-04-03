import { Pipe, PipeTransform } from '@angular/core';

export type ThemeColors = Readonly<{
  [key in ThemeColorKey]: string;
}>;

export enum ThemeColorKey {
  primaryColor = 'primary-color',
  firstBackgroundColor = 'first-background',
  secondBackgroundColor = 'second-background',
  thirdBackgroundColor = 'third-background',
  forthBackground = 'forth-background',
  fifthBackground = 'fifth-background',
  sixthBackground = 'sixth-background',
  seventhBackground = 'seventh-background',
  eightBackground = 'eight-background',
  firstText = 'first-text',
  secondText = 'second-text',
  thirdText = 'third-text',
  forthText = 'forth-text',
  fifthText = 'fifth-text',
  blue = 'blue',
  red = 'red',
  green = 'green',
 
}

export enum ThemeType {
  Dark = 'dark',
  Light = 'light',
}

@Pipe({
  name: 'themeColors',
  standalone: true,
})
export class ThemeColorsPipe implements PipeTransform {



  transform(themeType: ThemeType): ThemeColors {
    switch (themeType) {
      case ThemeType.Dark:
        return this.getDarkThemeColors();
      case ThemeType.Light:
        return this.getLightThemeColors();
      default:
        throw new Error(`Invalid theme type: ${themeType}`);
    }
  }

  private getDarkThemeColors(): ThemeColors {
    return {
      [ThemeColorKey.primaryColor]: '#5EA8FF',
      [ThemeColorKey.firstBackgroundColor]: '#181818',
      [ThemeColorKey.secondBackgroundColor]: '#1F1F1F',
      [ThemeColorKey.thirdBackgroundColor]: '#2E2E4D',
      [ThemeColorKey.forthBackground]: '#333333',
      [ThemeColorKey.fifthBackground]: '#3A3A3A',
      [ThemeColorKey.sixthBackground]: '#4D4D4D',
      [ThemeColorKey.seventhBackground]: '#6556D9',
      [ThemeColorKey.eightBackground]: '#9E94F2',
      [ThemeColorKey.firstText]: '#FFFFFF',
      [ThemeColorKey.secondText]: '#F6F6F6',
      [ThemeColorKey.thirdText]: '#D1D1D1',
      [ThemeColorKey.forthText]: '#A0A0A0',
      [ThemeColorKey.fifthText]: '#000000',
      [ThemeColorKey.blue]: '#5EA8FF',
      [ThemeColorKey.red]: '#FF6B6B',
      [ThemeColorKey.green]: '#34D058',
    };
  }

  private getLightThemeColors(): ThemeColors {
    return {
      [ThemeColorKey.primaryColor]: '#0070F5',
      [ThemeColorKey.firstBackgroundColor]: '#F5F5F5',
      [ThemeColorKey.secondBackgroundColor]: '#FFFFFF',
      [ThemeColorKey.thirdBackgroundColor]: '#F6F5F5',
      [ThemeColorKey.forthBackground]: '#E4E6FF',
      [ThemeColorKey.fifthBackground]: '#BEC3FF',
      [ThemeColorKey.sixthBackground]: '#8476F0',
      [ThemeColorKey.seventhBackground]: '#6556D9',
      [ThemeColorKey.eightBackground]: '#190479',
      [ThemeColorKey.firstText]: '#000000',
      [ThemeColorKey.secondText]: '#323232',
      [ThemeColorKey.thirdText]: '#A0A0A0',
      [ThemeColorKey.forthText]: '#D1D1D1',
      [ThemeColorKey.fifthText]: '#FFFFFF',
      [ThemeColorKey.blue]: '#0070F5',
      [ThemeColorKey.red]: '#F53126',
      [ThemeColorKey.green]: '#1CC336',
    };
  }
}
