import { ControlValueAccessor } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";

export class FormAccessorBase implements ControlValueAccessor {
    public newValue!: any;
    public changed = new Array<(value: any) => void>();
    private touched = new Array<() => void>();
    public observeValueChange = new BehaviorSubject<boolean>(false);
    get value() {
        return this.newValue;
    }
    set value(value: any) {
        if (this.newValue !== value) {
            this.newValue = value;
            this.changed.forEach((f) => f(value));
        }
    }
    viewValueChange(): Observable<boolean> {
        return this.observeValueChange.asObservable();
    }
    setValueChange(newValue: any): void {
        this.observeValueChange.next(newValue);
    }
    writeValue(value: any): void {
        this.newValue = value;
        this.setValueChange(true);
    }
    registerOnChange(fn: (value: any) => void): void {
        this.changed.push(fn);
    }
    registerOnTouched(fn: () => void) {
        this.touched.push(fn);
    }
}