import { RootViewDelegate } from "../root.view";

/**
 * Language enum
 */
export enum Language {
    EN = "en",
    CN = "cn",
    NOT_SUPPORTED = "N/A"
}

/**
 * Language controller
 */
export class LanguageController {
    // declare private variables
    private currentLanguage: Language
    private delegate: RootViewDelegate

    // declare constant variables
    private readonly DEAFUALT_LANGUAGE = Language.EN

    /**
     * Root view delegate
     * @param rootViewDelegate 
     * @param msgFile 
     * @param currentLanguage 
     */
    constructor(rootViewDelegate: RootViewDelegate, currentLanguage?: string) {
        // set up root view delegate
        if (rootViewDelegate != null) {
            this.delegate = rootViewDelegate
        } else {
            throw Error("NULL_ROOT_VIEW_DELEGATE_EXCEPTION")
        }

        // set current language
        this.currentLanguage = this.getLanguage(currentLanguage)
        this.loadLanguageResources()
    }

    /**
     * get language resources
     */
    public loadLanguageResources() {
        // check if language is supported
        if (this.currentLanguage == null || this.currentLanguage == Language.NOT_SUPPORTED) {
            this.currentLanguage = this.DEAFUALT_LANGUAGE
        }

        // load resources file
        let MSG_FILE = "~/app/language/" + this.currentLanguage + ".json"
        let RESOURCES = require(MSG_FILE)
        this.delegate.setResources(RESOURCES)
    }

    /**
     * get language enum
     * @param language 
     */
    private getLanguage(language: string): Language {
        switch (language) {
            case "en":
                return Language.EN
            case "cn":
                return Language.CN
            default:
                return Language.NOT_SUPPORTED
        }
    }
}