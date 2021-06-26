import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OfferListComponent } from './main-page/offer-list/offer-list.component';
import { BannerComponent } from './main-page/banner/banner.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HeaderComponent } from './main-page/header/header.component';
import { ContactComponent } from './main-page/contact/contact.component';
import { MdToHtmlPipe } from './md-to-html.pipe';
import { HeadingComponent } from './main-page/heading/heading.component';

@NgModule({
  declarations: [
    AppComponent,
    OfferListComponent,
    BannerComponent,
    MainPageComponent,
    HeaderComponent,
    ContactComponent,
    MdToHtmlPipe,
    HeadingComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
