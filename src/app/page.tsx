import { AppDownload } from "@/components/AppDownload";
import { CategoryGrid } from "@/components/CategoryGrid";
import { FabricFeature } from "@/components/FabricFeature";
import { FeaturedProductHero } from "@/components/FeaturedProductHero";
import { FeaturedSlider } from "@/components/FeaturedSlider";
import { HeadingStack } from "@/components/HeadingStack";
import { HeroCarousel } from "@/components/HeroCarousel";
import { HeroCollectionScroller } from "@/components/HeroCollectionScroller";
import { HeroProductScroller } from "@/components/HeroProductScroller";
import { ProductScroller } from "@/components/ProductScroller";
import { SingleImageBanner } from "@/components/SingleImageBanner";
import { StripTiles } from "@/components/StripTiles";
import { TileSlider } from "@/components/TileSlider";
import { bannerLinks, headings } from "@/lib/content";

export default function Home() {
  return (
    <>
        <HeroCarousel />
        <ProductScroller />
        <HeadingStack lines={[headings.shopByCategory]} size="md" />
        <CategoryGrid />
        <HeroProductScroller />
        <SingleImageBanner tone="cool" aspect="tall" title="Banner Headline" href={bannerLinks.one} className="py-4 md:py-5" />
        <SingleImageBanner tone="warm" aspect="tall" overline="Overline" title="Banner Title" href={bannerLinks.two} className="pb-4 md:pb-5" />
        <HeadingStack lines={[headings.wardrobe]} size="xl" />
        <TileSlider />
        <SingleImageBanner tone="sand" aspect="tall" overline="Overline" title="Banner Title" href={bannerLinks.three} mobileRatio="aspect-[390/495]" className="md:pb-[30px]" />
        <SingleImageBanner tone="olive" aspect="medium" title="Promo Banner" href={bannerLinks.promo} />
        <div aria-hidden className="h-[25px]" />
        <SingleImageBanner tone="stone" aspect="short" title="Banner" align="center" href={bannerLinks.short} />
        <StripTiles />
        <HeroCollectionScroller />
        <HeadingStack lines={headings.signature} />
        <FeaturedSlider />
        <FeaturedProductHero />
        <HeadingStack lines={headings.fabric} className="pb-[11px] md:pt-[36px] md:pb-[24px]" />
        <FabricFeature />
        <AppDownload />
    </>
  );
}
