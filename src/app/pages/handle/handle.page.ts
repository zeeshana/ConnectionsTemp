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
  private user: any;
  


  constructor(private dbService: DBService, private activateRoute: ActivatedRoute) { }


  ngOnInit() {
    this.activateRoute.params.subscribe( params => {
      this.dbService.getPerson('handle', params.handle).subscribe( result => {   
        console.log (result);
        this.user = result[0];
       }); 
    });
    

    /* this.activateRoute.params.subscribe( params => {
      this.dbService.getPersonByQuery('handle', params.handle).subscribe(response => {
        const res = response;
        this.user = res[0];
      });
    }); */ 
  }

  ionViewDidEnter() {
    this.createBarChart();
  }


  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'line',
      data: {
         
          datasets: [
          {
              label: "React",
              backgroundColor: "#90cdf4",
              borderColor: "#90cdf4",
              fill: false,
              borderWidth : 15,
              pointRadius : 0,
              data: [
                  {
                    x: new Date("2010-3-25 13:2"),
                      y: 1
                  }, {
                    x: new Date("2019-09-25 13:2"),
                      y: 1
                  },
              ]
          },
          {
            label: "Java",
              backgroundColor: "#90cdf4",
              borderColor: "#90cdf4",
              fill: false, 
              borderWidth : 15,
              pointRadius : 0,
              data: [
                  {
                      x: new Date("2015-3-25 13:2"),
                      y: 2
                  }, {
                    x: new Date("2018-3-25 13:2"),
                      y: 2
                  }
              ]
          },
          {

            label: "Jone",
              backgroundColor: "#90cdf4",
              borderColor: "#90cdf4",
              fill: false,
              borderWidth : 15,
              pointRadius : 0,
              data: [
                  {
                    x: new Date("2019-3-25 13:2"),
                      y: 3
                  }, {
                    x: new Date("2019-6-25 13:2"),
                      y: 3
                  }
              ]
          },
          {
            label: "Jone",
              backgroundColor: "#90cdf4",
              borderColor: "#90cdf4",
              fill: false,
              borderWidth : 15,
              pointRadius : 0,
              data: [
                  {
                    x: new Date("2013-3-25 13:2"),
                      y: 4
                  }, {
                    x: new Date("2014-3-25 13:2"),
                      y: 4
                  }
              ]
          },
          {
            label: "Jone",
              backgroundColor: "#90cdf4",
              borderColor: "#90cdf4",
              fill: false,
              borderWidth : 15,
              pointRadius : 0,
              data: [
                  {
                    x: new Date("2013-3-25 13:2"),
                      y: 4
                  }, {
                    x: new Date("2019-3-25 13:2"),
                      y: 4
                  }
              ]
          }
          ]
      },
      options: {
          legend: {
            display: false
          },
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
                }
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
                        if(value == 4) { return "Angular" } // Bring these values from an array/map {3: "Java"}
                        if(value == 3) { return "UI/UX" } // Bring these values from an array/map {3: "Java"}
                        if(value == 2) { return "React" } // Bring these values from an array/map {3: "Java"}
                        if(value == 1) { return "Java" } // Bring these values from an array/map {3: "Java"}
                        return "";
                      },
                      stepSize: 1,
                      max: 5
                  }
              }]
          }
      }
  });
}
}
