import { StyleSheet, View, Image, Dimensions } from "react-native";
import React from "react";
import CarouselLib from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

const ImageSlider = () => {
  const images = [
    {
      id: "1",
      uri: "https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg",
    },
    {
      id: "2",
      uri: "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif",
    },
    {
      id: "3",
      uri: "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg",
    },
  ];

  return (
    <CarouselLib
      width={width}
      height={200}
      data={images}
      renderItem={({ item }) => (
        <View style={styles.carouselItem}>
          <Image source={{ uri: item.uri }} style={styles.carouselImage} />
        </View>
      )}
      loop
      autoPlay
      autoPlayInterval={3000}
    />
  );
};

export default ImageSlider;

const styles = StyleSheet.create({
  carouselItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  carouselImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
});
