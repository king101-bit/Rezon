import { Globe, Tv, Zap } from "lucide-react";

const FreeSection = () => {
  return (
    <>
      <div className="container mx-auto px-4 mb-5">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            100% Free Streaming
          </h2>
          <p className="text-gray-600">
            Enjoy unlimited movies and TV shows without spending a penny. No
            hidden fees, no credit card required, just great entertainment.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 mb-4">
              <Zap className="w-8 h-8 text-teal-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Ads-supported
            </h3>
            <p className="text-gray-600">
              We show minimal, non-intrusive ads to keep our service completely
              free for everyone.{" "}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 mb-4">
              <Tv className="w-8 h-8 text-teal-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Full HD Streaming
            </h3>
            <p className="text-gray-600">
              Enjoy high-quality streaming on all your devices without any
              subscription fees.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 mb-4">
              <Globe className="w-8 h-8 text-teal-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Available Worldwide
            </h3>
            <p className="text-gray-600">
              Access our platform from anywhere in the world, completely free of
              charge.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FreeSection;
