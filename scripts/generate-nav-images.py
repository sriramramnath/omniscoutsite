#!/usr/bin/env python3
"""Generate navbar preview images: procedural gradients/patterns + trusted icons."""

from __future__ import annotations

import base64
import io
import math
import random
import re
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1] / "artifacts" / "omniscout"
PUBLIC = ROOT / "public"
NAV_DIR = PUBLIC / "nav"

WIDTH, HEIGHT = 1200, 800
LOGO_MAX = 200

# Match lucide-react in website/artifacts/omniscout/package.json
LUCIDE_VERSION = "0.545.0"

# filename -> (icon source, background style)
# Icon sources:
#   lucide:<name>         — https://lucide.dev (same library used across the site)
#   simple-icons:<name>   — https://simpleicons.org (PyPI, GitHub)
#   local:<path>          — product-specific assets under public/
NAV_ITEMS: list[tuple[str, str, str]] = [
    ("features.jpg", "lucide:layers", "mesh"),
    ("probe-zero.jpg", "local:logos/probe.svg", "radial"),
    ("use-cases.jpg", "lucide:workflow", "diagonal"),
    ("compare.jpg", "lucide:git-compare-arrows", "grid"),
    ("docs.jpg", "lucide:book-open-text", "waves"),
    ("blog.jpg", "lucide:newspaper", "dots"),
    ("changelog.jpg", "lucide:git-commit-horizontal", "concentric"),
    ("pypi.jpg", "simple-icons:pypi", "linear"),
    ("contact.jpg", "lucide:mail", "crosshatch"),
    ("github.jpg", "simple-icons:github", "aurora"),
]

PALETTES: list[list[tuple[int, int, int]]] = [
    [(15, 23, 42), (67, 56, 202), (129, 140, 248)],
    [(17, 24, 39), (14, 116, 144), (34, 211, 238)],
    [(24, 24, 27), (190, 24, 93), (251, 113, 133)],
    [(15, 23, 42), (5, 150, 105), (52, 211, 153)],
    [(23, 23, 23), (180, 83, 9), (251, 191, 36)],
    [(30, 27, 75), (124, 58, 237), (196, 181, 253)],
    [(20, 30, 48), (37, 99, 235), (96, 165, 250)],
    [(28, 25, 23), (220, 38, 38), (252, 165, 165)],
    [(12, 20, 30), (8, 145, 178), (103, 232, 249)],
    [(18, 18, 20), (104, 127, 243), (160, 175, 255)],
]


def lerp(a: float, b: float, t: float) -> float:
    return a + (b - a) * t


def lerp_color(
    c1: tuple[int, int, int], c2: tuple[int, int, int], t: float
) -> tuple[int, int, int]:
    return (
        int(lerp(c1[0], c2[0], t)),
        int(lerp(c1[1], c2[1], t)),
        int(lerp(c1[2], c2[2], t)),
    )


def sample_palette(palette: list[tuple[int, int, int]], t: float) -> tuple[int, int, int]:
    t = max(0.0, min(1.0, t))
    if t < 0.5:
        return lerp_color(palette[0], palette[1], t * 2)
    return lerp_color(palette[1], palette[2], (t - 0.5) * 2)


def make_linear_gradient(
    palette: list[tuple[int, int, int]], angle_deg: float
) -> Image.Image:
    image = Image.new("RGB", (WIDTH, HEIGHT))
    pixels = image.load()
    angle = math.radians(angle_deg)
    cos_a, sin_a = math.cos(angle), math.sin(angle)
    max_dist = abs(WIDTH * cos_a) + abs(HEIGHT * sin_a)
    for y in range(HEIGHT):
        for x in range(WIDTH):
            dist = x * cos_a + y * sin_a
            t = max(0.0, min(1.0, (dist / max_dist + 1) / 2 if max_dist else 0))
            pixels[x, y] = sample_palette(palette, t)
    return image


def make_radial_gradient(
    palette: list[tuple[int, int, int]], cx: float, cy: float
) -> Image.Image:
    image = Image.new("RGB", (WIDTH, HEIGHT))
    pixels = image.load()
    max_r = math.hypot(WIDTH, HEIGHT) * 0.65
    for y in range(HEIGHT):
        for x in range(WIDTH):
            t = min(1.0, math.hypot(x - cx, y - cy) / max_r)
            pixels[x, y] = sample_palette(list(reversed(palette)), t)
    return image


def add_dots(draw: ImageDraw.ImageDraw, palette: list[tuple[int, int, int]], rng: random.Random) -> None:
    accent = palette[2]
    fill = (*accent, 40)
    spacing = rng.randint(28, 40)
    radius = rng.randint(2, 4)
    for y in range(0, HEIGHT, spacing):
        for x in range(0, WIDTH, spacing):
            offset = spacing // 2 if (x // spacing + y // spacing) % 2 else 0
            draw.ellipse(
                (x + offset - radius, y - radius, x + offset + radius, y + radius),
                fill=fill,
            )


