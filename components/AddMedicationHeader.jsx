import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";

export default function AddMedicationHeader() {
  const router = useRouter();
  return (
    <View>
      <Image
        source={require("./../assets/images/consult.png")}
        style={{
          width: "100%",
          height: 280,
        }}
      />
      <TouchableOpacity
        style={{
          position: "absolute",
          padding: 25,
        }}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
