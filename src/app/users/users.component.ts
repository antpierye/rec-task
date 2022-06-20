import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { User } from "../interfaces/User";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription, switchMap } from "rxjs";
import { MatPaginator } from "@angular/material/paginator";
import { UsersDataSource } from "../services/usersDataSource.service";
import { DataSourceOptions } from "../interfaces/DataSource";
import { UserLocalStorageService } from "../services/userLocalStorage.service";

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {

  private dataSourceOptionsSub!: Subscription;

  public displayedColumns: string[] = ['id', 'email', 'first_name', 'last_name', 'avatar', 'favourite'];
  public dataSourceOptions!: DataSourceOptions;
  public dataSource!: MatTableDataSource<User>;

  constructor(
    private usersDataSource: UsersDataSource,
    private userLocalStorageService: UserLocalStorageService
  ) {
    this.dataSourceOptionsSub = this.usersDataSource.dataSourceOptions$
      .subscribe(
        dataSourceOptions => {
          this.dataSourceOptions = dataSourceOptions;
        }
      );
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('input') searchInput!: ElementRef;

  ngOnInit() {
    this.dataSource = this.usersDataSource.initialize();
    this.usersDataSource.loadUsers()
      .subscribe(
        (res: User[]) => {
          this.dataSource.data = res;
          this.usersDataSource.setDataSourceOptions({
            isDataLoaded: true
          })
        }
    );
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        switchMap((pageEvent) => {
          this.searchInput.nativeElement.value = '';
          this.dataSource.filter = '';
          this.usersDataSource.setDataSourceOptions({
            pageIndex: pageEvent.pageIndex,
            pageSize: pageEvent.pageSize,
            filter: this.dataSource.filter,
            isDataLoaded: false
          });
          return this.usersDataSource.loadUsers()
        })
      )
      .subscribe(
        (res: User[]) => {
            this.dataSource.data = res;
            this.usersDataSource.setDataSourceOptions({
              isDataLoaded: true
            })
        })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.usersDataSource.setDataSourceOptions({
      filter: this.dataSource.filter
    })
  }

  getFavoriteStatus(id: number): boolean {
    return this.userLocalStorageService.getFavoriteStatus(id)
  }

  favoriteToggle(event: any, id: number) {
    event.stopPropagation();
    this.userLocalStorageService.updateFavoriteStatus(id);
  }

  ngOnDestroy(): void {
    this.dataSourceOptionsSub.unsubscribe();
  }

}