def add_grid(draw: ImageDraw.ImageDraw, palette: list[tuple[int, int, int]], rng: random.Random) -> None:
    accent = palette[1]
    fill = (*accent, 35)
    spacing = rng.randint(48, 72)
    for x in range(0, WIDTH, spacing):
        draw.line((x, 0, x, HEIGHT), fill=fill, width=1)
    for y in range(0, HEIGHT, spacing):
        draw.line((0, y, WIDTH, y), fill=fill, width=1)


def add_diagonal_lines(
    draw: ImageDraw.ImageDraw, palette: list[tuple[int, int, int]], rng: random.Random
) -> None:
    accent = palette[2]
    fill = (*accent, 30)
    spacing = rng.randint(36, 52)
    for offset in range(-HEIGHT, WIDTH + HEIGHT, spacing):
        draw.line((offset, 0, offset + HEIGHT, HEIGHT), fill=fill, width=2)


def add_waves(draw: ImageDraw.ImageDraw, palette: list[tuple[int, int, int]], rng: random.Random) -> None:
    accent = palette[1]
    fill = (*accent, 45)
    amplitude = rng.randint(18, 32)
    wavelength = rng.randint(120, 180)
    for wave_y in range(80, HEIGHT, 120):
        points: list[tuple[int, int]] = []
        for x in range(0, WIDTH + 1, 8):
            y = wave_y + int(amplitude * math.sin(x / wavelength * math.pi * 2))
            points.append((x, y))
        if len(points) > 1:
            draw.line(points, fill=fill, width=3)


def add_concentric(
    draw: ImageDraw.ImageDraw, palette: list[tuple[int, int, int]], rng: random.Random
) -> None:
    accent = palette[2]
    fill = (*accent, 28)
    cx, cy = WIDTH * rng.uniform(0.35, 0.65), HEIGHT * rng.uniform(0.35, 0.65)
    spacing = rng.randint(36, 52)
    for radius in range(spacing, int(max(WIDTH, HEIGHT) * 0.8), spacing):
        draw.ellipse(
            (cx - radius, cy - radius, cx + radius, cy + radius),
            outline=fill,
            width=2,
        )


def add_crosshatch(
    draw: ImageDraw.ImageDraw, palette: list[tuple[int, int, int]], rng: random.Random
) -> None:
    accent = palette[1]
    fill = (*accent, 24)
    spacing = rng.randint(40, 56)
    for offset in range(-HEIGHT, WIDTH + HEIGHT, spacing):
        draw.line((offset, 0, offset + HEIGHT, HEIGHT), fill=fill, width=1)
        draw.line((offset, HEIGHT, offset + HEIGHT, 0), fill=fill, width=1)


def add_mesh_blobs(
    draw: ImageDraw.ImageDraw, palette: list[tuple[int, int, int]], rng: random.Random
) -> None:
    for idx, color in enumerate(palette):
        alpha = 55 if idx == 1 else 40
        fill = (*color, alpha)
        cx = WIDTH * rng.uniform(0.15, 0.85)
        cy = HEIGHT * rng.uniform(0.15, 0.85)
        radius = rng.randint(180, 320)
        draw.ellipse(
            (cx - radius, cy - radius, cx + radius, cy + radius),
            fill=fill,
        )


def make_background(style: str, seed: int) -> Image.Image:
    rng = random.Random(seed)
    palette = PALETTES[seed % len(PALETTES)]
    angle = rng.uniform(20, 160)

    if style == "radial":
        base = make_radial_gradient(
            palette,
            WIDTH * rng.uniform(0.3, 0.7),
            HEIGHT * rng.uniform(0.3, 0.7),
        )
    elif style == "aurora":
        base = make_linear_gradient(palette, angle)
        overlay = make_radial_gradient(
            palette,
            WIDTH * rng.uniform(0.2, 0.8),
            HEIGHT * rng.uniform(0.2, 0.8),
        ).convert("RGBA")
        overlay.putalpha(120)
        base = Image.alpha_composite(base.convert("RGBA"), overlay).convert("RGB")
    else:
        base = make_linear_gradient(palette, angle)

    layer = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)

    if style == "mesh":
        add_mesh_blobs(draw, palette, rng)
    elif style == "dots":
        add_dots(draw, palette, rng)
    elif style == "grid":
        add_grid(draw, palette, rng)
    elif style == "diagonal":
        add_diagonal_lines(draw, palette, rng)
    elif style == "waves":
        add_waves(draw, palette, rng)
    elif style == "concentric":
        add_concentric(draw, palette, rng)
    elif style == "crosshatch":
        add_crosshatch(draw, palette, rng)
    elif style == "aurora":
        add_waves(draw, palette, rng)
        add_dots(draw, palette, rng)

    composed = Image.alpha_composite(base.convert("RGBA"), layer)
    return composed.convert("RGB").filter(ImageFilter.GaussianBlur(radius=0.6))


