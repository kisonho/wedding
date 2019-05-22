import { LanguageController } from "./controller/language.controller";
import { OnInit } from '@angular/core';
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
export class RootViewController implements RootViewDelegate, OnInit {
    // declare protected members
    protected resources: any
    protected languageController: LanguageController

    protected titleService: Title
    protected route: ActivatedRoute

    // constructor
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
    protected setCurrentLanguage(language: string) {
        this.languageController = new LanguageController(this, language)
        this.languageController.loadLanguageResources()
    }

    /**
     * angular on init
     */
    public ngOnInit() {
        this.setCurrentLanguage(window.navigator.language)
    }
}