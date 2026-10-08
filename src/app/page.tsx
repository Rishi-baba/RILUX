import { AppDownload } from "@/components/AppDownload";
import { CategoryGrid } from "@/components/CategoryGrid";
import { FabricFeature } from "@/components/FabricFeature";
import { FabricTiles } from "@/components/FabricTiles";
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
import { WhyBrand } from "@/components/WhyBrand";
import { bannerLinks, headings } from "@/lib/content";

export default function Home() {
  return (
    <>
        <HeroCarousel />
        <WhyBrand />
        <ProductScroller />
        <HeadingStack lines={[headings.shopByCategory]} size="md" />
        <CategoryGrid />
        <HeadingStack lines={["Shop by Fabric"]} size="md" />
        <FabricTiles />
        <HeroProductScroller />
        <HeadingStack lines={[headings.wardrobe]} size="xl" />
        <TileSlider />
        <SingleImageBanner tone="sand" aspect="tall" overline="Off Duty" title="Easy Weekends" href={bannerLinks.three} mobileRatio="aspect-[390/495]" className="md:pb-[30px]" />
        <SingleImageBanner tone="olive" aspect="medium" title="Just Landed" href={bannerLinks.promo} />
        <div aria-hidden className="h-[25px]" />
        <SingleImageBanner tone="stone" aspect="short" title="The RILUX Story" align="center" href={bannerLinks.short} />
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
