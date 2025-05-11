import Feather from "@expo/vector-icons/Feather";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import Colors from "../constants/Colors";
import { getLocalStorage } from "../service/Storage";
export default function Header() {
  const [user, setUser] = useState();
  useEffect(() => {
    GetUserDetail();
  }, []);

  const GetUserDetail = async () => {
    const userInfo = await getLocalStorage("useDetail");
    console.log(userInfo);
    setUser(userInfo);
  };

  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Image
            source={require("./../assets/images/smiley.png")}
            style={{
              width: 45,
              height: 40,
            }}
          />
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
            }}
          >
            Hello, {user?.displayName || "Guest"}
          </Text>
        </View>

        <Feather name="settings" size={34} color={Colors.DARK_GRAY} />
      </View>
    </View>
  );
}
