import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { DataService } from '../shared/services/data.service';
import { IPagedResults, ICustomer, IOrder } from '../shared/interfaces';
import { OrdersTableComponent } from './ordersTable.component';
import { FilterTextboxComponent } from '../filterTextbox/filterTextbox.component';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({ 
  moduleId: module.id,
  selector: 'orders',
  templateUrl: 'orders.component.html',
  directives: [ROUTER_DIRECTIVES, OrdersTableComponent, 
               FilterTextboxComponent, PaginationComponent]
})
export class OrdersComponent implements OnInit {
	
  title: string = 'Orders';
  customers: ICustomer[] = [];
  filteredCustomers: ICustomer[] = [];
  customerId: number;
  
  totalRecords: number = 0;
  pageSize: number = 5;
  
  constructor(private dataService: DataService) {
    
  }
 
  
  ngOnInit() {
      this.getCustomers(1);
  }
  
  getCustomers(page: number) {
      this.dataService.getCustomers(page - 1, this.pageSize)
          .subscribe((response: IPagedResults<ICustomer[]>) => {
            this.customers = this.filteredCustomers = response.results;
            this.totalRecords = response.totalRecords;
        });
  }
  
  pageChanged(page: number) {
    this.getCustomers(page);
  }
  
  filterChanged(filterData: string) {
      filterData = filterData.toLowerCase();
      
      //Quick/dirty way to deep clone
      this.filteredCustomers = JSON.parse(JSON.stringify(this.customers));
      
      this.filteredCustomers = this.filteredCustomers.filter((cust: ICustomer) => {
        if (cust.orders) {
            cust.orders = cust.orders.filter((order: IOrder) => {
                return order.product.toLowerCase().indexOf(filterData) > -1;
            });
            return cust.orders && cust.orders.length > 0;
        }
        else {
          return false;
        }
      });
  }
}
