import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() { }

  /**
  * Encodes a value into a URL-safe, Base64-encoded string.
  * @param value - The value to encode.
  * @returns A promise resolving to the encoded string.
  */
  async encode(value: unknown): Promise<string> {
    try {
      const obj = { data: value };
      const jsonString = JSON.stringify(obj);
      const base64String = btoa(jsonString);
      return encodeURIComponent(base64String);
    } catch (error) {
      console.error('Error encoding value:', error);
      throw new Error('Failed to encode the value.');
    }
  }

  /**
    * Decodes a URL-safe, Base64-encoded string back to its original value.
    * @param encodedValue - The encoded string.
    * @returns A promise resolving to the decoded value.
    */
  async decode<T>(encodedValue: string): Promise<T> {
    try {
      const decodedString = decodeURIComponent(encodedValue);
      const jsonString = atob(decodedString);
      const parsedObject = JSON.parse(jsonString);
      return parsedObject.data as T;
    } catch (error) {
      console.error('Error decoding value:', error);
      throw new Error('Failed to decode the value.');
    }
  }
}
