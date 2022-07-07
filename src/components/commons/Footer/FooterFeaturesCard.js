import { FaTruckMoving } from "react-icons/fa";
import { GiBeachBag } from "react-icons/gi";
import { ImPriceTags } from "react-icons/im";
import FeaturesCard from "../../../utilities/FeaturesCard";

export default function FooterFeaturesCard() {
  return (
    <>
      <div className="border-b-1 border-b-slate-300">
        <div className="container_wrapper">
          <div className="our_features  py-4">
            <FeaturesCard
              features_name="Free & Next Day Delivery"
              features_icon={<FaTruckMoving />}
              features_desc="Lorem ipsum dolor sit amet, cons..."
            />

            <FeaturesCard
              features_name="100% Satisfaction Guarantee"
              features_icon={<GiBeachBag />}
              features_desc="Rorem Ipsum Dolor sit amet, cons..."
            />

            <FeaturesCard
              features_name="Great Daily Deals Discount"
              features_icon={<ImPriceTags />}
              features_desc="Rorem Ipsum Dolor sit amet, cons..."
            />
          </div>
        </div>
      </div>
    </>
  );
}
