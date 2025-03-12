// Extend the Navigator interface to include userAgentData
type ExtendedNavigator = {
  userAgentData?: {
    platform: string;
  };
};

// Get the device platform
export const getDevicePlatform = (): string => {
  if (typeof navigator !== "undefined") {
    if ((navigator as ExtendedNavigator).userAgentData?.platform) {
      return (
        (navigator as ExtendedNavigator).userAgentData!.platform || "unknown"
      );
    }
    return navigator.platform || "unknown";
  }
  return "server";
};
