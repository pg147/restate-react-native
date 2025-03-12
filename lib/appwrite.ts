// Appwrite imports
import { Account, Avatars, Client, OAuthProvider } from 'react-native-appwrite';

// Expo imports
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

// Config object for client creation
export const config = {
    platform: 'com.pg.restate', // project package name as set in appwrite 
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID
}

export const client = new Client();  // initialized a client

// Client setup
client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform);

// Avatars and Account setup with initialized client
export const avatar = new Avatars(client);
export const account = new Account(client);

export async function login() {
    try {
        // Creating a redirect URL for success
        const redirectUri = Linking.createURL('/'); // parameter -> path

        // fetching a token provided as a response from OAuthGoogle 
        const response = await account.createOAuth2Token(OAuthProvider.Google, redirectUri);

        // If response is returned as null
        if (!response) throw new Error('Failed to Log in!');

        // If success, creating a session with a Browswer for logging in 
        const browserResult = await WebBrowser.openAuthSessionAsync(
            response.toString(),
            redirectUri
        )

        // If login is not successful
        if (browserResult.type !== 'success') throw new Error('Failed to Log in!');

        // If success, storing the url
        const url = new URL(browserResult.url);

        // Extracting secret and userId from parameters through URL
        const secret = url.searchParams.get('secret')?.toString();
        const userId = url.searchParams.get('userId')?.toString();

        // If any of secret or userId doesn't exist
        if (!secret || !userId) throw new Error('Failed to log in!');

        // Creating a session if userId and secret exists
        const session = await account.createSession(userId, secret);

        // If session creation remains unsuccessful
        if (!session) throw new Error('Failed to Log in!');

        return true; // only when session is successfully created
    } catch (error) {
        console.log("Error logging in : ", error);
        return false;
    }
}
