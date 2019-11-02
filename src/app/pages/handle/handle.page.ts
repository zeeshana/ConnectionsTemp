import { Component, OnInit, ViewChild } from '@angular/core';
import { DBService } from 'src/app/services/db.service';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';









@Component({
  selector: 'app-handle',
  templateUrl: './handle.page.html',
  styleUrls: ['./handle.page.scss'],
})
export class HandlePage implements OnInit {
  @ViewChild('barChart', {static: true}) barChart;

  bars: any;
  colorArray: any;
  private person: any;
  labels = [];

  private personx = {
    "objectId": "L3IlUSEfYV",
    "dob": {
      "__type": "Date",
      "iso": "2019-10-24T15:52:00.015Z"
    },
    "joined": {
      "__type": "Date",
      "iso": "2019-10-24T15:52:00.016Z"
    },
    "handle": "naval",
    "name": "Naval",
    "tagline": "Vitam impendere vero. Vitam impendere vero. Vitam impendere vero. Vitam impendere vero. Vitam impendere vero. Vitam impendere vero. Vitam impendere vero.",
    "website": "theangelphilosopher.com",
    "website_short_url": "https://t.co/7h5Bg4SvC6?amp=1",
    "email": "naval@naval.com",
    "location": "Here",
    "photo": "https://avatars.io/twitter/naval",
    "accessToken": "",
    "providerId": "Twitter",
    "secret": "Twitter",
    "signInMethod": "",
    "uid": "12344556788",
    "publishedProfile": true,
    "role": "user",
    "createdAt": "2019-10-24T15:52:00.354Z",
    "updatedAt": "2019-10-25T12:35:36.307Z",
    "skills": [
      {
        "name": "Java",
        "durations": [
          {
            "startDate": {
              "__type": "Date",
              "iso": "2011-10-24T15:52:00.016Z"
            },
            "endDate": {
              "__type": "Date",
              "iso": "2012-10-24T15:52:00.016Z"
            },
            "durationMonths": 12
          },
          {
            "startDate": {
              "__type": "Date",
              "iso": "2017-10-24T15:52:00.016Z"
            },
            "endDate": {
              "__type": "Date",
              "iso": "2018-10-24T15:52:00.016Z"
            },
            "durationMonths": 12
          }
         ]
      },
      {
        "name": "Angular",
        "durations": [
          {
            "startDate": {
              "__type": "Date",
              "iso": "2008-10-24T15:52:00.016Z"
            },
            "endDate": {
              "__type": "Date",
              "iso": "2009-10-24T15:52:00.016Z"
            },
            "durationMonths": 12
          },
          {
            "startDate": {
              "__type": "Date",
              "iso": "2013-10-24T15:52:00.016Z"
            },
            "endDate": {
              "__type": "Date",
              "iso": "2019-10-24T15:52:00.016Z"
            },
            "durationMonths": 12
          }
         ]
      } 
     ]
  }
  

  constructor(private dbService: DBService, private activateRoute: ActivatedRoute) { }


  ngOnInit() {

    this.activateRoute.params.subscribe( params => {
      this.dbService.getPerson('handle', params.handle).then( result => {
        this.person = result[0];
        this.createBarChart();
      });
    });
    

    /* this.activateRoute.params.subscribe( params => {
      this.dbService.getPersonByQuery('handle', params.handle).subscribe(response => {
        const res = response;
        this.user = res[0];
      });
    }); */ 
  }


  getLabelFunction = function getLabel(value) {
    console.log(this.labels);
 }

  createBarChart() {
    
    let datasets = [];
    // transform skills to dataset
    let skills = this.person.attributes.skills;
    
    
    for(let i=0; i<skills.length; i++) {
      
      let durations = skills[i].attributes.durations;
     
      this.labels.push( skills[i].attributes.name );
      
      for(let j=0; j<durations.length; j++) {

        console.log( durations[j].attributes.startDate.toISOString() );
        
        let dataset = {
          label: skills[i].attributes.name,
          backgroundColor: "#ff4742",
          borderColor: "#ff4742",
          fill: false,
          borderWidth : 20,
          pointRadius : 0,
          data: [
              {
               
                x: new Date( durations[j].attributes.startDate.toISOString() ),
                y: i+1
              }, {
                x: new Date( durations[j].attributes.endDate.toISOString() ),
                y: i+1
              },
          ]
        };

        datasets.push( dataset );

       

      }
    }

    this.bars = new Chart(this.barChart.nativeElement, {
      
      type: 'line',
      data: {
         
          datasets: datasets

      },
      options: {
          legend: {
            display: false
          },
          animation: false,
          scales: {
              xAxes: [{
                  type: 'time',
                  // position: 'bottom',
                  time: {
                    unit: 'year',
                    displayFormats: {
                      quarter: 'YYYY'
                    },
                    distribution: 'series',
                },
                ticks: {
                  fontSize: 18,
                      fontFamily: 'apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                      fontColor: '#000000',
                      steps: 0.5,
                },
                // gridLines: { color: "rgba(0, 0, 0, 0)", }
              }],
              yAxes : [{
                  scaleLabel : {
                      // display: false
                  },
                  ticks : {
                      beginAtZero: true, 
                      fontSize: 18,
                      fontFamily: 'apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                      fontColor: '#000000',
                      callback: function(value) {
                        //return this.labels[value-1];
                        if(value == 1) {
                          return "Java";
                        } 
                        if (value == 2) {
                          return "Angular";
                        }
                        //return value;
                        return "";
                      },
                      stepSize: 1,
                      max: 3
                  },
                  // gridLines: { color: "rgba(0, 0, 0, 0)", }
              }]
          }
      }
  });
}
}
