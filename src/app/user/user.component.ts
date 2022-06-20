import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { User } from "../interfaces/User";
import { UserLocalStorageService } from "../services/userLocalStorage.service";

@Component({
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  public user!: User;

  constructor(
    private route: ActivatedRoute,
    private userLocalStorageService: UserLocalStorageService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(
      data => {
        this.user = data['user']
      }
    )
  }

  getFavoriteStatus(id: number): boolean {
    return this.userLocalStorageService.getFavoriteStatus(id);
  }

  favoriteToggle(id: number) {
    this.userLocalStorageService.updateFavoriteStatus(id);
  }

}