import { Component } from '@angular/core';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { FormsModule } from '@angular/forms';
import { PageLodingComponent } from '../../../app-core/page-loding/page-loding.component';
import { ApiDataService } from '../../../common/api-services/api-data.service';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from '../../../common/services/url/url.service';
import { DataService } from '../../../common/services/data/data.service';

@Component({
  selector: 'app-trainer-details',
  imports: [
    InputControlComponent,
    FormsModule,
    PageLodingComponent
  ],
  templateUrl: './trainer-details.component.html',
  styleUrl: './trainer-details.component.scss'
})
export class TrainerDetailsComponent {

  isLoading = false
  isEnabled = false
  trainer: any;

  constructor(
    private apiService: ApplicationApiService,
    public router : Router,
    public route: ActivatedRoute,
    public urlService: UrlService,
    public data: DataService,
  ){}

  async ngOnInit(): Promise<void> {
    let paramsId = this.route.snapshot.paramMap.get('trainerid');
    let obj: any = await this.urlService.decode(paramsId);
    console.log("Decoded Trainer ID", obj);

    await this.data.checkToken();
    const payload ={
      trainerid:obj
    }
    this.getTrainerDetails(payload);
  }

  getTrainerDetails(trainerid: any) {
    this.apiService.getTrainerDetails(trainerid).subscribe((response: any) => {
      this.trainer = response.trainer;
      console.log("Trainer Details", this.trainer);

      this.isEnabled =  true;
      this.isLoading = true;
    })
  }


  goBack(){}
  editDetails(){}
  deliteDetails(){}
}
