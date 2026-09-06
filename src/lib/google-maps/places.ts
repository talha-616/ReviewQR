import type { SelectedPlace } from "@/types";
import { getGoogleReviewUrl } from "@/lib/google-maps/review-url";

export interface PlaceSuggestion {
  placeId: string;
  name: string;
  address: string;
}

export async function searchPlaceSuggestions(input: string): Promise<PlaceSuggestion[]> {
  const query = input.trim();
  if (query.length < 2) return [];

  const { AutocompleteSuggestion } = (await google.maps.importLibrary(
    "places",
  )) as google.maps.PlacesLibrary;

  const { suggestions } = await AutocompleteSuggestion.fetchAutocompleteSuggestions({
    input: query,
  });

  return (suggestions ?? [])
    .map((item) => {
      const prediction = item.placePrediction;
      if (!prediction) return null;
      return {
        placeId: prediction.placeId,
        name: prediction.mainText?.text ?? prediction.text.text,
        address: prediction.secondaryText?.text ?? "",
      } satisfies PlaceSuggestion;
    })
    .filter((item): item is PlaceSuggestion => Boolean(item));
}

export async function fetchPlaceDetails(placeId: string): Promise<SelectedPlace> {
  const { Place } = (await google.maps.importLibrary("places")) as google.maps.PlacesLibrary;
  const place = new Place({ id: placeId });
  await place.fetchFields({
    fields: [
      "id",
      "displayName",
      "formattedAddress",
      "location",
      "rating",
      "userRatingCount",
      "googleMapsURI",
    ],
  });

  const id = place.id ?? placeId;
  return {
    placeId: id,
    name: place.displayName ?? "Selected location",
    address: place.formattedAddress ?? "",
    lat: place.location?.lat() ?? null,
    lng: place.location?.lng() ?? null,
    rating: place.rating ?? null,
    ratingCount: place.userRatingCount ?? null,
    mapsUri: place.googleMapsURI ?? null,
  };
}

export async function findPlaceNear(lat: number, lng: number): Promise<SelectedPlace | null> {
  const { Place } = (await google.maps.importLibrary("places")) as google.maps.PlacesLibrary;
  try {
    const { places } = await Place.searchNearby({
      fields: [
        "id",
        "displayName",
        "formattedAddress",
        "location",
        "rating",
        "userRatingCount",
        "googleMapsURI",
      ],
      locationRestriction: {
        center: { lat, lng },
        radius: 80,
      },
      rankPreference: "DISTANCE",
      maxResultCount: 3,
    });
    const match = places?.[0];
    if (match?.id) {
      return {
        placeId: match.id,
        name: match.displayName ?? "Selected location",
        address: match.formattedAddress ?? "",
        lat: match.location?.lat() ?? lat,
        lng: match.location?.lng() ?? lng,
        rating: match.rating ?? null,
        ratingCount: match.userRatingCount ?? null,
        mapsUri: match.googleMapsURI ?? null,
      };
    }
  } catch {
    // Fall through to geocoder.
  }

  const geocoder = new google.maps.Geocoder();
  const response = await geocoder.geocode({ location: { lat, lng } });
  const result = response.results[0];
  if (!result?.place_id) return null;
  return {
    placeId: result.place_id,
    name: result.address_components?.[0]?.long_name ?? result.formatted_address,
    address: result.formatted_address,
    lat,
    lng,
    rating: null,
    ratingCount: null,
    mapsUri: null,
  };
}

export function reviewUrlForPlace(place: SelectedPlace) {
  return getGoogleReviewUrl(place.placeId);
}
