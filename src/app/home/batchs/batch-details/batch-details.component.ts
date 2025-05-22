import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../common/services/data/data.service';
import { UrlService } from '../../../common/services/url/url.service';
import { PageLodingComponent } from '../../../app-core/page-loding/page-loding.component';

@Component({
  selector: 'app-batch-details',
  imports: [
    PageLodingComponent
  ],
  templateUrl: './batch-details.component.html',
  styleUrl: './batch-details.component.scss'
})
export class BatchDetailsComponent {
  isLoading = false;
  batchDetails:any;
  studentsDetails:any;
  constructor(
      public data: DataService,
      public router : Router,
      public route: ActivatedRoute,
      public urlService: UrlService,
      private apiService: ApplicationApiService
    ) {}

    async ngOnInit(): Promise<void> {
    await this.data.checkToken();
    let paramsId = this.route.snapshot.paramMap.get('id');
    let obj: any = await this.urlService.decode(paramsId);
    const payload ={
      batchId:obj
    }
    this.getBatchDetails(payload);
    this.isLoading = true;
  }

  getBatchDetails(payload: any) {
    this.apiService.getBatchDetails(payload).subscribe((response: any) => {
      this.batchDetails = response.batch;
      this.studentsDetails = response.students;
    })
  }

}
