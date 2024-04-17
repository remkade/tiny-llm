const MONGODB_URL = "mongodb://ferretdb:27017";
const HF_TOKEN = "INVALID";

class Endpoint {
  url: string;
  type: "llamacpp";

  constructor() {
    this.url = "http://llama:8081";
    this.type = "llamacpp";
  }
}

class ModelParameters {
  temperature?: number;
  top_p?: number;
  repetition_penalty?: number;
  top_k?: number;
  truncate?: number;
  max_new_tokens?: number;
  stop?: string[];

  constructor() {
    this.temperature = 0.5;
    this.top_p = 0.95;
    this.repetition_penalty = 1.2;
    this.top_k = 50;
    this.truncate = 1000;
    this.max_new_tokens = 2048;
    this.stop = ["</s>"];
  }
}

class ModelConfig {
  name: string;
  chatPromptTemplate: string;
  endpoints: Endpoint[];
  parameters: ModelParameters;

  constructor(name: string, chatPromptTemplate: string) {
    this.name = name;
    this.chatPromptTemplate = chatPromptTemplate;
    this.parameters = new ModelParameters();
    this.endpoints = [new Endpoint()];
  }
}

const MODELS: string = JSON.stringify([
  new ModelConfig(
    "llamacpp Mixtral",
    "<s>{{#each messages}}{{#ifUser}}[INST] {{#if @first}}{{#if @root.preprompt}}{{@root.preprompt}}\n{{/if}}{{/if}} {{content}} [/INST]{{/ifUser}}{{#ifAssistant}}{{content}}</s> {{/ifAssistant}}{{/each}}",
  ),
  new ModelConfig(
    "llamacpp tinyllama",
    "<|system|>\n{{preprompt}}</s>\n{{#each messages}}{{#ifUser}}<|user|>\n{{content}}</s>\n<|assistant|>\n{{/ifUser}}{{#ifAssistant}}{{content}}</s>\n{{/ifAssistant}}{{/each}}",
  ),
  new ModelConfig(
    "llamacpp qwen",
    "<|im_start|>system\n{{preprompt}}<|im_end|>\n{{#each messages}}{{#ifUser}}<|im_start|>user\n{{content}}<|im_end|>user\n<|im_end|>\n{{/ifUser}}{{#ifAssistant}}<|im_start|>assistant\n{{content}}<|im_end|>\n{{/ifAssistant}}{{/each}}",
  ),
]);

await Deno.writeTextFile(
  "huggingface-chat.env.local",
  `MODELS='${MODELS}'\nMONGODB_URL="${MONGODB_URL}"\nHF_TOKEN="${HF_TOKEN}"\n`,
);
console.log("🦭 huggingface-chat.env.local file created");
