import {
  Avatar,
  Collapse,
  Divider,
  Flex,
  Loader,
  Overlay,
  ScrollArea,
  Skeleton,
  Tabs,
  Text,
  Transition,
  createStyles,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import UserDetailsCard from "./UserDetailsCard";

const useStyles = createStyles((theme) => ({
  glassmorphism: {
    backgroundColor: theme.colors.indigo[2],
    backdropFilter: "blur(10px)",
    webkitBackdropFilter: "blur(10px)",
    borderRadius: "10px",
    border: "1px solid rgba( 255,255,255, 0.5)",
  },
}));

const UserList = () => {
  const { classes, cx, theme } = useStyles();

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [skeleton, setSkeleton] = useState(true);
  const [error, setError] = useState(null);
  const [activeUser, setActiveUser] = useState(null);
  const [isCardOpened, setCardOpened] = useState(false);

  useEffect(() => {
    fetch("https://602e7c2c4410730017c50b9d.mockapi.io/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        setIsLoading(false);
        return response.json();
      })
      .then((data) => {
        setUsers(data.reverse());
        if (data.length > 0) setActiveUser(data[0]);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
        console.error("Error:", error);
      });
  }, []);

  const handleTabChange = (userId) => {
    // if (userId === activeUser.id) return;
    if (!skeleton) setCardOpened(false);
    const user = users.find((user) => user.id === userId);
    if (user) setActiveUser(user);
    setTimeout(() => {
      setSkeleton(false);
      setCardOpened(true);
    }, 200);
  };

  if (isLoading || error) {
    return (
      <Overlay
        w='100vw'
        h='100vh'>
        <Flex
          h='100vh'
          w='100vw'
          justify='center'
          align='center'>
          {isLoading && (
            <Loader
              size='xl'
              variant='bars'
              color='indigo'
            />
          )}
          {error && (
            <Text
              w={"80vw"}
              p={10}
              mx={5}
              align='center'
              className='glassmorphism'
              color={theme.colors.red[9]}
              bg={`url(https://images.unsplash.com/photo-1633078654544-61b3455b9161?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZXJyb3IlMjBtZXNzYWdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=1000&q=60), ${theme.colors.dark[6]}`}
              bgsz='cover'
              sx={{
                backgroundBlendMode: "screen",
              }}
              size={50}>
              Oops! Something Broke! <Divider />
              Error:{error.message} <Divider /> Refresh or Try again later...
            </Text>
          )}
        </Flex>
      </Overlay>
    );
  }

  return (
    <Flex
      bg={theme.colors.blue[0]}
      w={"100vw"}
      mih='100vh'
      justify='center'
      align='center'>
      <Collapse
        in={activeUser}
        transitionDuration={1000}
        transitionTimingFunction='ease-in'>
        <Tabs
          // allowTabDeactivation
          color='none'
          variant='pills'
          orientation='vertical'
          //   defaultValue='92'
          // value={activeUser? activeUser.id : users[0].id}
          onTabChange={handleTabChange}>
          <Tabs.List>
            <Text
              w={"95%"}
              align='center'
              color='indigo'
              fz='xl'
              py={8}
              mt={10}
              className='glassmorphism'
              fw={700}>
              Users List
            </Text>
            <ScrollArea
              offsetScrollbars
              h={"100vh"}>
              {users.length < 1 && (
                <Text
                  bg={theme.colors.red[3]}
                  w='100%'
                  align='center'
                  c={"red"}
                  fz='xl'
                  fw='bolder'>
                  No Data To Show.
                </Text>
              )}
              {users.map((user) => (
                <Tabs.Tab
                  w={"22vw"}
                  miw={240}
                  my={10}
                  py={5}
                  className='glassmorphism'
                  value={user.id}
                  key={user.id}
                  icon={
                    <Avatar
                      variant='filled'
                      size={35}
                      radius='xl'
                      color='indigo'
                      src={user.avatar}
                      alt={user.profile.firstName}
                    />
                  }>
                  <Text
                    fz={"md"}
                    fw={600}>
                    {user.profile.firstName} {user.profile.lastName}
                  </Text>
                </Tabs.Tab>
              ))}
            </ScrollArea>
          </Tabs.List>
          <Flex
            //   w={"100%"}
            justify='center'
            align='center'>
            <Transition
              //   keepMounted
              mounted={skeleton}
              transition='slide-up'
              duration={200}
              exitDuration={200}
              timingFunction='ease-out'>
              {(styles) =>
                skeleton && (
                  <Flex
                    sx={{
                      overflow: "hidden",
                    }}
                    style={styles}
                    direction='column'
                    align='center'
                    justify='space-between'
                    className='glassmorphism'
                    display={skeleton ? "flex" : "none"}
                    h={450}
                    w={350}>
                    <Skeleton
                      height={40}
                      radius={0}
                      visible={skeleton}
                    />
                    <Skeleton
                      height={100}
                      circle
                      visible={skeleton}
                    />
                    <Skeleton
                      height={20}
                      width='45%'
                      radius='md'
                      visible={skeleton}
                    />
                    <Skeleton
                      height={80}
                      width='85%'
                      radius='md'
                      visible={skeleton}
                    />
                    <Skeleton
                      height={30}
                      width='85%'
                      radius='md'
                      visible={skeleton}
                    />
                    <Skeleton
                      height={30}
                      width='85%'
                      radius='md'
                      visible={skeleton}
                    />
                    <Skeleton
                      height={30}
                      width='85%'
                      radius='md'
                      mb={20}
                      visible={skeleton}
                    />
                  </Flex>
                )
              }
            </Transition>
            {activeUser && (
              <Tabs.Panel
                pl={"xl"}
                value={activeUser.id}>
                <UserDetailsCard
                  avatarUrl={activeUser.avatar}
                  JobTitle={activeUser.jobTitle}
                  bio={activeUser.Bio}
                  email={activeUser.profile.email}
                  fullName={`${activeUser.profile.firstName} ${activeUser.profile.lastName}`}
                  username={activeUser.profile.username}
                  opened={isCardOpened}
                />
              </Tabs.Panel>
            )}
          </Flex>
        </Tabs>
      </Collapse>
    </Flex>
  );
};

export default UserList;
