import {
  useEffect,
  useState,
  useRef,
  FC,
  Children,
  isValidElement,
  cloneElement,
  ReactNode,
} from "react";

interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children: ReactNode
}

const Map: FC<MapProps> = ({
  onClick,
  onIdle,
  children,
  style,
  ...options
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map)
      setMap(
        new window.google.maps.Map(ref.current, {
          disableDefaultUI: true,
          mapTypeId: "terrain",
        })
      );
  }, [ref, map]);

  useEffect(() => {
    if (map) map.setOptions(options);
  }, [options, map]);

  useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((en) =>
        google.maps.event.clearListeners(map, en)
      );
      if (onClick) map.addListener("click", onClick);
      if (onIdle) map.addListener("idle", () => onIdle(map));
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} style={style} />
      {Children.map(children, (child) => {
        if (isValidElement(child)) return cloneElement(child, { map });
      })}
    </>
  );
};

export default Map;
