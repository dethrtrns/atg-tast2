import {
  Avatar,
  Card,
  Flex,
  Text,
  TextInput,
  Textarea,
  Transition,
  createStyles,
} from "@mantine/core";
import React from "react";

const useStyles = createStyles((theme) => ({
  glassmorphism: {
    backgroundColor: theme.colors.indigo[1],
    backdropFilter: "blur(100px)",
    webkitBackdropFilter: "blur(100px)",
    borderRadius: "10px",
    border: `1px solid ${theme.colors.indigo[1]}`,
  },
}));

const UserDetailsCard = ({
  avatarUrl,
  username,
  fullName,
  bio,
  JobTitle,
  email,
  opened,
}) => {
  const { classes, cx, theme } = useStyles();

  return (
    <>
      <Transition
        mounted={opened}
        transition='slide-down'
        duration={300}
        exitDuration={200}
        timingFunction='ease-in-out'>
        {(styles) => (
          <Card
            className={classes.glassmorphism}
            style={{ ...styles }}
            radius='md'
            shadow='lg'
            padding='xl'
            w='30vw'
            miw={350}
            maw={450}
            component='div'>
            <Card.Section>
              <Text
                bg={theme.colors.indigo[3]}
                color={theme.colors.indigo[9]}
                w='100%'
                fz={26}
                fw={600}
                align='center'
                mb={32}>
                User Details
              </Text>
              <Flex justify='center'>
                <Avatar
                  justifyContent='center'
                  size='xl'
                  radius='50%'
                  color='indigo'
                  src={avatarUrl}
                  alt={username}
                />
              </Flex>
              <Text
                color='indigo'
                align='center'
                weight={500}
                size={16}
                mt='xs'>
                @{username}
              </Text>
            </Card.Section>

            <Textarea
              mt={5}
              className='glassmorphism'
              autosize
              variant='unstyled'
              value={bio}
            />
            <TextInput
              classNames={{ input: "glassmorphism" }}
              radius='md'
              variant='default'
              value={fullName}
              label='Full Name'
            />
            <TextInput
              classNames={{ input: "glassmorphism" }}
              radius='md'
              variant='default'
              value={JobTitle}
              label='Job Title'
            />
            <TextInput
              classNames={{ input: "glassmorphism" }}
              radius='md'
              variant='default'
              value={email}
              label='Email'
            />
          </Card>
        )}
      </Transition>
    </>
  );
};

export default UserDetailsCard;
