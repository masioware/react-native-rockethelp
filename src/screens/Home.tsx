import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  VStack,
  HStack,
  IconButton,
  Text,
  Heading,
  FlatList,
  useTheme,
  Center,
} from "native-base";
import { SignOut, ChatTeardropText } from "phosphor-react-native";
import Logo from "../assets/logo_secondary.svg";
import { Button } from "../components/Button";
import { Filter } from "../components/Filter";
import { Order, OrderProps } from "../components/Order";

export function Home() {
  const [statusSelected, setStatusSelected] = useState<"open" | "closed">(
    "open"
  );

  const [orders, setOrders] = useState<OrderProps[]>([
    {
      id: "1",
      patrimony: "123456",
      when: "16/07/2022 às 10:42",
      status: "open",
    },
    {
      id: "2",
      patrimony: "822144",
      when: "20/07/2022 às 09:50",
      status: "open",
    },
    // {
    //   id: "3",
    //   patrimony: "023167",
    //   when: "25/07/2022 às 15:17",
    //   status: "closed",
    // },
    // {
    //   id: "4",
    //   patrimony: "923991",
    //   when: "30/07/2022 às 18:03",
    //   status: "closed",
    // },
  ]);

  const navigation = useNavigation();
  const { colors } = useTheme();

  const handleNewOrder = () => navigation.navigate("new");
  const handleOpenDetails = (orderId: string) => {
    navigation.navigate("details", { orderId });
  };

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />
        <IconButton icon={<SignOut size={26} color={colors.gray[300]} />} />
      </HStack>
      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.100">Solicitações</Heading>
          <Text color="gray.200">{orders.length}</Text>
        </HStack>
        <HStack space={3} mb={8}>
          <Filter
            type="open"
            title="em andamento"
            onPress={() => setStatusSelected("open")}
            isActive={statusSelected === "open"}
          />
          <Filter
            type="closed"
            title="Finalizado"
            onPress={() => setStatusSelected("closed")}
            isActive={statusSelected === "closed"}
          />
        </HStack>
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Order data={item} onPress={() => handleOpenDetails(item.id)} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={() => (
            <Center>
              <ChatTeardropText size={40} color={colors.gray[300]} />
              <Text color="gray.300" fontSize="xl" mt="6" textAlign="center">
                Você ainda não possui {"\n"} solicitações
                {statusSelected === "open" ? " em andamento" : " finalizadas"}
              </Text>
            </Center>
          )}
        />
        <Button title="Nova solicitação" onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
}
