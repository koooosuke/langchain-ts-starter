import { ChatOpenAI } from "langchain/chat_models";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import {
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  ChatPromptTemplate,
} from "langchain/prompts";

const chat = new ChatOpenAI({ temperature: 0 });

const response = await chat.call([
  new HumanChatMessage(
    "Translate this sentence from English to French. I love programming."
  ),
]);

console.log(response);

const responseB = await chat.call([
  new SystemChatMessage(
    "You are a helpful assistant that translates English to French."
  ),
  new HumanChatMessage("Translate: I love programming."),
]);

console.log(responseB);

const responseC = await chat.generate([
  [
    new SystemChatMessage(
      "You are a helpful assistant that translates English to French."
    ),
    new HumanChatMessage(
      "Translate this sentence from English to French. I love programming."
    ),
  ],
  [
    new SystemChatMessage(
      "You are a helpful assistant that translates English to French."
    ),
    new HumanChatMessage(
      "Translate this sentence from English to French. I love artificial intelligence."
    ),
  ],
]);

console.log(responseC);

const translationPrompt = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate(
    "You are a helpful assistant that translates {input_language} to {output_language}."
  ),
  HumanMessagePromptTemplate.fromTemplate("{text}"),
]);

const responseA = await chat.generatePrompt([
  await translationPrompt.formatPromptValue({
    input_language: "English",
    output_language: "French",
    text: "I love programming.",
  }),
]);

console.log(responseA);
