import { Component } from '@angular/core';
import { RootViewController } from './root.view';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends RootViewController {
    private name: any

    // constructor
    public constructor(titleService: Title, route: ActivatedRoute) {
        super(titleService, route)
    }

    /**
     * book on click method
     */
    public bookOnClick() {
        
    }

    /**
     * angular ng on init
     * @override
     */
    public ngOnInit() {
        super.ngOnInit()
        this.titleService.setTitle(this.resources.title) // set title

        // read parameters
        this.route.paramMap.subscribe(params => {
            // check if params contains name
            var containsName = params.get('containsName')

            // if contains name
            if (containsName) {
                // set name
                this.name = {
                    'firstName': params.get("firstName"),
                    'lastName': params.get("lastName")
                }
            } else {
                // name is null
                this.name = null
            }
        })
    }
}
