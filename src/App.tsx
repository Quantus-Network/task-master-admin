import { useEffect, useState } from "react";
import { Admin, defaultDarkTheme, Resource } from "react-admin";

import { dataProvider } from "@/providers/data-provider";
import { authProvider } from "@/providers/auth-provider";
import { hydrateAuth } from "@/lib/auth";
import { ResourcePack } from "@/lib/resources";

import Layout from "@/layout/layout";

import address from "@/modules/address";
import tweet from "@/modules/tweet";
import tweetAuthors from "@/modules/tweet-author";
import raidQuests from "@/modules/raid-quest";

export const App = () => {
  const [isAuthHydated, setIsAuthHydated] = useState(false);

  useEffect(() => {
    const validateAuth = async () => {
      await hydrateAuth();
      setIsAuthHydated(true);
    };

    if (!isAuthHydated) validateAuth();
  }, [isAuthHydated]);

  if (!isAuthHydated) return <></>;

  return (
    <Admin
      layout={Layout}
      dataProvider={dataProvider}
      authProvider={authProvider}
      darkTheme={null}
      disableTelemetry
      theme={defaultDarkTheme}
    >
      <Resource name={ResourcePack.Addresses} {...address} />
      <Resource name={ResourcePack.Tweets} {...tweet} />
      <Resource name={ResourcePack.TweetAuthors} {...tweetAuthors} />
      <Resource name={ResourcePack.RaidQuests} {...raidQuests} />
    </Admin>
  );
};
