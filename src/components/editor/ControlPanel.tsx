"use client";

import { useRef, useState } from "react";
import {
  AlertTriangle,
  Grid,
  Image as ImageIcon,
  LayoutGrid,
  Palette,
  QrCode,
  Sliders,
  Type,
  Upload,
  Check,
} from "lucide-react";
import { CTA_PRESETS, COLOR_PRESETS, FONT_OPTIONS, GRADIENT_PRESETS, QR_STYLES, SOLID_SWATCHES } from "@/lib/presets";
import { PRINT_SIZES } from "@/lib/export/print-sizes";
import { readAndResizeImage } from "@/lib/image/process";
import { templates, templateCategories } from "@/templates";
import { useEditorStore } from "@/store/editor-store";
import { hasQrContrast } from "@/lib/utils";
import type { AbstractPattern, BackgroundKind, BusinessTexture, CardFontId, LayoutVariant, PrintSizeId, TemplateCategory } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

type TabId = "templates" | "text" | "layout" | "colors" | "qr" | "logo";

function ColorField({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs font-semibold text-ink">
        {label}
      </Label>
      <div className="flex gap-2">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-border/80 shadow-2xs">
          <input
            id={id}
            type="color"
            value={value && value.length === 7 ? value : "#14110f"}
            onChange={(event) => onChange(event.target.value)}
            className="h-14 w-14 -translate-x-2 -translate-y-2 cursor-pointer border-0 p-0"
            aria-label={label}
          />
        </div>
        <Input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-10 rounded-xl font-mono text-xs uppercase"
        />
      </div>
    </div>
  );
}

