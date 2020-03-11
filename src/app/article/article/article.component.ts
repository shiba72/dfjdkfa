import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../model/article';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  articles = new Array<Article>();

  constructor(
      // tslint:disable-next-line:no-shadowed-variable
      ArticleService: ArticleService ) {
      ArticleService.getArticles().subscribe(response => {
      this.articles = response.contents.map(item => {
        return new Article(
            item.id,
            item.createdAt,
            item.updatedAt,
            item.title,
            item.description,
            item.image,
            item.displayOrder
        );
      });
      // displayOrderの小さい順に並び替え
      // tslint:disable-next-line:only-arrow-functions
      this.articles.sort(function(a, b) {
        if (a.displayOrder > b.displayOrder) {
          return 1;
        } else {
          return -1;
        }
      });
      console.log(this.articles);
    });
  }

  ngOnInit() {
  }

}
