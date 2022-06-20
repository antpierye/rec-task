export interface DataSourceOptions {
  length: number;
  pageSizeOptions: number[];
  pageSize: number;
  pageIndex: number;
  filter: string;
  isDataLoaded: boolean;
}

export const PAGE_SIZE_OPTIONS: number[] = [3, 6, 12];

export const LOCAL_STORAGE_FAVORITE_KEY: string = "FAVORITE";