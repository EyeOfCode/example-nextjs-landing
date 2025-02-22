import { BannerComponent } from '@/components/banner.component';

export default function Home() {
  return (
    <div>
      <BannerComponent />
      <div className="max-w-screen-xl mx-auto">
        <div className="m-4 bg-gray-200">
          <h1 className="text-2xl">Home</h1>
        </div>
      </div>
    </div>
  );
}
