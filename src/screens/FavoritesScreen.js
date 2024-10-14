import React from "react";
import { View, Text, TextInput, ScrollView, Pressable } from "react-native";
import { Card } from "../../components/ui/card/index";
import { VStack } from "../../components/ui/vstack/index";
import { Heading } from "../../components/ui/heading/index";
import { Box } from "../../components/ui/box/index";
import { Image } from "../../components/ui/image/index";
import { Button, ButtonText } from "../../components/ui/button/index";
import { useFavorites } from "../../FavoritesContext";
import { useNavigation } from "@react-navigation/native";

const FavoritesScreen = () => {
  const navigation = useNavigation();
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();

  const handleClearAll = () => {
    Alert.alert("Clear All", "Are you sure you want to remove all favorites?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          clearFavorites();
          Alert.alert("Cleared", "All favorites have been removed");
        },
      },
    ]);
  };

  return (
    <ScrollView>
      <View>
        {favorites.length > 0 ? (
          <>
            {favorites.map((item) => {
              const isFavorite = favorites.some((fav) => fav.id === item.id);
              const limitedTimeDeal = item.limitedTimeDeal;
              return (
                <Pressable
                  key={item.id}
                  onPress={() =>
                    navigation.navigate("Detail", { artTool: item })
                  }
                >
                  <Card className="p-5 rounded-lg m-3 border-4" key={item.id}>
                    <Image
                      source={{ uri: item.image }}
                      alt={item.artName}
                      className="mb-6 h-[240px] w-full rounded-md"
                    />
                    <Text className="text-sm font-normal mb-2 text-typography-700">
                      {item.brand}
                    </Text>
                    <VStack className="mb-6">
                      <Heading size="md" className="mb-4">
                        {item.artName}
                      </Heading>
                      <Text size="sm">Price: {item.price}</Text>
                      <Text size="sm" className="text-red-600">
                        {limitedTimeDeal && (
                          <Text>
                            Deal:
                            <Text className="font-bold">
                              {limitedTimeDeal}% OFF
                            </Text>
                          </Text>
                        )}
                      </Text>
                    </VStack>
                    <Box className="flex-col sm:flex-row">
                      <Button className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1">
                        <ButtonText size="sm">Add to cart</ButtonText>
                      </Button>
                      <Button
                        variant="outline"
                        className="px-4 py-2 border-outline-300 sm:flex-1"
                        onPress={() => removeFromFavorites(item.id)}
                      >
                        <ButtonText size="sm" className="text-typography-600">
                          {isFavorite
                            ? "Remove from Favorites"
                            : "Add to Favorites"}
                        </ButtonText>
                      </Button>
                    </Box>
                  </Card>
                </Pressable>
              );
            })}

            <Button onPress={handleClearAll} className="m-4">
              <ButtonText size="sm">Clear All Favorites</ButtonText>
            </Button>
          </>
        ) : (
          <Text className="text-center">No favorites added yet</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default FavoritesScreen;
