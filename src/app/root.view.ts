import { LanguageController } from "./controller/language.controller";
import { OnInit, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

/**
 * Root view delegate
 */
export interface RootViewDelegate {
    setResources(resources: any)
}

/**
 * root view controller
 * @implements RootViewDelegate, OnInit
 */
@Injectable()
export class RootViewController implements RootViewDelegate, OnInit {
    // declare protected members
    public resources: any
    protected languageController: LanguageController

    protected titleService: Title
    protected route: ActivatedRoute

    /**
     * constructor
     * @param titleService 
     * @param route 
     */
    constructor(titleService: Title, route: ActivatedRoute) {
        this.titleService = titleService
        this.route = route
    }

    /**
     * resources setter
     * @override
     */
    public setResources(resources: any) {
        this.resources = resources
    }

    /**
     * current language setter
     * @param currentLanguage 
     * @returns Promise
     */
    public setCurrentLanguage(language: string) {
        this.languageController.setCurrentLanguage(language)
    }

    /**
     * angular on init
     */
    public ngOnInit() {
        this.languageController = new LanguageController(this, window.navigator.language)
        this.setCurrentLanguage(window.navigator.language)
    }
}