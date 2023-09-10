import GrammarCheckerIcon from "../../public/grammar-checker-icon.svg";
import TextSummarizerIcon from "../../public/text-summarizer-icon.svg";
import PlagiarismCheckerIcon from "../../public/plagiarism-icon.svg";
import vocabularyChecker from "../../public/vocubary-icon.svg";

import upload from "../../public/upload-icon.svg";
const links = [
  {
    name: "Grammar Checker",
    href: "/grammar-checker",
    icon: GrammarCheckerIcon,
    backgroundColor: "bg-pink-1",
    borderColor: "!border-b-pink-1",
  },
  {
    name: "Plagiarism",
    href: "/plagiarism-checker",
    icon: PlagiarismCheckerIcon,
    backgroundColor: "bg-pink-1",
    borderColor: "!border-b-pink-1",
  },
  {
    name: "Text Summarizer",
    href: "/text-summarizer",
    icon: TextSummarizerIcon,
    backgroundColor: "bg-green-500",
    borderColor: "!border-b-green-500",
  },
  {
    name: "Vocabulary",
    href: "/vocabulary-checker",
    icon: vocabularyChecker,
    backgroundColor: "bg-green-500",
    borderColor: "!border-b-green-500",
  },
  {
    name: "File Upload",
    href: "/pdf-upload",
    icon: upload,
    backgroundColor: "bg-green-500",
    borderColor: "!border-b-green-500",
  },
];

export default links;
