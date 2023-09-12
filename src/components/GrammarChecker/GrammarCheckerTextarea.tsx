import { type FC, type ChangeEvent } from "react";
import HighlightedText from "../HighlightedText";
import { useBoundStore } from "@/zustand/useBoundStore";
import Highlighter from "react-highlight-words";
import ExampleTextButton from "../ExampleTextButton";
import { CorrectionsProps } from "@/interfaces";
import Textarea from "../Textarea";
import isDesktopView from "@/utils/isDesktopView";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface GrammarCheckerTextareaProps {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  setTextToCorrect: (text: string) => void;
}

const getSearchWords = (corrections: CorrectionsProps) => {
  return [
    `\\b(${corrections?.correctionsList
      ?.map((correction) => correction.result[0])
      .join("|")})\\b`,
    "gi",
  ];
};

const EXAMPLE_TEXT =
  "Me and my friend goes to the park last weekend, we plays on the swings, seesaw, and slides, and we have so much fun together.";

const GrammarCheckerTextarea: FC<GrammarCheckerTextareaProps> = ({
  onChange,
  setTextToCorrect,
}) => {
  const { corrections, value } = useBoundStore();
  const router = useRouter();
  const { data } = router.query;
  const setText = data ? data.toString() : "";
  const [textValue, setTextValue] = useState(setText);
  
  useEffect(() => {
    setTextValue(setText);
    setTextToCorrect(setText);
  }, []);

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newTextValue = e.target.value;
    setTextValue(newTextValue);
    onChange(e); // Pass the event up to the parent component if needed
    setTextToCorrect(newTextValue); // Set the text in setTextToCorrect
  };

  return (
    <div className="relative w-full px-5">
      <div
        className="!text-transparent caret-white absolute inset-0 bg-transparent w-full max-h-[250px] md:max-h-[500px] h-max md:h-screen outline-none resize-none p-5 text-base lg:text-lg"
        spellCheck={false}
      >
        <Highlighter
          searchWords={getSearchWords(corrections)}
          autoEscape={false}
          textToHighlight={value}
          highlightTag={HighlightedText}
          caseSensitive={true}
        />
      </div>
      <Textarea
        onChange={handleTextareaChange}
        value={textValue}
        name="text"
        className="relative md:!max-h-[500px] !bg-transparent !p-0 !pt-5 !pl-0"
        autofocus={isDesktopView()}
      />

      {value.length <= 0 && setText.length <= 0 && (
        <ExampleTextButton
          exampleText={EXAMPLE_TEXT}
          additionalSetState={setTextToCorrect}
          className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-500"
        />
      )}
    </div>
  );
};

export default GrammarCheckerTextarea;
