import { MdRecordVoiceOver } from "react-icons/md";
import { BiTask } from "react-icons/bi";
import { TbListDetails } from "react-icons/tb";
import { HiOutlineSparkles } from "react-icons/hi";
import { FiCode } from "react-icons/fi";
import { BsChatSquareQuote } from "react-icons/bs";

export const features = [
  {
    icon: <MdRecordVoiceOver />,
    text: "Voice to Intent",
    description:
      "Speak naturally about your day, plans, or thoughts. The app listens and understands what you really mean.",
  },
  {
    icon: <BiTask />,
    text: "Automatic Task Extraction",
    description:
      "Identifies tasks, reminders, decisions, and questions directly from your spoken input.",
  },
  {
    icon: <TbListDetails />,
    text: "Structured Intent Output",
    description:
      "Converts unstructured speech into clean, organized intent you can act on instantly.",
  },
  {
    icon: <HiOutlineSparkles />,
    text: "Smart Rephrasing",
    description:
      "Refines unclear or rambling speech into precise, meaningful intent without changing context.",
  },
  {
    icon: <FiCode />,
    text: "Developer-Ready JSON",
    description:
      "Outputs intent in a predictable JSON format for easy integration with apps, bots, or workflows.",
  },
  {
    icon: <BsChatSquareQuote />,
    text: "Context-Aware Understanding",
    description:
      "Understands tone, context, and human nuance — not just keywords — for higher accuracy.",
  },
];

export const resourcesLinks = [
  { href: "mailto:gupta.mayank.mg02@gmail.com", text: "Mail" },
  {
    href: "https://www.linkedin.com/in/mayank-gupta-aa1028208",
    text: "LinkedIn",
  },
];
