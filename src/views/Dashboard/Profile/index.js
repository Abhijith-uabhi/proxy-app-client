// Chakra imports
import { Flex, Grid, useColorModeValue } from "@chakra-ui/react";
import avatar4 from "assets/img/avatars/avatar4.png";
import ProfileBgImage from "assets/img/ProfileBackground.png";
import React, { useEffect, useState } from "react";
import { FaCube, FaPenFancy } from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";
import Conversations from "./components/Conversations";
import Header from "./components/Header";
import PlatformSettings from "./components/PlatformSettings";
import ProfileInformation from "./components/ProfileInformation";
import Projects from "./components/Projects";
import taskService from "services/taksService";
import authService from "services/authService";

function Profile() {
  const [user, setser] = useState()

  useEffect(() => {
    getUser()
  }, [])


  const getUser = async () => {
    try {
      const user = await authService.getUser()
      console.log(user.data);

      setser(user.data)
    } catch (error) {
      console.log("Error fetching the user", error);

    }
  }

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
            name: "OVERVIEW",
            icon: <FaCube w='100%' h='100%' />,
          },
          {
            name: "TEAMS",
            icon: <IoDocumentsSharp w='100%' h='100%' />,
          },
          {
            name: "PROJECTS",
            icon: <FaPenFancy w='100%' h='100%' />,
          },
        ]}
      />
      <Grid templateColumns={{ sm: "1fr", xl: "repeat(3, 1fr)" }} gap='22px'>
        <PlatformSettings
          title={"Platform Settings"}
          subtitle1={"ACCOUNT"}
          subtitle2={"APPLICATION"}
        />
        <ProfileInformation
          title={"Profile Information"}
         
          name={`${user?.first_name} ${user?.last_name}`}
          mobile={user?.phone_number}
          email={user?.email}
          location={"United States"}
        />
        <Conversations title={"Conversations"} />
      </Grid>
      {/* <Projects title={"Projects"} description={"Architects design houses"} /> */}
    </Flex>
  );
}

export default Profile;
