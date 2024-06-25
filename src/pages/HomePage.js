import React, { useState } from "react";
import {
  Box,
  useDisclosure,
  Text,
  IconButton,
  useColorMode,
  Flex,
  Button,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import IconPicker from "../components/IconPicker";
import * as featherIcons from "feather-icons";

const HomePage = () => {
  const [selectedIcon, setSelectedIcon] = useState(null); // State to hold the selected icon name
  const { isOpen, onOpen, onClose } = useDisclosure(); // Control the visibility of the icon picker modal
  const { colorMode, toggleColorMode } = useColorMode(); // Hook to toggle color mode

  // Function to handle icon selection
  const handleIconSelect = (iconName) => {
    setSelectedIcon(iconName); // Updates the selectedIcon state with the chosen iconName
    onClose(); // Closes the icon picker modal after selection
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg={colorMode === "light" ? "gray.50" : "gray.900"}
    >
      <Flex direction="column" alignItems="center">
        <IconButton
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          isRound
          size="md"
          alignSelf="flex-end"
          onClick={toggleColorMode}
          mb={4}
          pos={"absolute"}
          top={"40px"}
          right={"40px"}
        />
        <Box
          width="100px"
          height="100px"
          borderWidth="2px"
          borderRadius="md"
          display="flex"
          justifyContent="center"
          alignItems="center"
          cursor="pointer"
          onClick={onOpen} // Opens the icon picker modal on click
          _hover={{ borderColor: "blue.500", boxShadow: "md" }} // Highlight border on hover
          transition="all 0.3s"
          bg={colorMode === "light" ? "white" : "gray.700"}
          boxShadow="sm"
        >
          {selectedIcon && featherIcons.icons[selectedIcon] ? (
            <Box
              as="span"
              dangerouslySetInnerHTML={{
                __html: featherIcons.icons[selectedIcon].toSvg({
                  width: 72,
                  height: 72,
                  color: colorMode === "light" ? "black" : "white",
                }),
              }}
            />
          ) : (
            <Text
              textAlign="center"
              fontSize="14px"
              color="gray.500"
              fontWeight="600"
              p={2}
            >
              Select an icon
            </Text>
          )}
        </Box>
        {isOpen && (
          <IconPicker
            rowsInOnePage={6}
            columnsInOnePage={7}
            iconHeight={32}
            iconWidth={32}
            onIconSelect={handleIconSelect}
          />
        )}
      </Flex>
    </Box>
  );
};

export default HomePage;
