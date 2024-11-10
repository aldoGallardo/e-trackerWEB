import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  title = 'My Application';
  subtitle = 'Welcome to the app';
  breadcrumbItems: { label: string; url: string }[] = [];
  showBreadcrumbs = true;
  showSubtitle = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService // Inyectamos el servicio de autenticación
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbItems = this.createBreadcrumbs(this.activatedRoute.root);
        this.updateTitleAndSubtitle(this.activatedRoute.root);
      });
  }

  logout(): void {
    this.authService.logout().then(() => {
      console.log('Sesión cerrada correctamente.');
      location.href = '/';
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
