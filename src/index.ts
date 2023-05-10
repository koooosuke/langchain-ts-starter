import { AgentExecutor, ChatAgent } from "langchain/agents";
import { ChatOpenAI } from "langchain/chat_models";
import { SerpAPI } from "langchain/tools";

// Define the list of tools the agent can use
const tools = [
  new SerpAPI(process.env.SERPAPI_API_KEY, {
    location: "Austin,Texas,United States",
    hl: "en",
    gl: "us",
  }),
];
// Create the agent from the chat model and the tools
const agent = ChatAgent.fromLLMAndTools(new ChatOpenAI(), tools);
// Create an executor, which calls to the agent until an answer is found
const executor = AgentExecutor.fromAgentAndTools({ agent, tools });

const responseG = await executor.run(
  "How many people live in canada as of 2023?"
);

console.log(responseG);
