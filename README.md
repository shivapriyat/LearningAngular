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
## Event Binding
vi menu.component.html
```
<mat-grid-tile *ngFor="let dish of dishes" (click) = "onSelect(dish)">
```
vi menu.component.ts
```
onSelect(dish: Dish) {
    this.selectedDish = dish;
}
```
## Property Binding between Components (menu to dishDetail)
vi menu.component.html
```
<app-dishdetail [dish] = "selectedDish"></app-dishdetail>
```
vi menu.component.ts
```
selectedDish: Dish;
```
vi dishdetail.component.ts
```
 @Input()
 dish: Dish;
```

## Angular Services
```
mkdir app/services
ng generate service services/dish
```
vi dish.service.ts
```
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
getDishes(): Dish[] {
    return DISHES;
}
```
vi app.module.ts 
```
import { DishService } from './services/dish.service';
@NgModule({

providers: [DishService],
```

vi menu.component.ts
```
import { DishService } from '../services/dish.service';

constructor(private dishService: DishService) { }
  
ngOnInit() {
    this.dishes = this.dishService.getDishes();
}
```
## Angular Routing
```
ng generate module app-routing
```
vi app-routing/routes.ts
```
import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { MenuComponent } from '../menu/menu.component';
export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'menu',     component: MenuComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
```

vi  app-routing.module.ts
```
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { routes } from './routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
```

vi app.component.html
```
<app-header></app-header>
<router-outlet></router-outlet>
<app-footer></app-footer>
```
vi app.module.ts
```
import { AppRoutingModule } from './app-routing/app-routing.module';
@NgModule({
  . . .  
    imports: [
    . . .,
    AppRoutingModule
  ],  
  . . .  
})
```
vi header.component.html
```
<a mat-button routerLink="/home"><span class="fa fa-home fa-lg"></span> Home</a>
<a mat-button routerLink="/menu"><span class="fa fa-list fa-lg"></span> Menu</a>
```
