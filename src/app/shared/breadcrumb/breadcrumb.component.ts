import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {
  @Input() breadcrumbItems: Array<{ label: string; url: string }> = []; // Cambiado a breadcrumbItems

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.setBreadcrumbs();
    });
  }

  setBreadcrumbs() {
    this.breadcrumbItems = []; // Cambiado a breadcrumbItems
    let currentRoute = this.route.root;
    let url = '';
    while (currentRoute.children.length) {
      const childRoute = currentRoute.children[0];
      const routeConfig = childRoute.snapshot.routeConfig;

      if (routeConfig && routeConfig.data && routeConfig.data['breadcrumb']) {
        url += `/${routeConfig.path}`;
        this.breadcrumbItems.push({
          label: routeConfig.data['breadcrumb'],
          url: url,
        });
      }
      currentRoute = childRoute;
    }
  }
}
