import { OpenAI } from "langchain";
import { SerpAPI, Calculator } from "langchain/tools";
import { initializeAgentExecutor } from "langchain/agents";

const model = new OpenAI({ temperature: 0 });
const tools = [
  new SerpAPI(process.env.SERPAPI_API_KEY, {
    location: "Tokyo,Japan",
    hl: "ja",
    gl: "jp",
  }),
  new Calculator(),
];

const executor = await initializeAgentExecutor(
  tools,
  model,
  "zero-shot-react-description"
);

console.log("Loaded agent.");

const input = "みそきんとは...??";
console.log(`Executing with input "${input}"...`);

const result = await executor.call({ input });

console.log(`Got output ${result.output}`);
