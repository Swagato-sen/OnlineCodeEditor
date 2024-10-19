import { useRef, useState } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState(CODE_SNIPPETS["javascript"]);  // Initialize with JS snippet
  const [language, setLanguage] = useState("javascript");            // Default language: JavaScript

  // Handle editor mount
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  // Handle language selection from the dropdown
  const onSelect = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setValue(CODE_SNIPPETS[selectedLanguage]);  // Update editor with the new language's code snippet
  };

  return (
    <Box>
      <HStack spacing={4}>
        <Box w="50%">
          {/* Language Selector Component */}
          <LanguageSelector language={language} onSelect={onSelect} />

          {/* Code Editor Component */}
          <Editor
            options={{
              minimap: {
                enabled: false,  // Disable minimap for cleaner UI
              },
            }}
            height="75vh"
            theme="vs-dark"               // Dark theme for editor
            language={language}            // Set the editor's language mode
            defaultValue={CODE_SNIPPETS[language]}  // Default code snippet for selected language
            onMount={onMount}
            value={value}
            onChange={(newValue) => setValue(newValue)}  // Update code as user types
          />
        </Box>

        {/* Output Component to handle code execution */}
        <Output editorRef={editorRef} language={language} />
      </HStack>
    </Box>
  );
};

export default CodeEditor;
