import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { DesignState, SelectedPlace } from "@/types";
import { createDesignFromTemplate, getTemplate, templates } from "@/templates";
import { getGoogleReviewUrl } from "@/lib/google-maps/review-url";

interface EditorStore {
  place: SelectedPlace | null;
  design: DesignState;
  setPlace: (place: SelectedPlace) => void;
  setReviewUrl: (url: string) => void;
  setTemplate: (templateId: string) => void;
  patchDesign: (patch: Partial<DesignState>) => void;
  patchNested: <K extends keyof DesignState>(key: K, patch: Partial<DesignState[K]>) => void;
  resetSession: () => void;
}

const defaultDesign = createDesignFromTemplate(templates[0]);

export const useEditorStore = create<EditorStore>()(
  persist(
    (set, get) => ({
      place: null,
      design: defaultDesign,
      setPlace: (place) => {
        const reviewUrl = getGoogleReviewUrl(place.placeId);
        const current = get().design;
        set({
          place,
          design: {
            ...current,
            businessName: place.name || current.businessName,
            reviewUrl,
          },
        });
      },
      setReviewUrl: (url) => {
        set({ design: { ...get().design, reviewUrl: url } });
      },
      setTemplate: (templateId) => {
        const template = getTemplate(templateId);
        const current = get().design;
        set({
          design: createDesignFromTemplate(template, {
            businessName: current.businessName,
            message: current.message,
            cta: current.cta,
            reviewUrl: current.reviewUrl,
            printSize: current.printSize,
            logo: current.logo,
          }),
        });
      },
      patchDesign: (patch) => {
        set({ design: { ...get().design, ...patch } });
      },
      patchNested: (key, patch) => {
        const current = get().design;
        const existing = current[key];
        set({
          design: {
            ...current,
            [key]:
              existing && typeof existing === "object"
                ? { ...existing, ...patch }
                : patch,
          },
        });
      },
      resetSession: () => set({ place: null, design: defaultDesign }),
    }),
    {
      name: "reviewqr-draft",
      storage: createJSONStorage(() => {
        if (typeof window === "undefined") {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return sessionStorage;
      }),
      skipHydration: true,
      partialize: (state) => ({ place: state.place, design: state.design }),
    },
  ),
);
