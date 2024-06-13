import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import IconPicker from "../components/IconPicker";
import * as featherIcons from "feather-icons";

const HomePage = () => {
  const [selectedIcon, setSelectedIcon] = useState(null); // state to hold the selected icon name
  const [isPickerOpen, setPickerOpen] = useState(false); // state tp control the visibility of the icon picker modal

  // Function to handle icon selection
  const handleIconSelect = (iconName) => {
    setSelectedIcon(iconName); // Updates the selectedIcon state with the chosen iconName
    setPickerOpen(false); // Closes the icon picker modal after selection
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box
        width="100px"
        height="100px"
        borderWidth="1px"
        borderRadius="md"
        display="flex"
        justifyContent="center"
        alignItems="center"
        cursor="pointer"
        onClick={() => setPickerOpen(true)} // Opens the icon picker modal on click
        _hover={{ borderColor: "blue.500" }} // Highlight border on hover
      >
        {/* Conditional rendering based on selectedIcon state */}
        {selectedIcon && featherIcons.icons[selectedIcon] ? (
          // Render the selected icon as an SVG
          <Box
            as="span"
            dangerouslySetInnerHTML={{
              __html: featherIcons.icons[selectedIcon].toSvg({
                width: 72,
                height: 72,
              }),
            }}
          />
        ) : (
          // Render a placeholder message when no icon is selected
          <Box
            textAlign="center"
            fontSize="16px"
            color="gray.500"
            fontWeight="600"
            p={2}
          >
            Click to select icon
          </Box>
        )}
      </Box>
      {/* Render the IconPicker modal if isPickerOpen is true */}
      {isPickerOpen && (
        <IconPicker
          rowsInOnePage={6}
          columnsInOnePage={7}
          iconHeight={32}
          iconWidth={32}
          onIconSelect={handleIconSelect}
        />
      )}
    </Box>
  );
};

export default HomePage;
