import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";

import { ClerkProvider } from '@clerk/nextjs'
import { NavBar } from "~/components/NavBar";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className="text-white">
      <ClerkProvider {...pageProps}>
        <NavBar />
        <Component {...pageProps} />
      </ClerkProvider>
    </div>
)};

export default api.withTRPC(MyApp);
