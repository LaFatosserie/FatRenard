import { useEffect, useState, FC } from "react";

const Polygon: FC<google.maps.PolygonOptions> = (options) => {
  const [polygon, setPolygon] = useState<google.maps.Polygon>();

  useEffect(() => {
    if (!polygon) setPolygon(new google.maps.Polygon());

    return () => {
      if (polygon) polygon.setMap(null);
    };
  }, [polygon]);

  useEffect(() => {
    if (polygon) polygon.setOptions(options);
  }, [polygon, options]);

  return null;
};

export default Polygon;
