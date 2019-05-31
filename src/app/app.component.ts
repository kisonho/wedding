import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

import { RootViewController } from './root.view';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends RootViewController {
    // declare members
    private name: any
    private bookView: HTMLElement
    private isOpen: boolean

    // constructor
    public constructor(titleService: Title, route: ActivatedRoute) {
        super(titleService, route)
        this.isOpen = false
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
        if(this.isOpen){
            $(this.bookView).addClass('open')
            this.isOpen = false;
        } else {
            $(this.bookView).removeClass('open')
            this.isOpen = true;
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

        // check browser
        if (!! window["chrome"]) {
            $(this.bookView).addClass("chrome")
        }

        // read parameters
        this.route.paramMap.subscribe(params => {
            // check if params contains name
            var containsName = params.get('firstName') != null
            console.log(containsName)

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
