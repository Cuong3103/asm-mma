import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Card } from "../../components/ui/card/index";
import { VStack } from "../../components/ui/vstack/index";
import { Heading } from "../../components/ui/heading/index";
import { Button, ButtonText } from "../../components/ui/button/index";
import { useFavorites } from "../../FavoritesContext";

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Text key={i} style={{ color: i <= rating ? "#FFD700" : "#E0E0E0" }}>
        ★
      </Text>,
    );
  }
  return <View style={{ flexDirection: "row" }}>{stars}</View>;
};

const feedbackData = [
  { rating: 5, comment: "Absolutely love this art tool!" },
  { rating: 4, comment: "Great quality, very satisfied." },
  { rating: 5, comment: "Best purchase I've made!" },
  { rating: 3, comment: "It's good but could be better." },
  { rating: 2, comment: "Not what I expected." },
  { rating: 4, comment: "Good value for money." },
];

const DetailScreen = ({ route }) => {
  const { artTool } = route.params;
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const isFavorite = favorites.some((fav) => fav.id === artTool.id);

  const groupedFeedback = feedbackData.reduce((acc, feedback) => {
    if (!acc[feedback.rating]) {
      acc[feedback.rating] = [];
    }
    acc[feedback.rating].push(feedback.comment);
    return acc;
  }, {});

  return (
    <ScrollView>
      <View>
        <Card>
          <Image
            source={{ uri: artTool.image }}
            alt={artTool.artName}
            style={{ width: "100%", height: 300 }}
          />
          <VStack>
            <Heading>{artTool.artName}</Heading>
            <Text>${artTool.price}</Text>
            <Text>{artTool.description}</Text>

            <Button
              size="md"
              variant={isFavorite ? "outline" : "solid"}
              action="primary"
              onPress={() => {
                if (isFavorite) {
                  removeFromFavorites(artTool.id);
                } else {
                  addToFavorites(artTool);
                }
              }}
            >
              <ButtonText>
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </ButtonText>
            </Button>
          </VStack>
        </Card>

        <View style={{ padding: 20, backgroundColor: "white" }}>
          <Heading size="lg">Feedback</Heading>
          {Object.keys(groupedFeedback).map((rating) => (
            <View key={rating} style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 16 }}>
                {renderStars(Number(rating))}
              </Text>
              {groupedFeedback[rating].map((comment, index) => (
                <Text
                  key={index}
                  style={{ marginLeft: 10, fontStyle: "italic" }}
                >
                  - {comment}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailScreen;
