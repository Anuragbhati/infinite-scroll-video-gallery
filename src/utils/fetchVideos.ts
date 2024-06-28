import axios from "axios";

export interface Video {
  id: number;
  duration: number;
  tags: string;
  videos: {
    large: {
      height: number;
      thumbnail: string;
      url: string;
      width: number;
      size: number;
    };
    medium: {
      height: number;
      thumbnail: string;
      url: string;
      width: number;
      size: number;
    };
    small: {
      height: number;
      thumbnail: string;
      url: string;
      width: number;
      size: number;
    };
  };
  imageURL: string;
  user: string;
}

export interface PixabayVideoResponse {
  total: number;
  totalHits: number;
  hits: Video[];
}

async function getVideos(
  page: number = 1,
  perPage: number = 20
): Promise<PixabayVideoResponse> {
  const apiKey: string = import.meta.env.VITE_PIXABAY_API_KEY; 

  try {
    const response = await axios.get<PixabayVideoResponse>(
      `https://pixabay.com/api/videos/?key=${apiKey}&pretty=true&per_page=${perPage}&page=${page}&orientation=all`
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}

export default getVideos;
