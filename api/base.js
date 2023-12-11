export const BASE_URL = `https://test.scud.io/api/v1/`;
// export const BASE_URL = `http://192.168.0.40:3010/api/v1/`;

// export const SOCKET_BASE_URL = "ws://192.168.0.40:3010/";
export const SOCKET_BASE_URL = "wss://test.scud.io/";

export const WEBSITE_BASE_URL = "https://scud-ride-web.vercel.app/";

export const STATE_URL = BASE_URL + `states?country_id=${40}`;

export const RIDE_REQUEST_URL = SOCKET_BASE_URL + "rides";
// export const CHAT_URL = "ws://192.168.0.95:3011/chats";
export const CHAT_URL = SOCKET_BASE_URL + "chats";
export const All_USERS_POSITION_URL = SOCKET_BASE_URL + "admin";
