// components/IconPicker.js
import React, { useState } from "react";
import {
  Box,
  IconButton,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import * as featherIcons from "feather-icons";

const IconPicker = ({
  rowsInOnePage,
  columnsInOnePage,
  iconHeight,
  iconWidth,
  pickerHeight = "500px",
  pickerWidth = "500px",
  onIconSelect,
}) => {
  const iconList = Object.keys(featherIcons.icons); // Extract all icon names from Feather Icons

  const [currentPage, setCurrentPage] = useState(0); // State to track current page of icons

  // Responsive columns and rows based on screen size
  const responsiveColumns = useBreakpointValue({
    base: 5, // 5 columns on screen if screen size is small or extra small
    md: columnsInOnePage,
  });

  const responsiveRows = useBreakpointValue({
    base: 4, // 4 rows on screen if screen size is small or extra small
    md: rowsInOnePage,
  });

  // Calculate icons per page and total pages based on responsive columns and rows
  const responsiveIconsPerPage = responsiveColumns * responsiveRows;
  const totalResponsivePages = Math.ceil(
    iconList.length / responsiveIconsPerPage
  );

  // Function to handle icon click
  const handleIconClick = (icon) => {
    onIconSelect(icon); // Invoke onIconSelect callback with selected icon name
  };

  return (
    <Modal isOpen={true} onClose={() => onIconSelect(null)}>
      <ModalOverlay />
      <ModalContent width={pickerWidth} height={pickerHeight}>
        <ModalHeader>Select an Icon</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid columns={responsiveColumns} spacing={2}>
            {iconList
              .slice(
                currentPage * responsiveIconsPerPage,
                (currentPage + 1) * responsiveIconsPerPage
              )
              .map((iconName) => (
                // IconButton component for each icon
                <IconButton
                  key={iconName}
                  icon={
                    <Box
                      as="span"
                      dangerouslySetInnerHTML={{
                        // Render icon SVG using dangerouslySetInnerHTML for Feather Icons
                        __html: featherIcons.icons[iconName].toSvg({
                          width: iconWidth,
                          height: iconHeight,
                        }),
                      }}
                    />
                  }
                  onClick={() => handleIconClick(iconName)}
                  aria-label={iconName}
                  variant="outline"
                />
              ))}
          </SimpleGrid>
        </ModalBody>
        {/* Navigation buttons for pagination */}
        <HStack justifyContent="center" spacing={4} py={4}>
          {/* Go to previous page */}
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0} // disable button if it is first page
          >
            Previous
          </Button>
          {/* Go to next page */}
          <Button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, totalResponsivePages - 1)
              )
            }
            disabled={currentPage === totalResponsivePages - 1} // disable button if it is last page
          >
            Next
          </Button>
        </HStack>
      </ModalContent>
    </Modal>
  );
};

export default IconPicker;
