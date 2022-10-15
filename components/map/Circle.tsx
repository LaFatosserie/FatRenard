import { useEffect, useState, FC } from "react";

const Circle: FC<google.maps.CircleOptions> = (options) => {
  const [circle, setCircle] = useState<google.maps.Circle>();

  useEffect(() => {
    if (!circle) setCircle(new google.maps.Circle());

    return () => {
      if (circle) circle.setMap(null);
    };
  }, [circle]);

  useEffect(() => {
    if (circle) circle.setOptions(options);
  }, [circle, options]);

  return null;
};

export default Circle;
