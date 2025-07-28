import { auth } from "~/server/auth";

import ImageCarousel from "./_components/ImageCarousel";
import { GiSkateboard } from "react-icons/gi";
import { BsLightningChargeFill } from "react-icons/bs";
import { HiMiniChatBubbleOvalLeftEllipsis } from "react-icons/hi2";

export default async function Home() {

  return (
    <main>
      <section className="mt-10 max-w-2xl mx-auto text-center">
        <h2 className="!text-3xl font-bold mb-4 text-gray-900">Welcome to Waffle&apos;s Skate Shop!</h2>
        <p className="text-gray-600 mb-4">
          Your one-stop shop for the latest skateboards and gear. For skaters, by skaters.
        </p>
      </section>
      <ImageCarousel />
      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-4 text-center">Why Shop With Us?</h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <blockquote className="bg-gray-100 p-4 rounded shadow text-sm">
            <GiSkateboard className="inline-block mr-2" />
            Handpicked selection of the best skateboards and gear.
          </blockquote>
          <blockquote className="bg-gray-100 p-4 rounded shadow text-sm">
            <BsLightningChargeFill className="inline-block mr-2" />
            Fast and reliable shipping to get you skating sooner.
          </blockquote>
          <blockquote className="bg-gray-100 p-4 rounded shadow text-sm">
            <HiMiniChatBubbleOvalLeftEllipsis className="inline-block mr-2" />
            Community driven with a focus on skaters&apos; needs.
          </blockquote>
        </div>
      </section>
    </main>
  );
}
