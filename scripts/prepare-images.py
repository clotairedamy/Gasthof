#!/usr/bin/env python3
"""Copy and optimise crawled images into the Nuxt app's public/images/.

Reads the crawler's images.json, maps each semantic filename to the matching
Wix media id, then downsizes (max 1920px) and re-encodes to JPEG for the web.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

from PIL import Image

CRAWL = Path(
    "/Users/clotaire/Documents/deepseek-harness/default-workspace/cocohouses-crawler/output"
)
DEST = Path(
    "/Users/clotaire/Documents/deepseek-harness/default-workspace/gasthof-barlida/public/images"
)

MAX_DIM = 1920
QUALITY = 82

# semantic filename -> Wix media id (the segment after `/media/` in the original URL)
MAPPING: dict[str, str] = {
    "hero.jpg": "ac0819_980302712b1c45f187823c981f999546~mv2.jpg",
    "about-1.jpg": "ac0819_383e312b1b9d4610bfad39ac40821e0a~mv2.jpg",
    "about-2.jpg": "ac0819_22b09a27017e4b64bbbf4d0f825e1796~mv2.jpg",
    "restaurant-1.jpg": "ac0819_0437ca7df40a43a188fb27f41df8bdab~mv2.jpg",
    "restaurant-2.jpg": "ac0819_a797cc3f08424ffe89e21e2f4e464503~mv2.jpg",
    "restaurant-3.jpg": "ac0819_9deeed08d8294a6db716b97879d6d950~mv2.jpg",
    "restaurant-4.jpg": "ac0819_d16590cfa4d549ba855d169ebf1ec064~mv2.jpg",
    "restaurant-5.jpg": "ac0819_edf6864b19b141698ef7bc456b7374a3~mv2.jpg",
    "restaurant-6.jpg": "ac0819_626a209eb77a4d78bfbe49853036448c~mv2.jpg",
    "bar-1.jpg": "ac0819_2ae5ef7f350b4ae2af1bb4a3df5f61cf~mv2.jpg",
    "bar-2.jpg": "ac0819_32d3eb15c4124beba0544e84748f33ec~mv2.jpg",
    "bar-3.jpg": "ac0819_4278d739b8c24d7aa1363c6df498e2d4~mv2.jpg",
    "bar-4.jpg": "ac0819_b8aa1649a00c49ea87c22c0b606b51e2~mv2.jpg",
    "bar-5.jpg": "ac0819_af6115cf7ad6459798a77eec528b48b4~mv2.jpg",
    "bar-6.jpg": "ac0819_02a9067ce28649ee976047a3fbfce584~mv2.jpg",
    "terrace-1.jpg": "ac0819_7feff83f0f80496886833e3cb1d2bb50~mv2.jpg",
    "terrace-2.jpg": "ac0819_aebb117d3b634cce86fb5a9a3faa1b47~mv2.jpg",
    "terrace-3.jpg": "ac0819_5e1b8da632d049998f6d5e2bc2046b3f~mv2.jpg",
    "terrace-4.jpg": "ac0819_5be6a6f7e4f045478bbf2f5b83e248d1~mv2.jpg",
    "terrace-5.jpg": "ac0819_4dcffea060d8400dbaac9e9af1b4d6fa~mv2.jpg",
    "terrace-6.jpg": "ac0819_7b1386eb8a9c4cf8b35cf86492937707~mv2.jpg",
    "rooms-hero.jpg": "a3c153_6f27754e06844d62a1708b316797fc08~mv2.jpg",
    "zimmer-1-1.jpg": "ac0819_452d5f9aa2ae4caeb40f77b7c7377aea~mv2.jpg",
    "zimmer-1-2.jpg": "ac0819_54e3b92f3a244cdfb99bd417320e2511~mv2.jpg",
    "zimmer-1-3.jpg": "ac0819_6e0040f3aea34dc3b830482fc176ddcc~mv2.jpg",
    "zimmer-2-1.jpg": "ac0819_906e8a6e44834c808c3b82819e3c611b~mv2.jpg",
    "zimmer-2-2.jpg": "ac0819_ce2aa68cfd8c4dc7a90ff77dbbd0c79a~mv2.jpg",
    "zimmer-2-3.jpg": "ac0819_4ad81754379242aeacf919746c7af167~mv2.jpg",
    "zimmer-2-4.jpg": "ac0819_d133a2776a014c3ea4014bd0dbf240b3~mv2.jpg",
    "suite-3-1.jpg": "ac0819_f47ca71a2a3d44d58e5c926737e7563d~mv2.jpg",
    "suite-3-2.jpg": "ac0819_68a54d035cbe4ed7a2a2c9cce85a4020~mv2.jpg",
    "suite-3-3.jpg": "ac0819_de44e25592a141baad86d9e0624006b1~mv2.jpg",
    "suite-3-4.jpg": "ac0819_68386dace88146d2ab94c458ab8c8d27~mv2.jpg",
    "apt-klein-1.jpg": "ac0819_343f55130e1645b682f3680ad6b87f93~mv2.jpg",
    "apt-klein-2.jpg": "ac0819_b8476d95c5fd4ae3b73a210a39e21a26~mv2.jpg",
    "apt-klein-3.jpg": "ac0819_7a9ded1061a14c3b966c437d6b84e3f6~mv2.jpg",
    "apt-klein-4.jpg": "ac0819_a09597c771da484aa22ece9dca4d3485~mv2.jpg",
    "apt-klein-5.jpg": "ac0819_f5b58e9482914a5484ef54d71a4a1dd3~mv2.jpg",
    "apt-klein-6.jpg": "ac0819_2321b6b8bea44077b6c777fb9968ac81~mv2.jpg",
    "apt-gross-1.jpg": "ac0819_c87ee2da157c4179b61621445e508977~mv2.jpg",
    "apt-gross-2.jpg": "ac0819_60885526467047ec8a03f4a8255fe49a~mv2.jpg",
    "apt-gross-3.jpg": "ac0819_359269431825409aba73468a3ffdc946~mv2.jpg",
    "apt-gross-4.jpg": "ac0819_26d8c04772194cf5add1671308b504b0~mv2.jpg",
    "apt-gross-5.jpg": "ac0819_653ae27a53a24f74acee1023d678072f~mv2.jpg",
    "apt-gross-6.jpg": "ac0819_b8d3e3f0efeb4492b8363736c8ca0285~mv2.jpg",
    "gallery-1.jpg": "a3c153_4c9ff7f594c1414f9f7894e514098894~mv2.jpg",
    "gallery-2.jpg": "a3c153_b1efd27c479d430baf6513f717b4d7df~mv2.jpg",
    "gallery-3.jpg": "a3c153_e2d1ff51b7d143438f06552ee7e25704~mv2.jpg",
    "gallery-4.jpg": "a3c153_c3a1f52d22f34ebf807575c44a0b3c46~mv2.jpg",
    "gallery-5.jpg": "a3c153_a948e560c4fb44eb9ec9a30bf5c105c4~mv2.jpg",
    "gallery-6.jpg": "a3c153_8143624184174bd98cc1262723b6d8a3~mv2.jpg",
}


def main() -> int:
    images_json = json.loads((CRAWL / "images.json").read_text(encoding="utf-8"))

    # media_id -> source file path
    lookup: dict[str, Path] = {}
    for original_url, rec in images_json.items():
        media_id = original_url.rsplit("/media/", 1)[-1]
        rel = rec.get("file", "")
        if rel:
            lookup[media_id] = CRAWL / "images" / rel.split("/", 1)[-1]

    DEST.mkdir(parents=True, exist_ok=True)

    done, missing = 0, 0
    for name, media_id in MAPPING.items():
        src = lookup.get(media_id)
        if src is None or not src.exists():
            print(f"MISSING  {name}  ({media_id})")
            missing += 1
            continue
        try:
            with Image.open(src) as im:
                im = im.convert("RGB")
                im.thumbnail((MAX_DIM, MAX_DIM), Image.LANCZOS)
                im.save(DEST / name, "JPEG", quality=QUALITY, optimize=True)
            size_kb = (DEST / name).stat().st_size // 1024
            print(f"OK       {name:20s} {size_kb:6d} KB")
            done += 1
        except Exception as exc:  # noqa: BLE001
            print(f"ERROR    {name}  {exc}")
            missing += 1

    print(f"\nPrepared {done} images, {missing} missing/errors.")
    return 1 if missing else 0


if __name__ == "__main__":
    raise SystemExit(main())
