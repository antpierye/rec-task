import { Injectable } from "@angular/core";
import { LOCAL_STORAGE_FAVORITE_KEY } from "../interfaces/DataSource";
import { LocalStorageService } from "./localStorage.service";

@Injectable({
  providedIn: 'root'
})
export class UserLocalStorageService extends LocalStorageService {

  getFavoriteStatus(id: number): boolean {
    const favorites = JSON.parse(super.getItem(LOCAL_STORAGE_FAVORITE_KEY)) || [];
    return favorites.indexOf(id) !== -1
  }

  updateFavoriteStatus(id: number) {
    const favorites = JSON.parse(super.getItem(LOCAL_STORAGE_FAVORITE_KEY)) || [];
    if (this.getFavoriteStatus(id)) {
      favorites.splice(favorites.indexOf(id), 1);
      super.setItem(LOCAL_STORAGE_FAVORITE_KEY, favorites)
    } else {
      favorites.push(id);
      super.setItem(LOCAL_STORAGE_FAVORITE_KEY, favorites)
    }
  }

}