import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/articles', pathMatch: 'full' },
  { path: 'articles', component: ArticleListComponent },
];

@NgModule({
  declarations: [AppComponent, ArticleListComponent],
  imports: [BrowserModule, AppRoutingModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
