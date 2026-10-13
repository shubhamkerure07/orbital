import { DiscoveryItem } from '../types';
import { DISCOVERIES } from '../data/discoveries';

export interface ApodApiResponse {
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: 'image' | 'video';
  service_version?: string;
  title: string;
  url: string;
  copyright?: string;
}

export interface ApiFetchResult<T> {
  data: T | null;
  isLive: boolean;
  error?: string;
  sourceNote: string;
}

/**
 * Fetches NASA's Astronomy Picture of the Day (APOD) using the standard DEMO_KEY
 * with fallback to verified local astrophysics observations when offline or rate-limited.
 */
export async function fetchNasaApod(): Promise<ApiFetchResult<DiscoveryItem>> {
  try {
    // Standard DEMO_KEY allows 30 requests/hour/IP safely without exposing private secrets
    const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(6000)
    });

    if (!response.ok) {
      throw new Error(`NASA API returned status ${response.status}: ${response.statusText}`);
    }

    const json: ApodApiResponse = await response.json();

    const discoveryItem: DiscoveryItem = {
      id: `apod-${json.date}`,
      title: json.title,
      date: json.date,
      explanation: json.explanation,
      mediaType: json.media_type,
      url: json.url,
      hdUrl: json.hdurl,
      copyright: json.copyright,
      creditAgency: json.copyright ? `${json.copyright} / NASA APOD` : 'NASA Astronomy Picture of the Day',
      tags: ['APOD', 'NASA Live Feed', 'Astronomy']
    };

    return {
      data: discoveryItem,
      isLive: true,
      sourceNote: 'Live telemetry from NASA Astronomy Picture of the Day API'
    };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : 'Network error';
    // Graceful fallback to verified curated observation
    return {
      data: DISCOVERIES[0],
      isLive: false,
      error: errorMsg,
      sourceNote: 'Curated deep-space observation (NASA APOD offline/rate-limit fallback)'
    };
  }
}
