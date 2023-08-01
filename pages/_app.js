import { RepoProvider } from "@/contexts/RepoContext";
import { UserDataProvider } from "@/contexts/UserDataContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <RepoProvider>
      <UserDataProvider>
        <Component {...pageProps} />
      </UserDataProvider>
    </RepoProvider>
  );
}
