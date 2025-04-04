import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterAndSort',
  standalone: true
})
export class FilterAndSortPipe implements PipeTransform {

  transform(items: any[], filter: string, filterName: string, sort: boolean): any[] {
    if (!items || !items.length) {
      return [];
    }

    let filteredItems = items;

    if (filter) {
      filteredItems = filteredItems.filter(item => {
        const value = item[filterName];
        return value && value.toLowerCase().includes(filter.toLowerCase());
      });
    }

    if (sort) {
      filteredItems = filteredItems.sort((a, b) => {
        const valueA = a[filterName].toLowerCase();
        const valueB = b[filterName].toLowerCase();
        return valueA.localeCompare(valueB);
      });
    }

    return filteredItems;
  }

}
