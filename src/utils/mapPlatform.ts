enum platformEnum {
  "pc" = 1,
  "ps",
  "xbox",
  "switch",
}

const mapPlatform = (platform: number | string) => {
  if (typeof platform === "number") {
    return platformEnum[platform];
  }
  if (typeof platform === "string") {
    const value = Object.values(platformEnum).indexOf(
      platform as unknown as platformEnum
    );
    return Object.keys(platformEnum)[value];
  }
};

export default mapPlatform;
