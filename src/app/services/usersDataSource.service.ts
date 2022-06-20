import { Injectable } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { BehaviorSubject, Observable, pluck, tap } from "rxjs";
import { PAGE_SIZE_OPTIONS, DataSourceOptions } from "../interfaces/DataSource";
import { User, UsersResponse } from "../interfaces/User";
import { UsersService } from "./users.service";

@Injectable({
  providedIn: 'root'
})
export class UsersDataSource {

  private dataSourceOptions: DataSourceOptions = {
    length: 0,
    pageSize: 0,
    pageSizeOptions: PAGE_SIZE_OPTIONS,
    pageIndex: 0,
    filter: '',
    isDataLoaded: false
  };
  
  private paginationOptionsSubject = new BehaviorSubject<DataSourceOptions>(this.dataSourceOptions);
  public dataSourceOptions$ = this.paginationOptionsSubject.asObservable();
  public dataSource!: MatTableDataSource<User>;

  constructor(private usersService: UsersService) {}

  initialize() {
    if (!this.dataSource) {
      this.dataSource = new MatTableDataSource<User>();
      this.setFilterPredicate();
    } 
    return this.dataSource
  }

  setFilterPredicate() {
    this.dataSource.filterPredicate = (data: User, filter: string) => {
      return data.first_name.toLowerCase().indexOf(filter) !== -1
        || data.last_name.toLowerCase().indexOf(filter) !== -1;
     };
  }

  setDataSourceOptions(options: any) {
    Object.assign(this.dataSourceOptions, options);
    this.paginationOptionsSubject.next(this.dataSourceOptions);
  }

  loadUsers(): Observable<User[]> {
    return this.usersService.getUsers(this.dataSourceOptions.pageIndex, this.dataSourceOptions.pageSize)
      .pipe(
        tap((res: UsersResponse) => {
          this.setDataSourceOptions({
            length: res.total,
            pageSize: res.per_page
          })
        }),
        pluck('data')
      )
  }

}