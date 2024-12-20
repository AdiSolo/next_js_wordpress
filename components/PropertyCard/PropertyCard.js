import {
  faBathtub,
  faBed,
  faCar,
  faDog,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import numeral from "numeral";
const PropertyCard = ({
  title,
  destination,
  price,
  image,
  bedrooms,
  bathrooms,
  hasParking,
  petFriendly,
}) => {
  return (
    <Link
      href={destination}
      className="border-2 border-slate-300 bg-slate-200  p-5 hover:bg-slate-300 rounded-lg"
    >
      <div className="flex w-full">
        <Image src={image} width="300" height="200" alt="image" priority />
      </div>
      <div className="mt-3 text-lg font-bold">{title}</div>
      <div className="mt-3 text-lg">€{numeral(price).format("0,0")}</div>
      <div
        className="flex justify-between text-sm mt-3
      "
      >
        <div>
          <FontAwesomeIcon icon={faBathtub} />
          <span className=" pl-2">{bathrooms} bathrooms</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faBed} />
          <span className=" pl-2">{bedrooms} bedrooms</span>
        </div>
      </div>

      {(!!hasParking || !!petFriendly) && (
        <div className="flex justify-between text-sm mt-3">
          <div>
            {!!hasParking && (
              <>
                <FontAwesomeIcon icon={faCar} /> parking is available
              </>
            )}
          </div>
          <div>
            {!!petFriendly && (
              <>
                <FontAwesomeIcon icon={faDog} /> petFriendly
              </>
            )}
          </div>
        </div>
      )}
    </Link>
  );
};

export default PropertyCard;
