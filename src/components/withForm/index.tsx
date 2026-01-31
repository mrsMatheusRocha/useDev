import { useCallback, useState, type ComponentType } from "react";

export interface WithFormProps {
  value: unknown;
  onChange?: (value: unknown) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  touched?: boolean;
  disabled?: boolean;
  required?: boolean;
}

export interface WithFormConfig {
  initialValue?: unknown;
  required?: boolean;
  disabled?: boolean;
  onChange?: (value: unknown) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  controlledValue?: unknown;
}

export type WrappedComponentProps<P> = P & WithFormProps;

export type WithFormHOC = <P extends object>(
  WrappedComponent: ComponentType<WrappedComponentProps<P>>,
  config?: WithFormConfig,
) => ComponentType<Omit<P, keyof WithFormProps> & WithFormConfig>;

const withForm: WithFormHOC = <P extends object>(
  WrappedComponent: ComponentType<WrappedComponentProps<P>>,
  config?: WithFormConfig,
) => {
  const EnhancedComponent: ComponentType<
    Omit<P, keyof WithFormProps> & WithFormConfig
  > = (props) => {
    const {
      initialValue,
      required = false,
      disabled = false,
      onChange: onChangeCallback,
      onBlur: onBlurCallback,
      onFocus: onFocusCallback,
      controlledValue,
      ...componentProps
    } = { ...config, ...props };

    const [internalValue, setInternalValue] = useState(initialValue);
    const value =
      controlledValue !== undefined ? controlledValue : internalValue;
    const [touched, setTouched] = useState(false);

    const handleChange = useCallback(
      (newValue: unknown) => {
        if (controlledValue === undefined) {
          setInternalValue(newValue);
        }

        if (onChangeCallback) {
          onChangeCallback(newValue);
        }

        setTouched(true);

        if (onChangeCallback) {
          onChangeCallback(newValue);
        }
      },
      [controlledValue, onChangeCallback],
    );

    const handleBlur = useCallback(() => {
      setTouched(true);
      if (onBlurCallback) {
        onBlurCallback();
      }
    }, [onBlurCallback]);

    const handleFocus = useCallback(() => {
      if (onFocusCallback) {
        onFocusCallback();
      }
    }, [onFocusCallback]);

    const enhancedProps: WrappedComponentProps<P> = {
      ...(componentProps as P),
      value,
      onChange: handleChange,
      onBlur: handleBlur,
      onFocus: handleFocus,
      touched,
      disabled:
        disabled || Boolean((props as Record<string, unknown>).disabled),
      required:
        required || Boolean((props as Record<string, unknown>).required),
    };

    return <WrappedComponent {...enhancedProps} />;
  };

  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";
  EnhancedComponent.displayName = `withForm(${displayName})`;
  return EnhancedComponent;
};

export default withForm;
