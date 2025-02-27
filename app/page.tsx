import { BannerComponent } from '@/components/banner.component';
import { CarouselCardComponent } from '@/components/carousel-card.component';

export default function Home() {
  return (
    <div>
      <div className="mt-[-70px]">
        <BannerComponent />
      </div>
      <div className="w-full p-2 py-4">
        <CarouselCardComponent />
      </div>
      <div className="max-w-screen-xl mx-auto m-4">
        <div className="p-2 bg-gray-200">
          <h1 className="text-2xl">Home</h1>
        </div>
      </div>
    </div>
  );
}
