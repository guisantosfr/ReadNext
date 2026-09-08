export interface GoogleBook {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail: string;
      smallThumbnail: string;
    };
    categories?: string[];
    averageRating?: number;
    ratingsCount?: number;
    publishedDate?: string;
    pageCount?: number;
  };
}