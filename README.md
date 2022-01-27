# LearningAngular
## Install angular-cli globally
npm install -g @angular/cli@6.2.1 <br/>
ng help<br/>
## Create a new Angular application named conFusion
ng new conFusion --style=scss <br/>
cd conFusion <br/>
ng serve --open <br/>
## Configure your project to use Angular material
#### Install
npm install @angular/material@6.4.7 --save <br/>
npm install @angular/cdk@6.4.7 --save <br/>
npm install --save @angular/animations@6.1.7 <br/>
npm install --save hammerjs@2.0.8 <br/>
#### Configure to use Material Design Icons in index.html
```
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"> <br/>
```
#### Configure Angular Project to use Flex Layout <br/>
npm install --save @angular/flex-layout@6.0.0-beta.18 <br/>
#### Updating AppModule

```
vi src/app/app.module.ts<br/>
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';<br/>
import { MatToolbarModule } from '@angular/material/toolbar'; <br/>
import { FlexLayoutModule } from '@angular/flex-layout';<br/>
import 'hammerjs';<br/>
@NgModule({ <br/>
  
  . . . <br/>
  
  imports: [ <br/>
    
    . . .,<br/>
    
    BrowserAnimationsModule,<br/>
    MatToolbarModule,<br/>
    FlexLayoutModule<br/>
    
  ], <br/>
    
    . . .<br/>
```    
#### Adding a Material Toolbar
vi app.component.html <br/>
<mat-toolbar color="primary"> <span>Ristorante Con Fusion</span> </mat-toolbar><br/>
vi styles.scss<br/>
```
@import '~@angular/material/prebuilt-themes/deeppurple-amber.css';
body { 
  padding: 0; 
  margin: 0; 
  font-family: Roboto, sans-serif;   
}
```