def fetch_bytes(url: str) -> bytes:
    result = subprocess.run(
        ["curl", "-fsSL", url],
        check=True,
        capture_output=True,
    )
    return result.stdout


def prepare_lucide_svg(svg_text: str) -> str:
    svg_text = re.sub(r'stroke="currentColor"', 'stroke="#ffffff"', svg_text)
    svg_text = re.sub(r'stroke-width="2"', 'stroke-width="1.75"', svg_text)
    return svg_text


def load_icon_svg(icon_source: str) -> str:
    if icon_source.startswith("lucide:"):
        icon_name = icon_source.removeprefix("lucide:")
        url = f"https://unpkg.com/lucide-static@{LUCIDE_VERSION}/icons/{icon_name}.svg"
        print(f"Fetching Lucide icon {icon_name} ({url})")
        return prepare_lucide_svg(fetch_bytes(url).decode("utf-8"))

    if icon_source.startswith("simple-icons:"):
        icon_name = icon_source.removeprefix("simple-icons:")
        url = f"https://cdn.simpleicons.org/{icon_name}/white"
        print(f"Fetching Simple Icons {icon_name} ({url})")
        return fetch_bytes(url).decode("utf-8")

    if icon_source.startswith("local:"):
        logo_path = PUBLIC / icon_source.removeprefix("local:")
        return logo_path.read_text(encoding="utf-8")

    raise ValueError(f"Unknown icon source: {icon_source}")


def prepare_logo_svg(svg_text: str) -> str:
    if 'stroke="currentColor"' in svg_text:
        svg_text = prepare_lucide_svg(svg_text)
    return svg_text


def render_logo(page, svg_text: str) -> Image.Image:
    svg_text = prepare_logo_svg(svg_text)
    encoded = base64.b64encode(svg_text.encode("utf-8")).decode("ascii")
    page.set_content(
        f"""<!doctype html>
<html><body style="margin:0;background:transparent;">
<img src="data:image/svg+xml;base64,{encoded}" style="width:{LOGO_MAX * 2}px;height:auto;" />
</body></html>""",
    )
    png_bytes = page.locator("img").screenshot(omit_background=True)
    logo = Image.open(io.BytesIO(png_bytes)).convert("RGBA")
    ratio = min(LOGO_MAX / logo.width, LOGO_MAX / logo.height)
    size = (max(1, int(logo.width * ratio)), max(1, int(logo.height * ratio)))
    return logo.resize(size, Image.Resampling.LANCZOS)


def composite(background: Image.Image, logo: Image.Image) -> Image.Image:
    canvas = background.copy().convert("RGBA")
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 90))
    canvas = Image.alpha_composite(canvas, overlay)

    pad = 28
    badge_w = logo.width + pad * 2
    badge_h = logo.height + pad * 2
    badge = Image.new("RGBA", (badge_w, badge_h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(badge)
    draw.rounded_rectangle((0, 0, badge_w - 1, badge_h - 1), radius=24, fill=(0, 0, 0, 150))

    x = (WIDTH - badge_w) // 2
    y = (HEIGHT - badge_h) // 2
    canvas.alpha_composite(badge, (x, y))
    canvas.alpha_composite(logo, (x + pad, y + pad))

    vignette = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    vdraw = ImageDraw.Draw(vignette)
    vdraw.rectangle((0, HEIGHT - 280, WIDTH, HEIGHT), fill=(0, 0, 0, 80))
    vignette = vignette.filter(ImageFilter.GaussianBlur(radius=40))
    canvas = Image.alpha_composite(canvas, vignette)

    return canvas.convert("RGB")


def main() -> None:
    NAV_DIR.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        page = browser.new_page(viewport={"width": LOGO_MAX * 2, "height": LOGO_MAX * 2})

        for index, (filename, icon_source, style) in enumerate(NAV_ITEMS):
            background = make_background(style, index)
            logo = render_logo(page, load_icon_svg(icon_source))
            result = composite(background, logo)
            out_path = NAV_DIR / filename
            result.save(out_path, "JPEG", quality=88, optimize=True)
            print(f"Wrote {out_path.relative_to(ROOT)}")

        browser.close()


if __name__ == "__main__":
    main()
