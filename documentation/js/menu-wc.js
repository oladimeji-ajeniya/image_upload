'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">upload-backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-c445e968097d463b0c40979b717efcf380affb4bb7d9d4b8a2f9f3fe581034a43aed6c5ec4791b5df442e4fb44fe2e2960c9becf1105c3edc2d7c757787f7efb"' : 'data-bs-target="#xs-controllers-links-module-AppModule-c445e968097d463b0c40979b717efcf380affb4bb7d9d4b8a2f9f3fe581034a43aed6c5ec4791b5df442e4fb44fe2e2960c9becf1105c3edc2d7c757787f7efb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-c445e968097d463b0c40979b717efcf380affb4bb7d9d4b8a2f9f3fe581034a43aed6c5ec4791b5df442e4fb44fe2e2960c9becf1105c3edc2d7c757787f7efb"' :
                                            'id="xs-controllers-links-module-AppModule-c445e968097d463b0c40979b717efcf380affb4bb7d9d4b8a2f9f3fe581034a43aed6c5ec4791b5df442e4fb44fe2e2960c9becf1105c3edc2d7c757787f7efb"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-c445e968097d463b0c40979b717efcf380affb4bb7d9d4b8a2f9f3fe581034a43aed6c5ec4791b5df442e4fb44fe2e2960c9becf1105c3edc2d7c757787f7efb"' : 'data-bs-target="#xs-injectables-links-module-AppModule-c445e968097d463b0c40979b717efcf380affb4bb7d9d4b8a2f9f3fe581034a43aed6c5ec4791b5df442e4fb44fe2e2960c9becf1105c3edc2d7c757787f7efb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-c445e968097d463b0c40979b717efcf380affb4bb7d9d4b8a2f9f3fe581034a43aed6c5ec4791b5df442e4fb44fe2e2960c9becf1105c3edc2d7c757787f7efb"' :
                                        'id="xs-injectables-links-module-AppModule-c445e968097d463b0c40979b717efcf380affb4bb7d9d4b8a2f9f3fe581034a43aed6c5ec4791b5df442e4fb44fe2e2960c9becf1105c3edc2d7c757787f7efb"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HealthModule.html" data-type="entity-link" >HealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-HealthModule-7a98a12142572b30a56fdd3e71e71962b9e4426a4adbd977ab91514f22c6133b037842dc5a39aaa8a5d6a661e02888d64982a500f6117e5263e3b6976b4a5a23"' : 'data-bs-target="#xs-controllers-links-module-HealthModule-7a98a12142572b30a56fdd3e71e71962b9e4426a4adbd977ab91514f22c6133b037842dc5a39aaa8a5d6a661e02888d64982a500f6117e5263e3b6976b4a5a23"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthModule-7a98a12142572b30a56fdd3e71e71962b9e4426a4adbd977ab91514f22c6133b037842dc5a39aaa8a5d6a661e02888d64982a500f6117e5263e3b6976b4a5a23"' :
                                            'id="xs-controllers-links-module-HealthModule-7a98a12142572b30a56fdd3e71e71962b9e4426a4adbd977ab91514f22c6133b037842dc5a39aaa8a5d6a661e02888d64982a500f6117e5263e3b6976b4a5a23"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ImageUploadModule.html" data-type="entity-link" >ImageUploadModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ImageUploadModule-75a4df25ded71ca1baecad6b7bcd032af39eeea1811e035d9225154b6ad6cea62b46dea5bc342265f92ea59b9ec1828aa262da762a08ed79eb6af88e2fa76c82"' : 'data-bs-target="#xs-controllers-links-module-ImageUploadModule-75a4df25ded71ca1baecad6b7bcd032af39eeea1811e035d9225154b6ad6cea62b46dea5bc342265f92ea59b9ec1828aa262da762a08ed79eb6af88e2fa76c82"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ImageUploadModule-75a4df25ded71ca1baecad6b7bcd032af39eeea1811e035d9225154b6ad6cea62b46dea5bc342265f92ea59b9ec1828aa262da762a08ed79eb6af88e2fa76c82"' :
                                            'id="xs-controllers-links-module-ImageUploadModule-75a4df25ded71ca1baecad6b7bcd032af39eeea1811e035d9225154b6ad6cea62b46dea5bc342265f92ea59b9ec1828aa262da762a08ed79eb6af88e2fa76c82"' }>
                                            <li class="link">
                                                <a href="controllers/ImageUploadController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ImageUploadController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ImageUploadModule-75a4df25ded71ca1baecad6b7bcd032af39eeea1811e035d9225154b6ad6cea62b46dea5bc342265f92ea59b9ec1828aa262da762a08ed79eb6af88e2fa76c82"' : 'data-bs-target="#xs-injectables-links-module-ImageUploadModule-75a4df25ded71ca1baecad6b7bcd032af39eeea1811e035d9225154b6ad6cea62b46dea5bc342265f92ea59b9ec1828aa262da762a08ed79eb6af88e2fa76c82"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ImageUploadModule-75a4df25ded71ca1baecad6b7bcd032af39eeea1811e035d9225154b6ad6cea62b46dea5bc342265f92ea59b9ec1828aa262da762a08ed79eb6af88e2fa76c82"' :
                                        'id="xs-injectables-links-module-ImageUploadModule-75a4df25ded71ca1baecad6b7bcd032af39eeea1811e035d9225154b6ad6cea62b46dea5bc342265f92ea59b9ec1828aa262da762a08ed79eb6af88e2fa76c82"' }>
                                        <li class="link">
                                            <a href="injectables/ImageUploadService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ImageUploadService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Image.html" data-type="entity-link" >Image</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CacheService.html" data-type="entity-link" >CacheService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomLogger.html" data-type="entity-link" >CustomLogger</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailService.html" data-type="entity-link" >MailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SmsService.html" data-type="entity-link" >SmsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ValidateInputPipe.html" data-type="entity-link" >ValidateInputPipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/DatabaseConfig.html" data-type="entity-link" >DatabaseConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DatabaseConfigAttributes.html" data-type="entity-link" >DatabaseConfigAttributes</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});