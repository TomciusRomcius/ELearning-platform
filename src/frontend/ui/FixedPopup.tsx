import {
  HTMLAttributes,
  useLayoutEffect,
  useState,
  forwardRef,
  useCallback,
} from "react";

interface PopupProps extends HTMLAttributes<HTMLDivElement> {
  isFixed: boolean;
  isVisible: boolean;
  x?: number;
  y?: number;
  onClose?: () => void;
}

const DEFAULT_X = 40;
const DEFAULT_Y = -40;

const Popup = forwardRef<HTMLDivElement, PopupProps>(
  (props: PopupProps, ref) => {
    let [xPos, setXPos] = useState(props.x || DEFAULT_X);
    let [yPos, setYPos] = useState(props.y || DEFAULT_Y);

    let { isFixed, x, y, onClose, ...htmlProps } = props; // Getting htmlProps

    const handleWindowClick = useCallback(() => {
      console.log(props.isVisible);
      if (!props.isVisible) return;
      if (onClose) {
        onClose();
      }
    }, [props.isVisible, onClose]);

    useLayoutEffect(() => {
      if (!ref || typeof ref === "function" || !ref.current) return;

      let rect = ref.current.getBoundingClientRect();

      if (rect.x + rect.width > window.innerWidth) {
        let diff = rect.x + rect.width - window.innerWidth;
        setXPos((x) => x - diff);
      }

      if (rect.y + rect.height > window.innerHeight) {
        let diff = rect.y + rect.height - window.innerHeight;
        setYPos((y) => y - diff);
      }

      if (rect.y < 0) {
        setYPos(0);
      }

      if (rect.x < 0) {
        setXPos(0);
      }

      window.addEventListener("click", handleWindowClick);
      return () => window.removeEventListener("click", handleWindowClick);
    }, [props.isVisible]);
    
    return (
      <div
      {...htmlProps}
        className={`w-max z-10 ${htmlProps.className} ${props.isVisible ? "" : "hidden"}`}
        ref={ref}
        style={{
          position: isFixed ? "fixed" : "absolute",
        }}
      >
        {props.children}
      </div>
    );
  }
);

export default Popup;