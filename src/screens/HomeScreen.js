import React, { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import { Card } from "../../components/ui/card/index";
import { VStack } from "../../components/ui/vstack/index";
import { Heading } from "../../components/ui/heading/index";
import { Box } from "../../components/ui/box/index";
import { Image } from "../../components/ui/image/index";
import { Button, ButtonText } from "../../components/ui/button/index";
import { useFavorites } from "../../FavoritesContext";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [artTools, setArtTools] = useState([]);
  const [filteredTools, setFilteredTools] = useState([]);
  const [brands, setBrands] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { favorites, addToFavorites } = useFavorites();

  useEffect(() => {
    const fetchArtTools = async () => {
      try {
        const response = await axios.get(
          "https://66938d34c6be000fa07bf76f.mockapi.io/CuongPDSE173196",
        );
        setArtTools(response.data);
        setFilteredTools(response.data);
        const uniqueBrands = [
          ...new Set(response.data.map((item) => item.brand)),
        ];
        setBrands(uniqueBrands);
      } catch (error) {
        console.error("Error fetching art tools", error);
      }
    };
    fetchArtTools();
  }, []);

  const filterByBrand = (brand) => {
    const filtered = artTools.filter((tool) => tool.brand === brand);
    setFilteredTools(filtered);
  };

  const resetFilter = () => {
    setFilteredTools(artTools);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = artTools.filter((tool) =>
        tool.artName.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredTools(filtered);
    } else {
      setFilteredTools(artTools);
    }
  };

  return (
      <View>
        <View
          className="flex  flex-row  flex-wrap justify-center mb-4 sticky top-0"
        >
          {brands.map((brand) => (
            <Button
              key={brand}
              onPress={() => filterByBrand(brand)}
              size="sm"
              variant="solid"
              action="primary"
              className="m-1"

            >
              <ButtonText size="sm" className="text-white">
                {brand}
              </ButtonText>
            </Button>
          ))}

          <Button
            onPress={resetFilter}
            size="sm"
            variant="solid"
            action="positive"
          >
            <ButtonText size="sm" className="text-white">
              Show All
            </ButtonText>
          </Button>
        </View>

            <ScrollView>
            <View className="flex justify-center">
          <TextInput
            value={searchQuery}
            onChangeText={handleSearch}
            placeholder="Search for art tools..."
            className="border rounded-lg p-1 mb-4 w-1/2"
          />
        </View>

        <View className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredTools.map((item) => {
            const isFavorite = favorites.some((fav) => fav.id === item.id);
            const limitedTimeDeal = item.limitedTimeDeal;

            return (
              <Pressable
                key={item.id}
                onPress={() => navigation.navigate("Detail", { artTool: item })}
              >
                <Card className="p-5 rounded-lg m-3 border-4">
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
                    <Text size="sm">Price: {item.price}</Text>
                  </VStack>
                  <Box className="flex-col sm:flex-row">
                    <Button className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1">
                      <ButtonText size="sm">Add to cart</ButtonText>
                    </Button>
                    <Button
                      variant="outline"
                      onPress={() => addToFavorites(item)}
                      className="px-4 py-2 border-outline-300 sm:flex-1"
                      disabled={isFavorite}
                    >
                      <ButtonText size="sm" className="text-typography-600">
                        {isFavorite ? "In Wishlist" : "Add to Wishlist"}
                      </ButtonText>
                    </Button>
                  </Box>
                </Card>
              </Pressable>
            );
          })}
        </View>
            </ScrollView>
       
      </View>
  );
};

export default HomeScreen;
