export interface Photo {
  background_image: string;
  name: string;
  metacritic_url: string;
  description: string;
  metacritic: number;
}

export interface APIResponse<T> {
    results: Array<T>;
}