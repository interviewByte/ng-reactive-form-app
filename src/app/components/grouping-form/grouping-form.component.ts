import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiCallService } from '../../services/api-call.service';

@Component({
  selector: 'app-grouping-form',
  templateUrl: './grouping-form.component.html',
  styleUrl: './grouping-form.component.css',
})
export class GroupingFormComponent implements OnInit {
  profileForm!: FormGroup;
  addDynamicControl: string = 'Add Your Qualificication';
  countries = [
    { id: 1, name: 'USA' },
    { id: 2, name: 'India' },
  ];
  SELECT_ALL = 'ALL';
  hobbiesList = ['Reading', 'Music', 'Sports', 'Travel'];
  statesList = [
    { id: 101, countryId: 1, name: 'California' },
    { id: 102, countryId: 1, name: 'Texas' },
    { id: 103, countryId: 2, name: 'Maharashtra' },
    { id: 104, countryId: 2, name: 'Delhi' },
  ];
  // 1. Define separate variables for binary data
  selectedSingleFile: File | null = null;
  selectedMultiFiles: File[] = [];
  singleFileName: string | null = null;
  multiFileNames: string[] = [];
  filteredStates: any[] = [];
  constructor(
    public formBuilder: FormBuilder,
    private profileService: ApiCallService
  ) {
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: [''],
      gender: ['male'],
      hobbies1: [[]],
      address: this.formBuilder.group({
        street: [''],
        city: [''],
        country: [''],
        state: [''],
        zip: [''],
      }),
      parentDtls: this.formBuilder.group({
        fatherName: [''],
        motherName: [''],
        fatherMobile: [''],
        motherMobile: [''],
      }),
      hobbies: this.formBuilder.array([
        this.formBuilder.group({
          name: [''],
          level: [''],
          since: [''],
        }),
      ]),
      singleFile: [null],
      multiFiles: [null],
    });
  }
  ngOnInit(): void {
    // this.loadProfile();
    this.profileForm
      .get('address.country')
      ?.valueChanges.subscribe((countryId) => {
        this.onCountryChange(countryId);
      });
  }

  onCountryChange(countryId: number) {
    // 1. Filter the states based on selected country
    this.filteredStates = this.statesList.filter(
      (s) => s.countryId === +countryId
    );
    // Always reset the state value when country changes
    // this.profileForm.get('address.state')?.setValue('');
    // 2. Reset the state field so it doesn't keep the previous country's state
    const stateControl = this.profileForm.get('address.state');
    stateControl?.reset();

    // 3. If no country is selected, disable the state dropdown
    if (!countryId) {
      stateControl?.disable();
    } else {
      stateControl?.enable();
    }
  }
  //   SELECT_ALL = 'ALL';
  // hobbiesList = ['Reading', 'Music', 'Sports', 'Travel'];

  toggleAllSelection(event: any) {
    const selected = event.value;
    const control = this.profileForm.get('hobbies1');

    // 1. User clicked "Select All" to SELECT everything
    if (
      selected.includes(this.SELECT_ALL) &&
      control?.value.length <= this.hobbiesList.length
    ) {
      control?.setValue([this.SELECT_ALL, ...this.hobbiesList]);
    }

    // 2. User clicked "Select All" to DESELECT everything
    else if (
      !selected.includes(this.SELECT_ALL) &&
      control?.value.includes(this.SELECT_ALL)
    ) {
      control.setValue([]);
    }

    // 3. User clicked an individual item (Sync the "Select All" checkbox)
    else {
      const isFull =
        selected.filter((x: string) => x !== this.SELECT_ALL).length ===
        this.hobbiesList.length;

      if (isFull && !selected.includes(this.SELECT_ALL)) {
        control?.setValue([this.SELECT_ALL, ...this.hobbiesList]);
      } else if (!isFull && selected.includes(this.SELECT_ALL)) {
        control?.setValue(
          selected.filter((x: string) => x !== this.SELECT_ALL)
        );
      }
    }
  }
  onSelectionChange(event: any) {
    const selectedValues = event.value;
    const control = this.profileForm.get('hobbies1');

    // 1. If "Select All" was clicked
    if (selectedValues.includes(this.SELECT_ALL)) {
      // Fill the form with all hobbies (excluding the 'ALL' string)
      control?.setValue([...this.hobbiesList]);
    }

    // 2. If the user unselects an individual hobby while everything was selected
    else if (
      control?.value.length === this.hobbiesList.length &&
      selectedValues.length < this.hobbiesList.length
    ) {
      // This part is handled naturally by the mat-select updating the control,
      // but we can add logic here if you want specific behavior.
      control?.setValue(selectedValues);
    }
  }

  // /** * Helper method for the HTML to determine if "Select All"
  //  * should show as checked/selected
  //  */
  // isAllSelected(): boolean {
  //   const selected = this.profileForm.get('hobbies1')?.value || [];
  //   return selected.length === this.hobbiesList.length;
  // }
  // *************Access the FormArray control *************
  get hobbies() {
    return this.profileForm.get('hobbies') as FormArray;
  }
  //  Define a method to dynamically insert a hobby control into the hobbies form array. The FormArray.push()
  addAlias() {
    this.hobbies.push(this.formBuilder.control(''));
  }
  removeAlias(index: number) {
    this.hobbies.removeAt(index);
  }
  // Check if all items are currently in the form control
  isAllSelected(): boolean {
    const selected = this.profileForm.get('hobbies1')?.value || [];
    return selected.length === this.hobbiesList.length;
  }

  // toggleAllSelection() {
  //   const control = this.profileForm.get('hobbies1');

  //   if (this.isAllSelected()) {
  //     // If everything is already selected, clear the selection
  //     control?.setValue([]);
  //   } else {
  //     // Otherwise, select everything
  //     control?.setValue([...this.hobbiesList]);
  //   }
  // }
  addHobby() {
    this.hobbies.push(
      this.formBuilder.group({
        name: [''],
        level: [''],
        since: [''],
      })
    );
  }
  removeHobby(index: number) {
    this.hobbies.removeAt(index);
  }

  onSubmit() {
    // 1. Get the text data (excluding files for the first API)
    const rawData = this.profileForm.getRawValue();

    // Create a payload without the file properties
    const { singleFile, multiFiles, ...textPayload } = rawData;

    console.log('Sending Text Data:', textPayload);

    // 2. Call the first API
    this.profileService.saveProfile(textPayload).subscribe({
      next: (response: any) => {
        console.log('Profile saved successfully!', response);

        // 3. If first API is success, call the File Upload API
        // Usually, the response gives you a record ID to associate the files with
        this.uploadFiles(response.id);
      },
      error: (err) => console.error('Error saving profile', err),
    });
  }
  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street',
      },
    });
  }
  addQualification() {
    // **************** Create the FormGroup instance ************
    // const qualificationGroup = new FormGroup({
    //   degree: new FormControl(''),
    //   university: new FormControl(''),
    //   year: new FormControl(''),
    // });

    // **************** Using FormBuilder (Preferred at Your Level) ********
    // const qualificationGroup = this.formBuilder.group({
    //   degree: [''],
    //   university: [''],
    //   year: [''],
    // }) as FormGroup;

    // const qualificationGroup = this.formBuilder.group({}) as FormGroup;
    // qualificationGroup.addControl('degree', new FormControl(''));
    // qualificationGroup.addControl('university', new FormControl(''));
    // qualificationGroup.addControl('year', new FormControl(''));
    // qualificationGroup.addControl(
    //   'degree',
    //   this.formBuilder.control('', Validators.required)
    // );
    // qualificationGroup.addControl(
    //   'university',
    //   this.formBuilder.control('', Validators.required)
    // );
    // qualificationGroup.addControl(
    //   'year',
    //   this.formBuilder.control('', Validators.required)
    // );
    const qualificationConfig = {
      degree: ['', Validators.required],
      university: ['', Validators.required],
      year: ['', Validators.required],
    };

    const qualificationGroup = this.formBuilder.group(qualificationConfig);

    // ***********Add in final form***********
    this.profileForm.addControl('qualification', qualificationGroup);
    this.addDynamicControl = 'Remove Qualification';
  }
  // REMOVE qualification FormGroup
  removeQualification(): void {
    if (this.profileForm.contains('qualification')) {
      this.profileForm.removeControl('qualification');
      this.addDynamicControl = 'Add Your Qualification';
    }
  }
  toggleQualification() {
    this.profileForm.contains('qualification')
      ? this.removeQualification()
      : this.addQualification();
  }
  loadProfile() {
    this.profileService.getProfile().subscribe((data) => {
      console.log('API data:', data);
      // 1. Enable form so it can accept values
      this.profileForm.enable({ emitEvent: false });

      // 1. Patch normal FormGroup values
      this.profileForm.patchValue({
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        parentDtls: data.parentDtls,
      });
      // 3. Now that filteredStates is populated, patch the state specifically
      // We use a small timeout or just call it after the country update logic
      if (data.address.state) {
        this.profileForm.get('address.state')?.setValue(data.address.state);
      }
      // 2. Clear and Refill FormArray
      this.hobbies.clear();
      data.hobbies.forEach((hobby: any) => {
        this.hobbies.push(
          this.formBuilder.group({
            name: [hobby.name],
            level: [hobby.level],
            since: [hobby.since],
          })
        );
      });

      // 3. DISABLE NOW (Inside the subscribe block)
      // This disables the entire form including the newly created FormArray controls
      this.profileForm.disable();

      // If you only want to disable the FormArray specifically:
      // this.hobbies.disable();
    });
  }
  // 2. Logic to handle Single File
  onSingleFileChange(event: any) {
    console.log('Singlu upload', event.target.files[0]);
    const file = event.target.files[0];
    if (file) {
      this.singleFileName = file.name;
      this.selectedSingleFile = file; // Store binary for API
      this.profileForm.get('singleFile')?.setValue(file);
    }
  }

  // 3. Logic to handle Multiple Files
  onMultiFileChange(event: any) {
    console.log('multiSelect', event);
    const files = Array.from(event.target.files) as File[];
    if (files.length > 0) {
      this.multiFileNames = files.map((f: any) => f.name);
      this.selectedMultiFiles = files; // Store binary for API
      this.profileForm.get('multiFiles')?.setValue(files);
    }
  }

  // 4. Drag & Drop logic
  onFileDropped(event: DragEvent, type: string) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      if (type === 'single') {
        this.profileForm.get('singleUpload')?.setValue(files[0]);
      } else {
        this.profileForm.get('multiUpload')?.setValue(Array.from(files));
      }
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }
  // Clear selections
  resetUploads() {
    this.singleFileName = null;
    this.multiFileNames = [];
    this.profileForm.get('singleUpload')?.reset();
    this.profileForm.get('multiUpload')?.reset();
  }
  uploadFiles(recordId: string) {
    const rawData = this.profileForm.getRawValue();

    // Use FormData to send binary files
    const formData = new FormData();
    formData.append('recordId', recordId); // Associate files with the new record

    // Append Single File
    if (rawData.singleFile) {
      formData.append('singleFile', rawData.singleFile);
    }

    // Append Multiple Files
    if (rawData.multiFiles && rawData.multiFiles.length > 0) {
      rawData.multiFiles.forEach((file: File) => {
        formData.append('multiFiles', file);
      });
    }
    if (this.selectedSingleFile) {
      formData.append('single', this.selectedSingleFile);
    }

    this.selectedMultiFiles.forEach((file) => {
      formData.append('multi', file);
    });

    // 4. Call the File Upload API
    this.profileService.uploadDocuments(formData).subscribe({
      next: (res) => console.log('Files uploaded successfully!', res),
      error: (err) => console.log('File upload failed', err),
    });
  }
}
