import { useCallback, useState } from 'react';

type UseFeedbackModalResult = {
  isVisible: boolean;
  setIsVisible: (state: boolean) => void;
  closeModal: () => void;
};

type UseFeedbackModalParams = {
  onClose?: (...args: unknown[]) => void;
};

export const useFeedbackModal = (
  params?: UseFeedbackModalParams,
): UseFeedbackModalResult => {
  const [isVisible, setIsVisible] = useState(false);

  const closeModal = useCallback(() => {
    setIsVisible((prev) => !prev);
    params?.onClose?.();
  }, []);

  return {
    isVisible,
    setIsVisible,
    closeModal,
  };
};