function TemplatePicker({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const [category, setCategory] = useState<"All" | TemplateCategory>("All");
  const visible =
    category === "All" ? templates : templates.filter((template) => template.category === category);

  return (
    <div className="w-full min-w-0 space-y-4">
      <div className="flex w-full min-w-0 gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]">
        {(["All", ...templateCategories] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`min-h-8 shrink-0 rounded-full px-3.5 text-xs font-semibold transition-all ${
              category === item
                ? "bg-ink text-white shadow-xs"
                : "border border-border/80 bg-white text-ink/80 hover:bg-paper-2"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {visible.map((template) => {
          const active = activeId === template.id;
          const bg = template.config.background;
          const fill = bg.secondaryColor
            ? `linear-gradient(${bg.gradientAngle ?? 160}deg, ${bg.color}, ${bg.secondaryColor})`
            : bg.color;
          return (
            <button
              key={template.id}
              type="button"
              onClick={() => onSelect(template.id)}
              className={`group relative rounded-2xl border p-2 text-left transition-all duration-200 ${
                active
                  ? "border-accent bg-accent-light/30 ring-2 ring-accent/20 shadow-sm"
                  : "border-border/80 bg-white hover:border-ink/30 hover:shadow-xs"
              }`}
            >
              <div
                className="flex aspect-[4/3] flex-col items-center justify-center gap-1.5 overflow-hidden rounded-xl shadow-2xs"
                style={{ background: fill }}
              >
                <span
                  className="max-w-[85%] truncate text-[11px] font-bold"
                  style={{ color: template.config.colors.text }}
                >
                  {template.name}
                </span>
                <span
                  className="h-7 w-7 rounded-sm shadow-xs"
                  style={{
                    background: template.config.colors.qrBackground,
                    boxShadow: `inset 0 0 0 1.5px ${template.config.colors.qr}`,
                  }}
                />
              </div>
              <div className="mt-2 flex items-center justify-between px-1">
                <div>
                  <p className="text-xs font-bold text-ink">{template.name}</p>
                  <p className="text-[10px] text-muted">{template.category}</p>
                </div>
                {active && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white">
                    <Check className="h-3 w-3" />
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ControlPanel() {
  const design = useEditorStore((s) => s.design);
  const setTemplate = useEditorStore((s) => s.setTemplate);
  const patchDesign = useEditorStore((s) => s.patchDesign);
  const patchNested = useEditorStore((s) => s.patchNested);

  const fileBg = useRef<HTMLInputElement>(null);
  const fileLogo = useRef<HTMLInputElement>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("templates");
  const [textSection, setTextSection] = useState<"name" | "message" | "cta">("name");
  const [customCta, setCustomCta] = useState(!CTA_PRESETS.includes(design.cta as (typeof CTA_PRESETS)[number]));

  async function onBackgroundFile(file?: File) {
    if (!file) return;
    try {
      const src = await readAndResizeImage(file, 1920);
      patchNested("background", {
        kind: "custom",
        customImage: src,
        overlayOpacity: 35,
        overlay: "#1a1410",
      });
      setImageError(null);
    } catch {
      setImageError("Please choose a JPG, PNG, or WebP under 12MB.");
    }
  }

  async function onLogoFile(file?: File) {
    if (!file) return;
    try {
      const src = await readAndResizeImage(file, 800);
      patchNested("logo", { src, size: design.logo.size || 14 });
      setImageError(null);
    } catch {
      setImageError("Please choose a JPG, PNG, or WebP under 12MB.");
    }
  }

  const tabs: { id: TabId; label: string; icon: typeof LayoutGrid }[] = [
    { id: "templates", label: "Templates", icon: LayoutGrid },
    { id: "text", label: "Text", icon: Type },
    { id: "layout", label: "Layout", icon: Sliders },
    { id: "colors", label: "Colors", icon: Palette },
    { id: "qr", label: "QR Style", icon: QrCode },
    { id: "logo", label: "Logo", icon: ImageIcon },
  ];

  const layoutVariants: { id: LayoutVariant; label: string; desc: string }[] = [
    { id: "classic", label: "Classic", desc: "Balanced top-to-bottom layout" },
    { id: "qr-hero", label: "QR Hero", desc: "Large scannable QR at the top" },
    { id: "editorial", label: "Editorial", desc: "Serif focus with CTA before QR" },
    { id: "footer-qr", label: "Footer QR", desc: "QR pinned to the bottom" },
    { id: "framed-center", label: "Framed Center", desc: "Centred with ornamental box" },
  ];

  const isQrContrastSafe = hasQrContrast(design.colors.qr, design.colors.qrBackground, 4.0);

  return (
    <div className="flex h-full w-full min-w-0 flex-col overflow-hidden bg-white">
      {/* Top Segmented Navigation Tabs */}
      <div className="w-full border-b border-border/80 bg-paper-2/40 p-2">
        <div className="grid w-full grid-cols-6 gap-1">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={`flex flex-col items-center justify-center rounded-xl py-2 transition-all ${
                  active
                    ? "bg-white text-ink shadow-xs ring-1 ring-border/80"
                    : "text-muted hover:bg-white/60 hover:text-ink"
                }`}
                title={t.label}
              >
                <Icon className={`h-4 w-4 ${active ? "text-accent" : ""}`} />
                <span className="mt-1 text-[10px] font-bold">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Tab Content Scroll Area */}
      <ScrollArea className="flex-1 w-full min-w-0">
        <div className="w-full min-w-0 p-4 pb-28 sm:p-5">
          {/* TAB 1: TEMPLATES */}
          {activeTab === "templates" && (
            <div className="space-y-4">
              <div>
                <h2 className="text-base font-bold tracking-tight text-ink">Choose Starter Template</h2>
                <p className="mt-0.5 text-xs text-muted">
                  Selecting a template updates styling while keeping your business name & review link.
                </p>
              </div>
              <TemplatePicker activeId={design.templateId} onSelect={setTemplate} />
            </div>
          )}

          {/* TAB 2: TEXT & TYPOGRAPHY */}
          {activeTab === "text" && (
            <div className="space-y-5">
              <div>
                <h2 className="text-base font-bold tracking-tight text-ink">Text & Typography</h2>
                <p className="mt-0.5 text-xs text-muted">Customize typography, colors, and content for all text layers.</p>
              </div>

              {/* Text Layer Switcher */}
              <div className="grid grid-cols-3 gap-1.5 rounded-xl bg-paper-2/60 p-1">
                {(["name", "message", "cta"] as const).map((sec) => (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => setTextSection(sec)}
                    className={`rounded-lg py-1.5 text-xs font-bold capitalize transition-all ${
                      textSection === sec ? "bg-white text-ink shadow-2xs" : "text-muted hover:text-ink"
                    }`}
                  >
                    {sec === "name" ? "Name" : sec === "message" ? "Message" : "CTA"}
                  </button>
                ))}
              </div>

              {/* LAYER: BUSINESS NAME */}
              {textSection === "name" && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="biz-name" className="text-xs font-semibold text-ink">
                      Business / Organization Name
                    </Label>
                    <Input
                      id="biz-name"
                      value={design.businessName}
                      onChange={(event) => patchDesign({ businessName: event.target.value })}
                      className="rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-ink">Font Family</Label>
                      <Select
                        value={design.businessNameStyle.font}
                        onValueChange={(value) => patchNested("businessNameStyle", { font: value as CardFontId })}
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {FONT_OPTIONS.map((font) => (
                            <SelectItem key={font.id} value={font.id}>
                              {font.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-semibold text-ink">Weight</Label>
                        <span className="text-[11px] font-mono text-muted">{design.businessNameStyle.weight}</span>
                      </div>
                      <Slider
                        min={400}
                        max={700}
                        step={50}
                        value={[design.businessNameStyle.weight]}
                        onValueChange={([value]) => patchNested("businessNameStyle", { weight: value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-semibold text-ink">Font Size</Label>
                      <span className="text-[11px] font-mono text-muted">{design.businessNameStyle.size}px</span>
                    </div>
                    <Slider
                      min={18}
                      max={56}
                      value={[design.businessNameStyle.size]}
                      onValueChange={([value]) => patchNested("businessNameStyle", { size: value })}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-semibold text-ink">Letter Spacing</Label>
                      <span className="text-[11px] font-mono text-muted">{design.businessNameStyle.letterSpacing}px</span>
                    </div>
                    <Slider
                      min={-1.5}
                      max={6}
                      step={0.1}
                      value={[design.businessNameStyle.letterSpacing]}
                      onValueChange={([value]) => patchNested("businessNameStyle", { letterSpacing: value })}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-ink">Alignment</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["left", "center", "right"] as const).map((align) => (
                        <Button
                          key={align}
                          type="button"
                          variant={design.businessNameStyle.align === align ? "default" : "outline"}
                          size="sm"
                          className="capitalize rounded-xl"
                          onClick={() => {
                            patchNested("businessNameStyle", { align });
                            patchNested("layout", { contentAlign: align });
                          }}
                        >
                          {align}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <ColorField
                    id="name-color"
                    label="Name Color"
                    value={design.businessNameStyle.color}
                    onChange={(color) => patchNested("businessNameStyle", { color })}
                  />
                </div>
              )}

              {/* LAYER: MESSAGE / SUBTITLE */}
              {textSection === "message" && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-xs font-semibold text-ink">
                      Optional Message / Subtitle
                    </Label>
                    <Input
                      id="message"
                      value={design.message}
                      onChange={(event) => patchDesign({ message: event.target.value })}
                      placeholder="e.g. Your feedback means a lot to us!"
                      className="rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-ink">Font Family</Label>
                      <Select
                        value={design.messageStyle.font}
                        onValueChange={(value) => patchNested("messageStyle", { font: value as CardFontId })}
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {FONT_OPTIONS.map((font) => (
                            <SelectItem key={font.id} value={font.id}>
                              {font.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-semibold text-ink">Font Size</Label>
                        <span className="text-[11px] font-mono text-muted">{design.messageStyle.size}px</span>
                      </div>
                      <Slider
                        min={10}
                        max={32}
                        value={[design.messageStyle.size]}
                        onValueChange={([value]) => patchNested("messageStyle", { size: value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-semibold text-ink">Font Weight</Label>
                      <span className="text-[11px] font-mono text-muted">{design.messageStyle.weight}</span>
                    </div>
                    <Slider
                      min={300}
                      max={700}
                      step={50}
                      value={[design.messageStyle.weight]}
                      onValueChange={([value]) => patchNested("messageStyle", { weight: value })}
                    />
                  </div>

                  <ColorField
                    id="message-color"
                    label="Message Color"
                    value={design.messageStyle.color}
                    onChange={(color) => patchNested("messageStyle", { color })}
                  />
                </div>
              )}

              {/* LAYER: CALL TO ACTION */}
              {textSection === "cta" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-ink">Preset CTAs</Label>
                    <div className="grid grid-cols-1 gap-1.5">
                      {CTA_PRESETS.map((cta) => (
                        <button
                          key={cta}
                          type="button"
                          className={`rounded-xl border px-3 py-2 text-left text-xs font-medium transition-all ${
                            design.cta === cta && !customCta
                              ? "border-accent bg-accent-light/30 text-accent font-semibold"
                              : "border-border/80 hover:bg-paper-2"
                          }`}
                          onClick={() => {
                            setCustomCta(false);
                            patchDesign({ cta });
                          }}
                        >
                          {cta}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-semibold text-ink">Custom CTA Text</Label>
                      <Switch checked={customCta} onCheckedChange={setCustomCta} />
                    </div>
                    {customCta && (
                      <Input
                        value={design.cta}
                        onChange={(event) => patchDesign({ cta: event.target.value })}
                        placeholder="e.g. Leave us a review on Google!"
                        className="rounded-xl mt-1.5"
                      />
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-ink">CTA Font</Label>
                      <Select
                        value={design.ctaStyle.font}
                        onValueChange={(value) => patchNested("ctaStyle", { font: value as CardFontId })}
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {FONT_OPTIONS.map((font) => (
                            <SelectItem key={font.id} value={font.id}>
                              {font.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-semibold text-ink">Size</Label>
                        <span className="text-[11px] font-mono text-muted">{design.ctaStyle.size}px</span>
                      </div>
                      <Slider
                        min={10}
                        max={28}
                        value={[design.ctaStyle.size]}
                        onValueChange={([value]) => patchNested("ctaStyle", { size: value })}
                      />
                    </div>
                  </div>

                  <ColorField
                    id="cta-color"
                    label="CTA Color"
                    value={design.ctaStyle.color}
                    onChange={(color) => patchNested("ctaStyle", { color })}
                  />
                </div>
              )}

              <div className="space-y-1.5 pt-2 border-t border-border/80">
                <Label htmlFor="review-url" className="text-xs font-semibold text-ink">
                  Target Google Review Link
                </Label>
                <Input
                  id="review-url"
                  value={design.reviewUrl}
                  onChange={(event) => patchDesign({ reviewUrl: event.target.value })}
                  placeholder="https://search.google.com/local/writereview?placeid=…"
                  className="rounded-xl font-mono text-xs"
                />
              </div>
            </div>
          )}

          {/* TAB 3: LAYOUT & PRINT SIZE */}
          {activeTab === "layout" && (
            <div className="space-y-5">
              <div>
                <h2 className="text-base font-bold tracking-tight text-ink">Layout & Dimensions</h2>
                <p className="mt-0.5 text-xs text-muted">Adjust print dimensions, component spacing, and decorative elements.</p>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-semibold text-ink">Print Size</Label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.values(PRINT_SIZES).map((size) => (
                    <button
                      key={size.id}
                      type="button"
                      className={`rounded-2xl border px-3 py-2.5 text-left transition-all ${
                        design.printSize === size.id
                          ? "border-accent bg-accent-light/30 ring-1 ring-accent/20"
                          : "border-border/80 hover:border-ink/30 bg-white"
                      }`}
                      onClick={() => patchDesign({ printSize: size.id as PrintSizeId })}
                    >
                      <span className="block text-xs font-bold text-ink">{size.name}</span>
                      <span className="text-[10px] text-muted line-clamp-1">{size.hint}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-semibold text-ink">Layout Variant</Label>
                <div className="grid grid-cols-1 gap-2">
                  {layoutVariants.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      className={`rounded-2xl border px-3.5 py-2.5 text-left transition-all ${
                        design.layout.variant === v.id
                          ? "border-accent bg-accent-light/30 ring-1 ring-accent/20"
                          : "border-border/80 hover:border-ink/30 bg-white"
                      }`}
                      onClick={() => patchNested("layout", { variant: v.id })}
                    >
                      <span className="block text-xs font-bold text-ink">{v.label}</span>
                      <span className="text-[10px] text-muted">{v.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-border/80">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-semibold text-ink">QR Code Scale</Label>
                    <span className="text-[11px] font-mono text-muted">{Math.round(design.layout.qrScale * 100)}%</span>
                  </div>
                  <Slider
                    min={0.25}
                    max={0.60}
                    step={0.01}
                    value={[design.layout.qrScale]}
                    onValueChange={([value]) => patchNested("layout", { qrScale: value })}
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-semibold text-ink">Outer Padding</Label>
                    <span className="text-[11px] font-mono text-muted">{design.layout.padding}%</span>
                  </div>
                  <Slider
                    min={4}
                    max={16}
                    step={0.5}
                    value={[design.layout.padding]}
                    onValueChange={([value]) => patchNested("layout", { padding: value })}
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-semibold text-ink">Corner Radius</Label>
                    <span className="text-[11px] font-mono text-muted">{design.layout.radius}px</span>
                  </div>
                  <Slider
                    min={0}
                    max={36}
                    step={2}
                    value={[design.layout.radius]}
                    onValueChange={([value]) => patchNested("layout", { radius: value })}
                  />
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-border/80">
                <div className="flex items-center justify-between">
                  <Label htmlFor="stars" className="text-xs font-semibold text-ink">Show 5-Star Rating Row</Label>
                  <Switch
                    id="stars"
                    checked={design.layout.showStars}
                    onCheckedChange={(showStars) => patchNested("layout", { showStars })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="frame" className="text-xs font-semibold text-ink">Show Border Frame</Label>
                  <Switch
                    id="frame"
                    checked={design.layout.showFrame}
                    onCheckedChange={(showFrame) => patchNested("layout", { showFrame })}
                  />
                </div>

                {design.layout.showFrame && (
                  <ColorField
                    id="frame-color"
                    label="Frame Border Color"
                    value={design.layout.frameColor || design.colors.primary}
                    onChange={(frameColor) => patchNested("layout", { frameColor })}
                  />
                )}
              </div>
            </div>
          )}

          {/* TAB 4: COLORS & BACKGROUND */}
          {activeTab === "colors" && (
            <div className="space-y-5">
              <div>
                <h2 className="text-base font-bold tracking-tight text-ink">Colors & Background</h2>
                <p className="mt-0.5 text-xs text-muted">Customize background styles, color palettes, textures, and image filters.</p>
              </div>

              {/* Color Presets */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-ink">Color Palette Presets</Label>
                <div className="grid grid-cols-2 gap-2">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      className="flex items-center gap-2 rounded-xl border border-border/80 bg-white p-2.5 text-left text-xs transition-all hover:border-ink/30"
                      onClick={() =>
                        patchDesign({
                          colors: {
                            primary: preset.primary,
                            text: preset.text,
                            background: preset.background,
                            qr: preset.qr,
                            qrBackground: preset.qrBackground,
                            accent: preset.accent,
                          },
                          background: {
                            ...design.background,
                            color: preset.background,
                            kind: preset.background === "#12100e" ? "solid" : design.background.kind,
                          },
                          businessNameStyle: { ...design.businessNameStyle, color: preset.text },
                          messageStyle: { ...design.messageStyle, color: preset.text },
                          ctaStyle: { ...design.ctaStyle, color: preset.primary },
                        })
                      }
                    >
                      <span className="flex shrink-0 gap-1">
                        <span className="h-3.5 w-3.5 rounded-full border border-black/10" style={{ background: preset.background }} />
                        <span className="h-3.5 w-3.5 rounded-full" style={{ background: preset.primary }} />
                        <span className="h-3.5 w-3.5 rounded-full" style={{ background: preset.accent }} />
                      </span>
                      <span className="font-semibold text-ink line-clamp-1">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Background Kind Selector */}
              <div className="space-y-3 pt-2 border-t border-border/80">
                <Label className="text-xs font-semibold text-ink">Background Type</Label>
                <div className="grid grid-cols-3 gap-1.5 rounded-xl bg-paper-2/60 p-1">
                  {(["solid", "gradient", "abstract", "business", "custom"] as BackgroundKind[]).map((kind) => (
                    <button
                      key={kind}
                      type="button"
                      className={`rounded-lg py-1.5 text-xs font-bold capitalize transition-all ${
                        design.background.kind === kind
                          ? "bg-white text-ink shadow-2xs"
                          : "text-muted hover:text-ink"
                      }`}
                      onClick={() => patchNested("background", { kind })}
                    >
                      {kind}
                    </button>
                  ))}
                </div>

                {/* SOLID */}
                {design.background.kind === "solid" && (
                  <div className="space-y-3 pt-2">
                    <div className="flex flex-wrap gap-2">
                      {SOLID_SWATCHES.map((swatch) => (
                        <button
                          key={swatch.name}
                          type="button"
                          className="h-9 w-9 rounded-xl border border-border/80 shadow-2xs transition-transform hover:scale-105"
                          style={{ background: swatch.color }}
                          aria-label={swatch.name}
                          onClick={() =>
                            patchNested("background", { kind: "solid", color: swatch.color, customImage: null })
                          }
                        />
                      ))}
                    </div>
                    <ColorField
                      id="bg-color"
                      label="Solid Background Color"
                      value={design.background.color}
                      onChange={(color) => {
                        patchNested("background", { kind: "solid", color });
                        patchNested("colors", { background: color });
                      }}
                    />
                  </div>
                )}

                {/* GRADIENT */}
                {design.background.kind === "gradient" && (
                  <div className="space-y-3 pt-2">
                    <div className="grid grid-cols-3 gap-2">
                      {GRADIENT_PRESETS.map((preset) => (
                        <button
                          key={preset.name}
                          type="button"
                          className="h-12 rounded-xl border border-border/80 shadow-2xs transition-transform hover:scale-105"
                          style={{
                            background: `linear-gradient(${preset.angle}deg, ${preset.color}, ${preset.secondaryColor})`,
                          }}
                          aria-label={preset.name}
                          onClick={() =>
                            patchNested("background", {
                              kind: "gradient",
                              color: preset.color,
                              secondaryColor: preset.secondaryColor,
                              gradientAngle: preset.angle,
                            })
                          }
                        />
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <ColorField
                        id="bg-grad-1"
                        label="Start Color"
                        value={design.background.color}
                        onChange={(color) => patchNested("background", { color })}
                      />
                      <ColorField
                        id="bg-grad-2"
                        label="End Color"
                        value={design.background.secondaryColor || design.background.color}
                        onChange={(secondaryColor) => patchNested("background", { secondaryColor })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-semibold text-ink">Gradient Angle</Label>
                        <span className="text-[11px] font-mono text-muted">{design.background.gradientAngle ?? 160}°</span>
                      </div>
                      <Slider
                        min={0}
                        max={360}
                        step={10}
                        value={[design.background.gradientAngle ?? 160]}
                        onValueChange={([gradientAngle]) => patchNested("background", { gradientAngle })}
                      />
                    </div>
                  </div>
                )}

                {/* ABSTRACT PATTERN */}
                {design.background.kind === "abstract" && (
                  <div className="space-y-2 pt-2">
                    <Label className="text-xs font-semibold text-ink">Pattern Style</Label>
                    <Select
                      value={design.background.pattern}
                      onValueChange={(value) =>
                        patchNested("background", { kind: "abstract", pattern: value as AbstractPattern })
                      }
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["none", "orbs", "waves", "geometric", "dots", "grain", "glass"].map((pattern) => (
                          <SelectItem key={pattern} value={pattern} className="capitalize">
                            {pattern}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* BUSINESS TEXTURE */}
                {design.background.kind === "business" && (
                  <div className="space-y-2 pt-2">
                    <Label className="text-xs font-semibold text-ink">Business Texture</Label>
                    <Select
                      value={design.background.texture}
                      onValueChange={(value) =>
                        patchNested("background", { kind: "business", texture: value as BusinessTexture })
                      }
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["none", "restaurant", "cafe", "hotel", "office", "retail", "salon", "healthcare"].map(
                          (texture) => (
                            <SelectItem key={texture} value={texture} className="capitalize">
                              {texture}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* CUSTOM IMAGE */}
                {design.background.kind === "custom" && (
                  <div className="space-y-3 pt-2">
                    <input
                      ref={fileBg}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="sr-only"
                      onChange={(event) => void onBackgroundFile(event.target.files?.[0])}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full gap-2 rounded-xl"
                      onClick={() => fileBg.current?.click()}
                    >
                      <Upload className="h-4 w-4" />
                      {design.background.customImage ? "Change Custom Background Image" : "Upload Background Image"}
                    </Button>
                    {design.background.customImage && (
                      <div className="space-y-3 rounded-2xl border border-border/80 p-3 bg-paper-2/30">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <Label className="text-xs font-semibold text-ink">Zoom</Label>
                            <span className="text-[11px] font-mono text-muted">{design.background.imageZoom.toFixed(2)}x</span>
                          </div>
                          <Slider
                            min={1}
                            max={2.4}
                            step={0.05}
                            value={[design.background.imageZoom]}
                            onValueChange={([value]) => patchNested("background", { imageZoom: value })}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <Label className="text-xs font-semibold text-ink">Overlay Opacity</Label>
                            <span className="text-[11px] font-mono text-muted">{design.background.overlayOpacity}%</span>
                          </div>
                          <Slider
                            min={0}
                            max={80}
                            value={[design.background.overlayOpacity]}
                            onValueChange={([value]) => patchNested("background", { overlayOpacity: value })}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <Label className="text-xs font-semibold text-ink">Blur</Label>
                            <span className="text-[11px] font-mono text-muted">{design.background.blur}px</span>
                          </div>
                          <Slider
                            min={0}
                            max={16}
                            value={[design.background.blur]}
                            onValueChange={([value]) => patchNested("background", { blur: value })}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* INDIVIDUAL COLOR PICKERS */}
              <div className="space-y-3 pt-2 border-t border-border/80">
                <Label className="text-xs font-semibold text-ink">Individual Element Colors</Label>
                <div className="grid grid-cols-2 gap-3">
                  <ColorField id="clr-primary" label="Primary Accent" value={design.colors.primary} onChange={(primary) => patchNested("colors", { primary })} />
                  <ColorField id="clr-accent" label="Secondary Accent" value={design.colors.accent} onChange={(accent) => patchNested("colors", { accent })} />
                  <ColorField id="clr-text" label="Default Text" value={design.colors.text} onChange={(text) => patchNested("colors", { text })} />
                  <ColorField id="clr-qr" label="QR Foreground" value={design.colors.qr} onChange={(qr) => patchNested("colors", { qr })} />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: QR CODE STYLING */}
          {activeTab === "qr" && (
            <div className="space-y-5">
              <div>
                <h2 className="text-base font-bold tracking-tight text-ink">QR Code Customization</h2>
                <p className="mt-0.5 text-xs text-muted">Select module shapes, background pads, and check scan contrast.</p>
              </div>

              {/* Contrast Warning Banner */}
              {!isQrContrastSafe && (
                <div className="flex items-start gap-2.5 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-900">
                  <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-bold">Low QR Contrast Warning</p>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-amber-800">
                      The QR foreground and background colors have low contrast. Phone cameras might struggle to scan this card.
                    </p>
                  </div>
                </div>
              )}

              {/* QR Colors */}
              <div className="grid grid-cols-2 gap-3">
                <ColorField
                  id="qr-fg-color"
                  label="QR Module Color"
                  value={design.colors.qr}
                  onChange={(qr) => patchNested("colors", { qr })}
                />
                <ColorField
                  id="qr-bg-color"
                  label="QR Card Background"
                  value={design.colors.qrBackground}
                  onChange={(qrBackground) => patchNested("colors", { qrBackground })}
                />
              </div>

              {/* QR Styles Grid */}
              <div className="space-y-2 pt-2 border-t border-border/80">
                <Label className="text-xs font-semibold text-ink">Module Dot Style</Label>
                <div className="grid grid-cols-2 gap-2">
                  {QR_STYLES.map((style) => (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => patchDesign({ qrStyle: style.id })}
                      className={`rounded-2xl border p-3 text-left transition-all ${
                        design.qrStyle === style.id
                          ? "border-accent bg-accent-light/30 ring-1 ring-accent/20"
                          : "border-border/80 hover:border-ink/30 bg-white"
                      }`}
                    >
                      <span className="block text-xs font-bold text-ink">{style.name}</span>
                      <span className="text-[10px] text-muted line-clamp-1">{style.description}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* GOOGLE LOGO & BADGE TOGGLE */}
              <div className="space-y-3 pt-3 border-t border-border/80">
                <div className="flex items-center justify-between">
                  <Label htmlFor="google-badge-toggle" className="text-xs font-bold text-ink">
                    Show Google Icon / Badge
                  </Label>
                  <Switch
                    id="google-badge-toggle"
                    checked={design.layout.showGoogleBadge !== false}
                    onCheckedChange={(showGoogleBadge) => patchNested("layout", { showGoogleBadge })}
                  />
                </div>

                {design.layout.showGoogleBadge !== false && (
                  <div className="space-y-3 rounded-2xl border border-border/80 p-3.5 bg-paper-2/30">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-ink">Google Logo Placement</Label>
                      <Select
                        value={design.layout.googleBadgePosition || "above-qr"}
                        onValueChange={(val) =>
                          patchNested("layout", {
                            googleBadgePosition: val as "above-qr" | "top" | "below-qr" | "qr-center",
                          })
                        }
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="above-qr">Above QR Code</SelectItem>
                          <SelectItem value="qr-center">QR Code Center Overlay</SelectItem>
                          <SelectItem value="top">Top Header</SelectItem>
                          <SelectItem value="below-qr">Below QR Code</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-ink">Logo Visual Style</Label>
                      <Select
                        value={design.layout.googleBadgeStyle || "multicolor"}
                        onValueChange={(val) =>
                          patchNested("layout", {
                            googleBadgeStyle: val as "multicolor" | "monochrome" | "pill",
                          })
                        }
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="multicolor">Official 4-Color Google G</SelectItem>
                          <SelectItem value="pill">Pill Badge ("Google Reviews")</SelectItem>
                          <SelectItem value="monochrome">Monochrome (Theme Matching)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 6: LOGO & BRAND */}
          {activeTab === "logo" && (
            <div className="space-y-5">
              <div>
                <h2 className="text-base font-bold tracking-tight text-ink">Logo & Brand Mark</h2>
                <p className="mt-0.5 text-xs text-muted">Upload your brand logo for card placement without obscuring the QR code.</p>
              </div>

              <input
                ref={fileLogo}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                onChange={(event) => void onLogoFile(event.target.files?.[0])}
              />
              <Button
                type="button"
                variant="outline"
                className="w-full gap-2 rounded-xl py-5"
                onClick={() => fileLogo.current?.click()}
              >
                <Upload className="h-4 w-4" />
                {design.logo.src ? "Replace Brand Logo" : "Upload Brand Logo"}
              </Button>

              {design.logo.src && (
                <div className="space-y-4 rounded-2xl border border-border/80 p-4 bg-paper-2/30">
                  <div className="flex items-center gap-3">
                    <img src={design.logo.src} alt="Uploaded logo" className="h-12 w-12 object-contain rounded-lg border bg-white p-1" />
                    <div>
                      <p className="text-xs font-bold text-ink">Brand Logo Loaded</p>
                      <p className="text-[10px] text-muted">Positioned safely beside QR code</p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-semibold text-ink">Logo Scale</Label>
                      <span className="text-[11px] font-mono text-muted">{design.logo.size}%</span>
                    </div>
                    <Slider
                      min={5}
                      max={60}
                      step={1}
                      value={[design.logo.size]}
                      onValueChange={([value]) => patchNested("logo", { size: value })}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-ink">Placement Position</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        variant={design.logo.position === "top" ? "default" : "outline"}
                        size="sm"
                        className="rounded-xl"
                        onClick={() => patchNested("logo", { position: "top" })}
                      >
                        Top Header
                      </Button>
                      <Button
                        type="button"
                        variant={design.logo.position === "above-qr" ? "default" : "outline"}
                        size="sm"
                        className="rounded-xl"
                        onClick={() => patchNested("logo", { position: "above-qr" })}
                      >
                        Above QR Code
                      </Button>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs text-accent hover:bg-accent-light/50"
                    onClick={() => patchNested("logo", { src: null })}
                  >
                    Remove Logo
                  </Button>
                </div>
              )}
            </div>
          )}

          {imageError && <p className="mt-3 text-xs text-accent">{imageError}</p>}
        </div>
      </ScrollArea>
    </div>
  );
}
