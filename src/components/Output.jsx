import { useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";

const Output = ({ editorRef, language }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);       // Store the output of code execution
  const [isLoading, setIsLoading] = useState(false); // Loading state for when code is running
  const [isError, setIsError] = useState(false);     // Error state to handle stderr

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue(); // Get the code from the editor
    if (!sourceCode) return;  // Prevent running if the editor is empty

    try {
      setIsLoading(true);  // Start loading
      const { run: result } = await executeCode(language, sourceCode);  // Execute the code using the API

      // Handle successful output or error
      if (result.stderr) {
        setIsError(true);
        setOutput(result.stderr.split("\n"));  // If there's an error, show stderr
      } else {
        setIsError(false);
        setOutput(result.output.split("\n"));  // If no error, display the output
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);  // Stop loading after execution
    }
  };

  return (
    <Box w="50%">
      <Text mb={2} fontSize="lg">
        Output
      </Text>

      {/* Run Code Button */}
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>

      {/* Display the output or error */}
      <Box
        height="75vh"
        p={2}
        color={isError ? "red.400" : ""}  // Error text color
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}  // Border color depending on error
      >
        {/* Show output or prompt the user to run the code */}
        {output
          ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : 'Click "Run Code" to see the output here'}
      </Box>
    </Box>
  );
};

export default Output;
