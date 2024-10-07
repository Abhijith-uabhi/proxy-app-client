// Chakra Icons
import { BellIcon, SearchIcon } from "@chakra-ui/icons";
// Chakra Imports
import {
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  Badge

} from "@chakra-ui/react";
// Assets
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import { SignOutIcon } from "components/Icons/Icons";
// Custom Icons
import { ProfileIcon, SettingsIcon } from "components/Icons/Icons";
// Custom Components
import { ItemContent } from "components/Menu/ItemContent";
import SidebarResponsive from "components/Sidebar/SidebarResponsive";
import { AUTH_TOKEN } from "config/authConfig";
import { socket } from "connection/socket";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import routes from "routes";
import { timeAgo } from "utils/timeFormatter";


export default function HeaderLinks(props) {
  const { variant, children, fixed, secondary, onOpen, ...rest } = props;
  const [notifications, setNotifications] = useState()

  const location=useLocation()

  // Chakra Color Mode
  let mainTeal = useColorModeValue("teal.300", "teal.300");
  let inputBg = useColorModeValue("white", "gray.800");
  let mainText = useColorModeValue("gray.700", "gray.200");
  let navbarIcon = useColorModeValue("gray.500", "gray.200");
  let searchIcon = useColorModeValue("gray.700", "gray.200");

  if (secondary) {
    navbarIcon = "white";
    mainText = "white";
  }
  const settingsRef = React.useRef();
  useEffect(() => {
    const savedNotifications = JSON.parse(localStorage.getItem("notifications"));
    if (savedNotifications) {
      setNotifications(savedNotifications);
    }

    // Listen to the "task_notification" event
    socket.on("task_notification", (data) => {
      console.log("TASK NOTIFICATION RECEIVED:", data);

      let updatedNotifications;
      if (notifications) {
        updatedNotifications = [...notifications, data];
      } else {
        updatedNotifications = [data];
      }

      // Update state and localStorage
      setNotifications(updatedNotifications);
      localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
    });

    // Cleanup listener to avoid duplicate events
    return () => {
      socket.off("task_notification");
    };
  }, []);

  // Logic to clear notifications when navigating to "/admin/tasks"
  useEffect(() => {
    if (location.pathname === "/admin/tasks") {
      localStorage.removeItem("notifications");
      setNotifications([]); // Ensure notifications are cleared in the UI
    }
  }, [location]);

  console.log("Notifications state:", notifications);


  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
    >
      <InputGroup
        cursor="pointer"
        bg={inputBg}
        borderRadius="15px"
        w={{
          sm: "128px",
          md: "200px",
        }}
        me={{ sm: "auto", md: "20px" }}
        _focus={{
          borderColor: { mainTeal },
        }}
        _active={{
          borderColor: { mainTeal },
        }}
      >
        <InputLeftElement
          children={
            <IconButton
              bg="inherit"
              borderRadius="inherit"
              _hover="none"
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "none",
              }}
              icon={<SearchIcon color={searchIcon} w="15px" h="15px" />}
            ></IconButton>
          }
        />
        <Input
          fontSize="xs"
          py="11px"
          color={mainText}
          placeholder="Type here..."
          borderRadius="inherit"
        />
      </InputGroup>
      <Menu>
        <MenuButton>
          <Button
            ms="0px"
            px="0px"
            // me={{ sm: "2px", md: "8px" }}
            color={navbarIcon}
            variant="transparent-with-icon"
            rightIcon={
              document.documentElement.dir ? (
                ""
              ) : (
                <ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px" />
              )
            }
            leftIcon={
              document.documentElement.dir ? (
                <ProfileIcon color={navbarIcon} w="18px" h="18px" me="0px" />
              ) : (
                ""
              )
            }
            onClick={() => localStorage.removeItem(AUTH_TOKEN)} />

        </MenuButton>
        <MenuList>
          <NavLink to="/admin/profile">
            <MenuItem icon={<ProfileIcon w="16px" h="16px" />}>
              Profile
            </MenuItem>
          </NavLink>
          <NavLink to="/auth/signin">
            <MenuItem
              icon={<SignOutIcon w="16px" h="16px" />}
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN);
                localStorage.removeItem("notifications")
              }}
            >
              Sign Out
            </MenuItem>
          </NavLink>

        </MenuList>
      </Menu>

      {/* <NavLink to="/auth/signin">
        <Button
          ms="0px"
          px="0px"
          me={{ sm: "2px", md: "16px" }}
          color={navbarIcon}
          variant="transparent-with-icon"
          rightIcon={
            document.documentElement.dir ? (
              ""
            ) : (
              <SignOutIcon color={navbarIcon} w="22px" h="22px" me="0px" />
            )
          }
          leftIcon={
            document.documentElement.dir ? (
              <SignOutIcon color={navbarIcon} w="18px" h="18px" me="0px" />
            ) : (
              ""
            )
          }
          onClick={() => localStorage.removeItem(AUTH_TOKEN)}      >
          <Text display={{ sm: "none", md: "flex" }} >Sign Out</Text>
        </Button>
      </NavLink> */}


      <SidebarResponsive
        logoText={props.logoText}
        secondary={props.secondary}
        routes={routes}
        // logo={logo}
        {...rest}
      />
      <SettingsIcon
        cursor="pointer"
        ms={{ base: "16px", xl: "0px" }}
        me="16px"
        ref={settingsRef}
        onClick={props.onOpen}
        color={navbarIcon}
        w="18px"
        h="18px"
      />
      <Menu>
        <MenuButton position="relative" >
          <BellIcon color={navbarIcon} w="18px" h="18px" />
          {notifications?.length > 0 && (
            <Badge
              colorScheme="red"
              borderRadius="full"
              px={2}
              position="absolute"
              top="-4"
              right="-2"
              fontSize="0.9em"
            >
              {notifications.length}
            </Badge>
          )}
        </MenuButton>
        <MenuList p="16px 8px">
          <Flex flexDirection="column">

            {notifications?.map((item, index) => (
              <NavLink to="/admin/tasks" key={index}>
                <MenuItem
                  borderRadius="8px"
                  mb="10px"
                >
                  <ItemContent
                    time={timeAgo(item.created_at)}
                    info={`from ${item.user}`}
                    boldInfo="New Task"
                    aName="Alicia"
                    aSrc={avatar1}
                  />
                </MenuItem>
              </NavLink>
            ))}



            {/* <MenuItem borderRadius="8px" mb="10px">
              <ItemContent
                time="2 days ago"
                info="by Josh Henry"
                boldInfo="New Album"
                aName="Josh Henry"
                aSrc={avatar2}
              />
            </MenuItem>
            <MenuItem borderRadius="8px">
              <ItemContent
                time="3 days ago"
                info="Payment succesfully completed!"
                boldInfo=""
                aName="Kara"
                aSrc={avatar3}
              />
            </MenuItem> */}
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
