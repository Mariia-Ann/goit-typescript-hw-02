export type Image = {
    id: string;
    alt_description: string | undefined;
    urls: {
      small: string;
      regular: string;
      full: string;
    };
    user: {
      name: string;
    };
    likes: number;
  };
  
  export interface FetchImagesResponse {
    images: Image[];
    loadMore: boolean;
  }