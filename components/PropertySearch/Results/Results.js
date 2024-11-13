import PropertyCard from "components/PropertyCard";

const Results = ({ properties }) => {
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-3 gap-5 mb-10 mt-5">
      {properties.map((property) => (
        <PropertyCard
          key={property.databaseId}
          title={property.title}
          image={property.featuredImage?.node?.sourceUrl}
          destination={property.uri}
          price={property.propertiesFeatures.price}
          bedrooms={property.propertiesFeatures.bedrooms}
          bathrooms={property.propertiesFeatures.bathrooms}
          hasParking={property.propertiesFeatures.hasParking}
          petFriendly={property.propertiesFeatures.petFriendly}
        />
      ))}
    </div>
  );
};

export default Results;
