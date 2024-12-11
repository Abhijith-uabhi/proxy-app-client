// Chakra imports
import { Flex, Grid, useColorModeValue } from "@chakra-ui/react";
import avatar4 from "assets/img/avatars/avatar4.png";
import ProfileBgImage from "assets/img/ProfileBackground.png";
import React, { useEffect, useState } from "react";
import { FaCube, FaPenFancy } from "react-icons/fa";
import Header from "./components/Header";
import PlatformSettings from "./components/PlatformSettings";
import ProfileInformation from "./components/ProfileInformation";

import userService from "../../../services/userService";
import { useSelector } from "react-redux";

function Profile() {

  const { user } = useSelector((state) => (state.auth))

  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const bgProfile = useColorModeValue(
    "hsla(0,0%,100%,.8)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );



  return (
    <Flex direction='column'>
      <Header
        backgroundHeader={ProfileBgImage}
        backgroundProfile={bgProfile}
        avatarImage={avatar4}
        name={`${user?.first_name} ${user?.last_name}`}
        email={user?.email}
        tabs={[


          {
            name: "EDIT PROFILE",
            icon: <FaPenFancy w='100%' h='100%' />,
          },
          {
            name: "CHANGE PASSWORD",
            icon: <FaPenFancy w='100%' h='100%' />,
          },
        ]}
      />
      <Grid templateColumns={{ sm: "1fr", xl: "repeat(3, 1fr)" }} gap='22px'>
        <ProfileInformation
          title={"Profile Information"}

          name={`${user?.first_name} ${user?.last_name}`}
          mobile={user?.phone_number}
          email={user?.email}
          location={"United States"}
        />
        <PlatformSettings
          title={"Platform Settings"}
          subtitle1={"ACCOUNT"}
        // subtitle2={"APPLICATION"}
        />

      </Grid>

    </Flex>
  );
}

export default Profile;
