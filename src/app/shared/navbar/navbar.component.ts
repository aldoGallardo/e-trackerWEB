import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component'; // Ajusta la ruta según sea necesario

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  title = 'My Application';
  subtitle = 'Welcome to the app';
  breadcrumbItems: { label: string; url: string }[] = [];
  showBreadcrumbs = true;
  showSubtitle = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbItems = this.createBreadcrumbs(this.activatedRoute.root);
        this.updateTitleAndSubtitle(this.activatedRoute.root);
      });
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: { label: string; url: string }[] = []
  ): { label: string; url: string }[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const breadcrumbLabel = child.snapshot.data['breadcrumb'] || routeURL;
      if (breadcrumbLabel) {
        breadcrumbs.push({
          label: breadcrumbLabel,
          url: url,
        });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  private updateTitleAndSubtitle(route: ActivatedRoute): void {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return;
    }

    for (const child of children) {
      if (child.snapshot.data['title']) {
        this.title = child.snapshot.data['title'];
        this.subtitle = child.snapshot.data['subtitle'] || '';
        this.showBreadcrumbs = child.snapshot.data['showBreadcrumbs'] !== false;
        this.showSubtitle = child.snapshot.data['showSubtitle'] !== false;
      }

      this.updateTitleAndSubtitle(child);
    }
  }
}

// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { RouterModule } from '@angular/router'; // Importa RouterModule
// import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
// import { filter } from 'rxjs/operators';

// @Component({
//   selector: 'app-navbar',
//   standalone: true,
//   imports: [CommonModule, RouterModule], // Agrega RouterModule aquí
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.css'],
// })
// export class NavbarComponent implements OnInit {
//   breadcrumbs: Array<{ label: string; url: string }> = [];

//   constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

//   ngOnInit() {
//     this.router.events
//       .pipe(filter((event) => event instanceof NavigationEnd))
//       .subscribe(() => {
//         this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
//       });
//   }

// //   createBreadcrumbs(
// //     route: ActivatedRoute,
// //     url: string = '',
// //     breadcrumbs: Array<{ label: string; url: string }> = []
// //   ): Array<{ label: string; url: string }> {
// //     const children: ActivatedRoute[] = route.children;

// //     if (children.length === 0) {
// //       return breadcrumbs;
// //     }

// //     for (const child of children) {
// //       const routeURL: string = child.snapshot.url
// //         .map((segment) => segment.path)
// //         .join('/');
// //       if (routeURL !== '') {
// //         url += `/${routeURL}`;
// //       }

// //       const breadcrumb = {
// //         label: child.snapshot.data['breadcrumb'] || 'Inicio',
// //         url: url,
// //       };
// //       breadcrumbs.push(breadcrumb);

// //       return this.createBreadcrumbs(child, url, breadcrumbs);
// //     }
// //     return breadcrumbs;
// //   }
// // }
