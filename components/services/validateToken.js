import { BASE_URL } from "../../api/base";
import { setCookie } from "cookies-next";

export const validateToken = async (context, isAdmin) => {
  const tokenName = isAdmin ? "adminAccessToken" : "accessToken";
  const tokenRefreshName = isAdmin ? "adminRefreshToken" : "refreshToken";
  const { req, res } = context;
  try {
    let tokenData = await refreshToken(context, isAdmin);

    if (tokenData?.redirect) {
      throw new Error("Token refresh failed");
    }

    setCookie(tokenName, tokenData.access, { req, res, maxAge: 1 * 24 * 60 * 60 });
    setCookie(tokenRefreshName, tokenData.refresh, { req, res, maxAge: 30 * 24 * 60 * 60 });

    // Refresh the page to apply the new cookie
    context.res.setHeader("Refresh", "0; url=" + context.req.url);
  } catch (err) {
    throw new Error("Token refresh failed");
    // const login_url = isAdmin ? `/admin/auth` : `/signin/driver-signin`;

    // context.res.setHeader("Redirect", "0; url=" + context.req.headers.origin + login_url);
    // return { redirect: { destination: login_url, permanent: false } };
  }
};

export async function refreshToken(context, isAdmin) {
  const token = isAdmin
    ? context.req.cookies.adminRefreshToken || ""
    : context.req.cookies.refreshToken || "";

  const response = await fetch(BASE_URL + "auth/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ refreshToken: token })
  });

  const data = await response.json();

  if (response.ok) {
    // Token refresh was successful

    const successData = {
      access: data.accessToken,
      refresh: data.refreshToken
    };
    return successData;
  } else if (
    data.message == "token expired" ||
    data.message == "expired" ||
    data.statusCode == 401
  ) {
    const login_url = isAdmin ? `/admin/auth` : `/signin/driver-signin`;
    // Token has expired, redirect to login page
    return { redirect: { destination: login_url, permanent: false } };
  }
}
