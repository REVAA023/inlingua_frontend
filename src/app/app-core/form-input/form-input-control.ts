import { Directive, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { NgControl, Validators } from "@angular/forms";
import { FormAccessorBase } from "./form-accessor-base";
import { Router } from "@angular/router";

@Directive()

export class FromInputControl extends FormAccessorBase {

    xControl: any = NgControl;
    __changeTimeOut: any = null;
    __selectSearchInput = "";
    addOnID = ''
    __inputMode = "";
    @Input() public defaultOption: string = '';
    @Input() public passwordTextType: string = 'password';

    // Password requirements
    // __passwordTextType = "password";
    __passwordStrengthShow = false; // this to use when input on focus
    __strength = 0;
    __strengthParams = {
        'eight_characters': false,
        'lower_case': false,
        'upper_case': false,
        'number': false,
        'special_characters': false
    }
    __passwordToggleTimeout: any;

    // Basic Static Required Inputs
    @Input() name = "";
    // @Input() className = "default-input";

    // Basic Dynamic Requirements
    __type = "text"; // default - Empty, number, email, select, date, password, pin
    @Input() set type(type: string) { this.__type = type || "text"; this.setInputMode(); }
    get type() { return this.__type; }

    __className = "default-input";
    @Input() set className(className: string) { this.__className = className || ""; }
    get className() { return this.__className; }

    __placeholder = "";
    @Input() set placeholder(placeholder: string) { this.__placeholder = placeholder || ""; }
    get placeholder() { return this.__placeholder; }

    __label = "";
    @Input() set label(label: string) { this.__label = label || ""; }
    get label() { return this.__label; }

    __helpText = "";
    @Input() set helpText(helpText: string) { this.__helpText = helpText || ""; }
    get helpText() { return this.__helpText; }

    __designType = ""; // default - Empty, Options float, bordered, outline
    @Input() set designType(designType: string) { this.__designType = designType || ""; }
    get designType() { return this.__designType; }

    __tabIndex = 0;
    @Input() set tabIndex(tabIndex: number) { this.__tabIndex = tabIndex || 0; }
    get tabIndex() { return this.__tabIndex; }

    // Input Configuration Setting
    __upperCase = false;
    @Input() set upperCase(upperCase: boolean) { this.__upperCase = upperCase || false; }
    get upperCase() { return this.__upperCase; }

    __lowerCase = false;
    @Input() set lowerCase(lowerCase: boolean) { this.__lowerCase = lowerCase || false; }
    get lowerCase() { return this.__lowerCase; }

    __errorTrue = false;
    @Input() set errorTrue(errorTrue: boolean) { this.__errorTrue = errorTrue || false; }
    get errorTrue() { return this.__errorTrue; }

    __btnClicked = false;
    @Input() set btnClicked(btnClicked: boolean) { this.__btnClicked = btnClicked || false; }
    get btnClicked() { return this.__btnClicked; }

    __removeClose = false;
    @Input() set removeClose(removeClose: boolean) { this.__removeClose = removeClose || false; }
    get removeClose() { return this.__removeClose; }

    __errorText = "Mandatory";
    @Input() set errorText(errorText: string) { this.__errorText = errorText || "Mandatory"; }
    get errorText() { return this.__errorText; }

    __autoFocus = false;
    @Input() set autoFocus(autoFocus: boolean) {
        this.__autoFocus = autoFocus || false;
        if (this.__autoFocus) {
            this.setFocus();
        }
    }
    get autoFocus() {
        return this.__autoFocus;
    }

    __search = false;
    @Input() set search(search: boolean) { this.__search = search || false; }
    get search() { return this.__search; }

    __userIcon = false;
    @Input() set userIcon(userIcon: boolean) { this.__userIcon = userIcon; }
    get userIcon() { return this.__userIcon; }

    __passwordStrength = false;
    @Input() set passwordStrength(passwordStrength: boolean) { this.__passwordStrength = passwordStrength || false; }
    get passwordStrength() { return this.__passwordStrength; }

    __noEmoji = false;
    @Input() set noEmoji(noEmoji: boolean) { this.__noEmoji = noEmoji || false; }
    get noEmoji() { return this.__noEmoji; }

    // Input Validation Setting
    __decimal = 0;
    @Input() set decimal(decimal: number) { this.__decimal = decimal || 0; this.setValidate(this.xControl); }
    get decimal() { return this.__decimal; }

    __max = -1;
    @Input() set max(max: number) { this.__max = max || -1; this.setValidate(this.xControl); }
    get max() { return this.__max; }

    __min = -1;
    @Input() set min(min: number) { this.__min = min || -1; this.setValidate(this.xControl); }
    get min() { return this.__min; }

    __minLength = -1;
    @Input() set minLength(minLength: number) { this.__minLength = minLength || -1; this.setValidate(this.xControl); }
    get minLength() { return this.__minLength; }

    __maxLength = -1;
    @Input() set maxLength(maxLength: number) { this.__maxLength = maxLength || -1; this.setValidate(this.xControl); }
    get maxLength() { return this.__maxLength; }

    __required = false;
    @Input() set required(required: boolean) { this.__required = required || false; this.setValidate(this.xControl); }
    get required() { return this.__required; }

    __valueType = "";
    @Input() set valueType(valueType: string) { this.__valueType = valueType || ""; this.setValidate(this.xControl); }
    get valueType() { return this.__valueType; }

    // Select Control Requirements
    __items: any = [];
    @Input()
    set items(items: any) { this.__items = items || []; this.__items.length > 5 ? this.__enableSelectSearch = true : this.__enableSelectSearch = false; }
    get items() { return this.__items; }

    __key = "";
    @Input() set key(key: string) { this.__key = key || ""; }
    get key() { return this.__key; }

    __keyName = "";
    @Input() set keyName(keyName: string) { this.__keyName = keyName || ""; }
    get keyName() { return this.__keyName; }

    __sort = true;
    @Input() set sort(sort: boolean) { this.__sort = sort; }
    get sort() { return this.__sort; }

    __multipleSelect = false;
    @Input() set multipleSelect(multipleSelect: boolean) { this.__multipleSelect = multipleSelect; }
    get multipleSelect() { return this.__multipleSelect; }

    __enableSelectSearch = false;
    @Input() set enableSelectSearch(enableSelectSearch: boolean) { this.__enableSelectSearch = enableSelectSearch; }
    get enableSelectSearch() { return this.__enableSelectSearch; }

    // Other Requirements
    __oldValue: any = null;
    @Input() set oldValue(oldValue: any) { this.__oldValue = oldValue || null; }
    get oldValue() {
        return this.__oldValue;
    }

    __oldValueDescription: any = null;
    @Input()
    set oldValueDescription(oldValueDescription: any) { this.__oldValueDescription = oldValueDescription || null; }
    get oldValueDescription() {
        return this.__oldValueDescription;
    }


    // Emitters Actions
    @Output('onClear') onClear: EventEmitter<any> = new EventEmitter();
    @Output('onBlur') onBlur: EventEmitter<any> = new EventEmitter();
    @Output('onFocus') onFocus: EventEmitter<any> = new EventEmitter();
    @Output('onEnter') onEnter: EventEmitter<any> = new EventEmitter();
    @Output('onTab') onTab: EventEmitter<any> = new EventEmitter();
    @Output('onSearch') onSearch: EventEmitter<any> = new EventEmitter();
    @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();
    @Output('onSelect') onSelect: EventEmitter<any> = new EventEmitter();

    // View Child
    @ViewChild('formInput', { static: false }) formInput!: any;

    focused = false;
    onAction(type: any) {
        switch (type) {
            case "clear":
                this.value = this.__valueType === 'int' ? 0 : "";
                this.onClear.emit(this.value);
                break;
            case "blur":
                this.focused = false;
                this.onBlur.emit(this.value);
                this.__passwordStrengthShow = false;
                break;
            case "focus":
                this.focused = true;
                this.onFocus.emit(this.value);
                this.__passwordStrengthShow = true;
                break;
            case "enter":
                this.onEnter.emit(this.value);
                break;
            case "tab":
                this.onTab.emit(this.value);
                break;
            case "search":
                this.onSearch.emit(this.value);
                break;
            case "change":
                this.onChange.emit(this.value);
                break;
            case "select":
                // if (!this.value) {
                //     this.value = '';
                // }
                this.onSelect.emit(this.value);
                break;
            default:
                break;
        }
    }

    keyDownEvent(event: any) {
        switch (event.key) {
            case "Enter":
                this.onAction('enter');
                break;
            case "Tab":
                this.onAction('tab');
                break;
            default:
                break;
        }
    }

    keyUpEvent(event: any) {
        // Emit Change Effect in 500 milliseconds late
        if (this.__changeTimeOut) clearTimeout(this.__changeTimeOut);
        this.getPasswordStrength();
        this.__changeTimeOut = setTimeout(() => {
            this.onAction('change');
        }, 500)

    }

    setFocus() {
        if (!this.formInput) {
            setTimeout(() => {
                this.setFocus();
                return;
            }, 200);

        } else {
            if (this.__type !== 'select') {
                this.formInput.nativeElement.focus();
                this.formInput.nativeElement.select();
            }
        }

    }

    setValidate(control: NgControl) {
        if (this.placeholder === '') {
            // if (this.__type === 'select') {
            //     this.placeholder = 'Select ' + this.label;
            // } else {
            //     this.placeholder = 'Enter ' + this.label;
            // }

        }
        let validation = [];
        if (this.__required) {
            validation.push(Validators.required);
        }
        if (this.__type === 'email') {
            validation.push(Validators.email);
        }
        if (this.__valueType === 'int' && this.__decimal === 0) {
            let pattern = /^[1-9][0-9]*$/;
            validation.push(Validators.pattern(pattern));
        }
        if (this.__valueType === 'int' && this.__decimal > 0) {
            let newRegex = new RegExp('^\\s*(?=.*[1-9])\\d*(?:\\.\\d{1,' + this.decimal + '})?\\s*$');
            validation.push(Validators.pattern(newRegex));
        }
        if (this.__min > 0) {
            validation.push(Validators.min(this.__min));
        }
        if (this.__max > -1) {
            validation.push(Validators.max(this.__max));
        }
        if (this.__minLength > -1) {
            validation.push(Validators.minLength(this.__minLength));
        }
        if (this.__maxLength > -1) {
            validation.push(Validators.maxLength(this.__maxLength));
        }
        if (this.__passwordStrength) {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|:;"'<>,.?/~]).{8,}$/;
            validation.push(Validators.pattern(regex));
        }

        control?.control?.setValidators(validation);
        control?.control?.updateValueAndValidity();
    }

    // Addon Methods
    generatePNR() {
        const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let addOnID = '';
        const timestamp = Date.now().toString();
        for (let i = 0; i < 7; i++) {
            const randomIndex = Math.floor(Math.random() * alphanumeric.length);
            addOnID += alphanumeric.charAt(randomIndex);
        }
        this.addOnID = addOnID;
    }

    setInputMode() {
        switch (this.__type) {
            case "text":
                this.__inputMode = "text";
                break;
            case "email":
                this.__inputMode = "email";
                break;
            case "number":
                this.__inputMode = "numeric";
                if (this.__decimal > 0) {
                    this.__inputMode = "decimal";
                }
                break;
            default:
                this.__inputMode = "undefined";
                break;
        }
    }

    getPasswordStrength() {

        if (this.__type !== 'password' || !this.__passwordStrength) {
            return;
        }
        this.__strengthParams = {
            'eight_characters': false,
            'lower_case': false,
            'upper_case': false,
            'number': false,
            'special_characters': false
        }
        let password = this.value;
        this.__strength = 0;
        let strengthNumber = 0;

        if (password.length > 7) {
            strengthNumber += 1;
            this.__strengthParams.eight_characters = true;
        }

        if (password.match(/[a-z]/)) {
            strengthNumber += 1;
            this.__strengthParams.lower_case = true;
        }

        if (password.match(/[A-Z]/)) {
            strengthNumber += 1;
            this.__strengthParams.upper_case = true;
        }

        if (password.match(/\d/)) {
            strengthNumber += 1;
            this.__strengthParams.number = true;
        }

        if (password.match(/[!@#$%^&*()_\-+={}[\]|:;"'<>,.?/~]/)) {
            strengthNumber += 1;
            this.__strengthParams.special_characters = true;
        }

        this.__strength = (strengthNumber / 5) * 100;
        // return strength;
    }
    // Type = Password
    toggleHide() {
        // if (this.__type !== 'password') {
        //     return;
        // }
        if (this.__passwordToggleTimeout) {
            clearTimeout(this.__passwordToggleTimeout);
        }
        this.passwordTextType === 'password' ? this.passwordTextType = 'text' : this.passwordTextType = 'password';
        if (this.passwordTextType === 'text') {
            this.__passwordToggleTimeout = setTimeout(() => {
                this.toggleHide();
            }, 15000);
        }
    }
}
