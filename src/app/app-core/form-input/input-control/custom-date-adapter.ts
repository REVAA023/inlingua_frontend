import { Injectable } from "@angular/core";
import { NativeDateAdapter } from "@angular/material/core";
import { format, parse } from "date-fns";

export class CustomDateAdapter extends NativeDateAdapter {

  override format(date: Date, displayFormat: any): string {
    // g(date);
    let formatDate = format(date, displayFormat);
    return formatDate;
  }

  // override parse(date: string, parseFormat: any): Date {
  //   g(date);
  //   let parsedDate = parse(date, "dd-MM-yyyy HH:mm", new Date());
  //   return parsedDate;
  // }
}
