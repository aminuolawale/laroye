import React from "react";
import LinkSocialAccountForm from "../components/LinkSocialAccountForm";
import SocialAccount from "../components/SocialAccount";
import { default as GoogleLogin } from "../components/GoogleLogin";
import {
  useGetSocialAccountsQuery,
  useGetUserQuery,
} from "../features/user/userApiSlice";
import TwitterLogin from "../components/TwitterLogin";

const availableSocialAccountProviders = [
  "google",
  "facebook",
  "instagram",
  "twitter",
];

type ProviderMap = {
  google: () => JSX.Element;
  twitter: () => JSX.Element;
};
const providerLoginComponentMap: ProviderMap = {
  google: GoogleLogin,
  twitter: TwitterLogin,
};

const Account = () => {
  const { data, isSuccess } = useGetSocialAccountsQuery();
  if (!isSuccess) return <p>Loading....</p>;
  const { success, errors, data: socialAccounts } = data;
  const linkedProviders = new Set<string>(
    socialAccounts.map((socialAccount: any) => socialAccount.provider)
  );
  const content = (
    <div>
      {socialAccounts.map((socialAccount: any) => (
        <SocialAccount key={socialAccount.id} account={socialAccount} />
      ))}
      {availableSocialAccountProviders
        .filter(
          (provider: string) =>
            !linkedProviders.has(provider) &&
            provider in providerLoginComponentMap &&
            provider !== "google"
        )
        .map((provider: string) => {
          const Component =
            providerLoginComponentMap[provider as keyof ProviderMap];
          return <Component key={provider} />;
        })}
    </div>
  );
  return content;
};

export default Account;
