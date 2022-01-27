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
## Create Angular Component
```
ng generate component menu

vi app.component.html
<app-menu></app-menu>

vi src/app/shared/dish.ts
export class Dish {
    id: string;
    name: string;
    image: string;
    category: string;
    featured: boolean;
    label: string;
    price: string;
    description: string;
}
vi menu.component.ts
import { Dish } from '../shared/dish';
export class MenuComponent implements OnInit {

  dishes: Dish[] = [
    {
      id: '0',
      name: 'Uthappizza',
      image: '/assets/images/uthappizza.png',
      category: 'mains',
      featured: true,
      label: 'Hot',
      price: '4.99',
      // tslint:disable-next-line:max-line-length
      description: 'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.'
    }, ....
    ];
    
    vi  menu.component.html 
    <div class="container"
     fxLayout="column"
     fxLayoutGap="10px">

  <mat-list fxFlex>
    <mat-list-item *ngFor="let dish of dishes">
      <img matListAvatar src={{dish.image}} alt={{dish.name}}>
      <h1 matLine> {{dish.name}} </h1>
      <p matLine>
        <span> {{dish.description}} </span>
      </p>
    </mat-list-item>
  </mat-list>

</div>

vi app.module.ts 
. . .

import { MatListModule } from '@angular/material/list';

. . .

  imports: [
    . . .,
    MatListModule,
    . . .
  ],

. . .
styles.css
.container {
    margin: 20px;
    display:flex;
}


```


