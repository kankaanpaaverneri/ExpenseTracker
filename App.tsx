import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./components/Home";
import { Categories } from "./components/Categories";
import { Expenses } from "./components/Expenses";
import { Account } from "./components/Account";
import { Provider } from "react-redux";
import { store } from "./store/store";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Category } from "./util/types";

export type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

import type { RouteProp } from "@react-navigation/native";
export type ProfileScreenRouteProp = RouteProp<
  RootStackParamList,
  "Categories"
>;

type RootStackParamList = {
  Home: undefined;
  Categories: undefined;
  Expenses: undefined;
  Account: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="Expenses" component={Expenses} />
      <Stack.Screen name="Account" component={Account} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
}
