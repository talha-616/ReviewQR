"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { APIProvider, AdvancedMarker, Map, useMap } from "@vis.gl/react-google-maps";
import { Loader2, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getGoogleMapsApiKey, getGoogleMapsMapId, isMapsConfigured } from "@/lib/site";
import {
  fetchPlaceDetails,
  findPlaceNear,
  searchPlaceSuggestions,
  type PlaceSuggestion,
} from "@/lib/google-maps/places";
import { isAllowedReviewUrl } from "@/lib/google-maps/review-url";
import { useEditorStore } from "@/store/editor-store";
import { useStoreHydrated } from "@/components/layout/StoreHydration";
import { ToolHeader } from "@/components/layout/ToolHeader";
import type { SelectedPlace } from "@/types";

function Recenter({ place }: { place: SelectedPlace | null }) {
  const map = useMap();
  useEffect(() => {
    if (!map || place?.lat == null || place?.lng == null) return;
    map.panTo({ lat: place.lat, lng: place.lng });
    map.setZoom(16);
  }, [map, place]);
  return null;
}

function LocationWorkspaceInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mapsReady = isMapsConfigured();
  const hydrated = useStoreHydrated();
  const setPlace = useEditorStore((s) => s.setPlace);
  const setReviewUrl = useEditorStore((s) => s.setReviewUrl);
  const setTemplate = useEditorStore((s) => s.setTemplate);
  const patchDesign = useEditorStore((s) => s.patchDesign);
  const selected = useEditorStore((s) => s.place);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PlaceSuggestion[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [manualLink, setManualLink] = useState("");
  const [manualError, setManualError] = useState<string | null>(null);
  const [nameOnly, setNameOnly] = useState("");
  const [loadingPlace, setLoadingPlace] = useState(false);

  useEffect(() => {
    if (!hydrated) return;
    const template = searchParams.get("template");
    if (template) setTemplate(template);
  }, [hydrated, searchParams, setTemplate]);

  useEffect(() => {
    if (!mapsReady) return;
    const handle = window.setTimeout(async () => {
      if (query.trim().length < 2) {
        setResults([]);
        setSearchError(null);
        return;
      }
      setSearching(true);
      try {
        const matches = await searchPlaceSuggestions(query);
        setResults(matches);
        setSearchError(matches.length === 0 ? "Couldn't find that location. Try searching by business name or address." : null);
      } catch {
        setSearchError("Unable to load locations right now. Please try again.");
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, 220);
    return () => window.clearTimeout(handle);
  }, [query, mapsReady]);

  const selectSuggestion = useCallback(
    async (suggestion: PlaceSuggestion) => {
      setLoadingPlace(true);
      setSearchError(null);
      try {
        const place = await fetchPlaceDetails(suggestion.placeId);
        setPlace(place);
      } catch {
        setSearchError("Unable to load locations right now. Please try again.");
      } finally {
        setLoadingPlace(false);
      }
    },
    [setPlace],
  );

  const onMapClick = useCallback(
    async (lat: number, lng: number) => {
      setLoadingPlace(true);
      setMapError(null);
      try {
        const place = await findPlaceNear(lat, lng);
        if (!place) {
          setMapError("Couldn't find that location. Try searching by business name or address.");
          return;
        }
        setPlace(place);
      } catch {
        setMapError("Unable to load locations right now. Please try again.");
      } finally {
        setLoadingPlace(false);
      }
    },
    [setPlace],
  );

  const confirm = () => {
    const linkInput = document.getElementById("manual-link") as HTMLInputElement | null;
    const nameInput = document.getElementById("name-only") as HTMLInputElement | null;
    const link = (manualLink || linkInput?.value || "").trim();
    const name = (nameOnly || nameInput?.value || "").trim();

    if (!selected && !link && !name) return;
    if (name) patchDesign({ businessName: name });
    if (link) {
      if (!isAllowedReviewUrl(link)) {
        setManualError("Please paste a Google review or Maps link.");
        return;
      }
      setReviewUrl(link);
    }
    router.push("/create/design");
  };

  const defaultCenter = useMemo(() => ({ lat: 31.5204, lng: 74.3587 }), []);

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-paper">
      <ToolHeader />
      <div className="mx-auto grid min-h-0 w-full max-w-[1440px] flex-1 overflow-auto lg:grid-cols-[minmax(320px,26rem)_1fr] lg:overflow-hidden">
        <div className="contents lg:flex lg:flex-col lg:border-r lg:border-border/80 lg:bg-white">
          <section className="order-1 border-b border-border/80 bg-white px-5 py-6 sm:px-6 lg:border-b-0">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-accent-light px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent">
              Step 1 of 2
            </div>
            <h1 className="mt-3 font-[family-name:var(--font-fraunces)] text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Select Your Business
            </h1>
            <p className="mt-1.5 text-xs text-muted">
              Search by business name or address, or tap anywhere on the map.
            </p>
            <div className="mt-5">
              <Label htmlFor="place-search" className="text-xs font-bold text-ink">
                Search Google Maps
              </Label>
              <div className="relative mt-2">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <Input
                  id="place-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="e.g. Hearth Coffee Cafe, London"
                  className="rounded-xl border-border/80 bg-paper-2/40 pl-10 pr-4 py-2.5 text-sm transition-all focus:bg-white focus:shadow-xs"
                  disabled={!mapsReady}
                  autoComplete="off"
                />
              </div>
              {!mapsReady && (
                <p className="mt-2.5 rounded-lg border border-amber-500/20 bg-amber-500/5 p-2.5 text-xs text-amber-800">
                  Google Maps search API key is off. You can still paste your review link below to design your card!
                </p>
              )}
            </div>
          </section>

          <div className="order-2 max-h-60 overflow-y-auto border-b border-border/80 bg-white lg:max-h-none lg:flex-1 lg:border-b-0">
            {searching || loadingPlace ? (
              <div className="flex items-center justify-center gap-2.5 px-4 py-8 text-sm font-medium text-muted">
                <Loader2 className="h-5 w-5 animate-spin text-accent" /> Searching Google Places…
              </div>
            ) : searchError ? (
              <p className="px-5 py-6 text-xs leading-relaxed text-accent">{searchError}</p>
            ) : results.length === 0 ? (
              <div className="px-5 py-8 text-center text-xs text-muted">
                {query ? "No matching places found." : "Start typing above to search your Google Maps location."}
              </div>
            ) : (
              <ul className="divide-y divide-border/60">
                {results.map((result) => (
                  <li key={result.placeId}>
                    <button
                      type="button"
                      onClick={() => selectSuggestion(result)}
                      className="group flex min-h-16 w-full flex-col items-start px-5 py-3.5 text-left transition-colors hover:bg-accent-light/40"
                    >
                      <span className="text-sm font-semibold text-ink group-hover:text-accent transition-colors">
                        {result.name}
                      </span>
                      <span className="mt-0.5 text-xs text-muted line-clamp-1">{result.address}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="order-3 space-y-4 bg-white px-5 py-5 sm:px-6 lg:order-3">
            {selected && (
              <div className="relative overflow-hidden rounded-2xl border border-accent/30 bg-accent-light/30 p-4.5 shadow-xs">
                <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Selected Location
                </span>
                <p className="mt-2 text-base font-bold text-ink">{selected.name}</p>
                <p className="mt-0.5 text-xs text-muted">{selected.address}</p>
                {selected.rating ? (
                  <div className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-amber-700">
                    <span>★ {selected.rating.toFixed(1)}</span>
                    <span className="text-muted/60">•</span>
                    <span className="text-muted">{selected.ratingCount ?? 0} Google reviews</span>
                  </div>
                ) : null}
              </div>
            )}

            <details className="group rounded-2xl border border-border/80 p-4 transition-colors hover:border-ink/30">
              <summary className="cursor-pointer text-xs font-bold text-ink min-h-10 flex items-center justify-between">
                <span>Already have a Google review link?</span>
                <span className="text-xs text-accent transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="mt-3.5 space-y-3 pt-2 border-t border-border/60">
                <div>
                  <Label htmlFor="manual-link" className="text-xs font-medium text-muted">Paste Google Review / Maps URL</Label>
                  <Input
                    id="manual-link"
                    value={manualLink}
                    onChange={(event) => {
                      setManualLink(event.target.value);
                      setManualError(null);
                    }}
                    placeholder="https://search.google.com/local/writereview?placeid=…"
                    className="mt-1 rounded-xl text-xs font-mono"
                  />
                  {manualError && <p className="mt-1 text-xs text-accent">{manualError}</p>}
                </div>
                <div>
                  <Label htmlFor="name-only" className="text-xs font-medium text-muted">Business Name (for Card display)</Label>
                  <Input
                    id="name-only"
                    value={nameOnly}
                    onChange={(event) => setNameOnly(event.target.value)}
                    placeholder="e.g. Hearth Coffee House"
                    className="mt-1 rounded-xl text-xs"
                  />
                </div>
              </div>
            </details>

            <Button
              size="lg"
              className="w-full rounded-2xl py-6 text-sm font-bold shadow-md shadow-ink/10 transition-all hover:scale-[1.01]"
              onClick={confirm}
              disabled={!selected && !manualLink.trim() && !nameOnly.trim()}
            >
              {selected ? "Confirm & Customize Card →" : "Continue to Card Studio →"}
            </Button>
          </div>
        </div>

        <section className="relative order-4 min-h-[220px] bg-paper-2 sm:min-h-[280px] lg:order-none lg:min-h-full">
        {mapsReady ? (
          <Map
            defaultCenter={
              selected?.lat != null && selected?.lng != null
                ? { lat: selected.lat, lng: selected.lng }
                : defaultCenter
            }
            defaultZoom={selected ? 16 : 12}
            mapId={getGoogleMapsMapId()}
            gestureHandling="greedy"
            onClick={(event) => {
              event.stop();
              if (event.detail.placeId) {
                void selectSuggestion({
                  placeId: event.detail.placeId,
                  name: "Selected location",
                  address: "",
                });
                return;
              }
              const latLng = event.detail.latLng;
              if (!latLng) return;
              void onMapClick(latLng.lat, latLng.lng);
            }}
          >
            <Recenter place={selected} />
            {selected?.lat != null && selected?.lng != null && (
              <AdvancedMarker position={{ lat: selected.lat, lng: selected.lng }} title={selected.name}>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white shadow-lg">
                  <MapPin className="h-5 w-5" />
                </div>
              </AdvancedMarker>
            )}
          </Map>
        ) : (
          <div className="flex h-full min-h-[320px] flex-col items-center justify-center px-6 text-center">
            <MapPin className="h-8 w-8 text-muted" />
            <p className="mt-3 max-w-sm text-sm text-muted">
              Map search needs a Google Maps API key. You can still paste a review link and design your card.
            </p>
          </div>
        )}
        {mapError && (
          <p className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/95 px-4 py-3 text-sm shadow">
            {mapError}
          </p>
        )}
      </section>
      </div>
    </div>
  );
}

export function LocationWorkspace() {
  const key = getGoogleMapsApiKey();
  if (!key) return <LocationWorkspaceInner />;
  return (
    <APIProvider apiKey={key} libraries={["places", "geocoding", "marker"]}>
      <LocationWorkspaceInner />
    </APIProvider>
  );
}
