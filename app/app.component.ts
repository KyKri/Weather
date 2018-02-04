import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <div class="container">
            <div id="responsive-problem-div" class="col-md-4">
                <weather-widget></weather-widget>
            </div>
        </div>
    `,
    styles: [`
        .container{
            padding-top: 5rem;
        }
    `]
})

export class AppComponent { }