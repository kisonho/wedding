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
    // declare members
    private name: any
    private bookView: HTMLElement
    private coverView: HTMLElement
    private isCoverFliped: boolean

    // constructor
    public constructor(titleService: Title, route: ActivatedRoute) {
        super(titleService, route)
        this.isCoverFliped = false
    }

    /**
     * title setter
     * @param newTitle 
     */
    public setTitle(newTitle: string) {
        this.titleService.setTitle( newTitle );
    }

    /**
     * book on click method
     */
    public bookOnClick() {
        // check if cover fliped
        if(this.isCoverFliped){
            this.coverView.style.transform = "rotateY(0deg)";
            this.bookView.style.left = "50%";
            this.isCoverFliped = false;
        } else {
            this.bookView.style.left = "65%";
            this.coverView.style.transform = "rotateY(-180deg)";
            this.isCoverFliped = true;
        }
    }

    /**
     * angular ng on init
     * @override
     */
    public ngOnInit() {
        super.ngOnInit()
        this.titleService.setTitle(this.resources.title) // set title

        // get element
        this.bookView = document.getElementById("bookView")
        this.coverView = document.getElementById("coverView")

        // read parameters
        this.route.paramMap.subscribe(params => {
            // check if params contains name
            var containsName = params.get('containsName') != null

            // if contains name
            if (containsName) {
                // set name
                this.name = {
                    'firstName': params.get("firstName") == null ? "" : params.get("firstName"),
                    'lastName': params.get("lastName") == null ? "" : params.get("lastName"),
                    'prefix': params.get('prefix') == null ? "" : params.get('prefix')
                }
            } else {
                // name is null
                this.name = null
            }

            console.log(this.name)
        })
    }
}
