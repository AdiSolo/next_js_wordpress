import { useEffect, useState } from "react";
import Results from "./Results";
import { Pagination } from "./Pagination";
import { useRouter } from "next/router";
import queryString from "query-string";
import { Filters } from "./Filters";
const PropertySearch = () => {
  const [properties, setProperties] = useState([]);
  const [totalResults, setTotalResults] = useState([]);
  const pageSize = 3;
  const router = useRouter();
  const search = async () => {
    const { page, petFriendly, hasParking, minPrice, maxPrice } =
      queryString.parse(window.location.search);
    const filters = {};
    if (minPrice) {
      filters.minPrice = parseInt(minPrice);
    }
    if (maxPrice) {
      filters.maxPrice = parseInt(maxPrice);
    }
    if (hasParking === "true") {
      filters.hasParking = true;
    }
    if (petFriendly === "true") {
      filters.petFriendly = true;
    }
    const response = await fetch(`/api/search`, {
      method: "POST",
      body: JSON.stringify({ page: parseInt(page || "1"), ...filters }),
    });
    const data = await response.json();
    setProperties(data.properties);
    setTotalResults(data.total);
  };
  const handlePageClick = async (pageNumber) => {
    const { petFriendly, hasParking, minPrice, maxPrice } = queryString.parse(
      window.location.search,
    );

    await router.push(
      `${router.query.slug.join("/")}/?page=${pageNumber}&petFriendly=${petFriendly === "true"}&hasParking=${hasParking === "true"}&minPrice=${!!minPrice}&maxPrice=${!!maxPrice}`,
      null,
      {
        shallow: true,
      },
    );
    search();
  };
  useEffect(() => {
    search();
  }, []);
  const handleSearch = async ({
    petFriendly,
    hasParking,
    minPrice,
    maxPrice,
  }) => {
    await router.push(
      `${router.query.slug.join("/")}/?page=1&petFriendly=${petFriendly}&hasParking=${hasParking}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
      null,
      {
        shallow: true,
      },
    );
    search();
    return null;
  };

  return (
    <div>
      <Filters onSearch={handleSearch} />
      <Results properties={properties} />
      <Pagination
        onPageClick={handlePageClick}
        totalPages={Math.ceil(totalResults / pageSize)}
      />
    </div>
  );
};

export default PropertySearch;
