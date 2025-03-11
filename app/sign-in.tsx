// React Native imports
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

// Dependencies
import { SafeAreaView } from "react-native-safe-area-context";

// Constants
import images from "@/constants/images";
import icons from "@/constants/icons";

export default function SignIn() {
    return (
        <SafeAreaView className="bg-white h-full">
            {/* Full Height Vertically Scrollable View  */}
            <ScrollView contentContainerClassName="h-full mt-2">
                {/* Cover Image - Top */}
                <Image
                    source={images.onboarding}
                    className="w-full h-4/6"
                    resizeMode="contain"
                />

                <View className="px-10">
                    {/* Opening Texts */}
                    <View>
                        <Text className="font-rubik uppercase text-base text-center text-black-200">Welcome to Real Scout</Text>
                        <Text className="font-rubik-semibold text-2xl text-center mt-1">Let&apos;s get you closer to {"\n"}
                            <Text className="text-primary-300">
                                Your ideal home
                            </Text>
                        </Text>
                    </View>

                    {/* Call-to-action Text - Login w/ Google */}
                    <Text className="font-rubik text-base text-center text-black-200 mt-9">Login to Real Scout with Google</Text>

                    {/* Call-to-action Button - Login w/ Google */}
                    <TouchableOpacity className="mt-3 bg-white shadow-md shadow-zinc-300 border border-accent-100 w-full rounded-full py-4">
                        <View className="flex flex-row items-center justify-center gap-x-3">
                            <Image
                                source={icons.google}
                                className="size-6"
                                resizeMode="contain"
                            />
                            <Text className="text-base font-rubik-medium">Sign up with Google</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}