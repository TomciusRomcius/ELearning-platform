import {
  HTMLAttributes,
  useLayoutEffect,
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

const Popup = forwardRef<HTMLDivElement, PopupProps>(
  (props: PopupProps, ref) => {
    let { isFixed, x, y, onClose, ...htmlProps } = props; // Getting props

    const handleWindowClick = useCallback(() => {
      if (!props.isVisible) return;
      if (onClose) {
        onClose();
      }
    }, [props.isVisible, onClose]);

    const handleWindowScroll = useCallback(() => {
      if (!props.isVisible) return;
      if (onClose) {
        onClose();
      }
    }, [props.isVisible, onClose]);

    useLayoutEffect(() => {
      if (!ref) return;

      window.addEventListener("click", handleWindowClick);
      window.addEventListener("wheel", handleWindowScroll);

      return () => {
        window.removeEventListener("click", handleWindowClick);
        window.addEventListener("wheel", handleWindowScroll);
      };
    }, [props.isVisible]);

    return (
      <div
        {...htmlProps}
        className={`w-max z-10 ${htmlProps.className} ${
          props.isVisible ? "" : "hidden"
        }`}
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
