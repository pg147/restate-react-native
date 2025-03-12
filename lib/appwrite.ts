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
        const response = await account.createOAuth2Token(OAuthProvider.Google, redirectUri);  // parameters -> provider, redirectURL

        // If response is returned as null
        if (!response) throw new Error('Failed to Log in!');

        // If success, creating a session with a Browser for logging in 
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
        if (!session) throw new Error('Failed to create a session!');

        return true; // only when session is successfully created
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function logout() {
    try {
        await account.deleteSession('current'); // deletes the current session of the user
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function getUser() {
    try {
        const user = await account.get();  // returns currently logged-in user

        // If user found
        if (user.$id) {
            const userAvatar = avatar.getInitials(user.name); // fetching avatar image

            return {
                ...user,
                avatar: userAvatar.toString()  // appending it to the response object with user details
            }
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}