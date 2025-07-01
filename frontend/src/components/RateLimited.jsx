import { CircleAlert } from "lucide-react";

const RateLimited = () => {
  return (
    <div className="max-w-[48rem] mx-auto px-4 py-8 md:my-8">
      <div className="bg-base-200 border border-base-200 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-center p-6">
          <div className="flex-shrink-0 bg-red-500/20 p-4 rounded-full md:mr-6">
            <CircleAlert className="size-10 text-red-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-center md:text-left mb-2">Rate Limit Reached</h3>
            <p className="text-base-content text-center md:text-left mb-1">
              You've made too many requests, please wait a moment.
            </p>
            <p className="text-sm text-base-content/50 text-center md:text-left">
              Please try again in a few seconds later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimited;
