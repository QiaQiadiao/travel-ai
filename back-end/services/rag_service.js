const fs = require("fs");
const path = require("path");
const { OpenAIEmbeddings } = require("@langchain/openai");
const { MemoryVectorStore } = require("langchain/vectorstores/memory");
const { TextLoader } = require("langchain/document_loaders/fs/text");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");

class RagService {
  constructor() {
    this.vectorStore = null;
    this.embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.DASHSCOPE_API_KEY,
      apiKey: process.env.DASHSCOPE_API_KEY,
      configuration: {
        baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
      },
      modelName: "text-embedding-v1", // DashScope's embedding model
    });
  }

  async init() {
    if (this.vectorStore) return;

    const knowledgeDir = path.join(__dirname, "../knowledge");
    if (!fs.existsSync(knowledgeDir)) {
      fs.mkdirSync(knowledgeDir);
    }

    const files = fs.readdirSync(knowledgeDir);
    let allDocs = [];

    for (const file of files) {
      const filePath = path.join(knowledgeDir, file);
      if (file.endsWith(".md") || file.endsWith(".txt")) {
        const loader = new TextLoader(filePath);
        const docs = await loader.load();
        allDocs.push(...docs);
      }
    }

    if (allDocs.length === 0) {
      console.log("Knowledge base is empty.");
      // Add a dummy doc if empty to avoid vector store error
      allDocs = [
        {
          pageContent: "目前知识库为空，请添加相关旅游攻略文档。",
          metadata: { source: "system" },
        },
      ];
    }

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 50,
    });

    const splitDocs = await textSplitter.splitDocuments(allDocs);
    this.vectorStore = await MemoryVectorStore.fromDocuments(
      splitDocs,
      this.embeddings,
    );
    console.log(`Knowledge base initialized with ${splitDocs.length} chunks.`);
  }

  async search(query, limit = 3) {
    if (!this.vectorStore) {
      await this.init();
    }
    const results = await this.vectorStore.similaritySearch(query, limit);
    return results.map((doc) => doc.pageContent).join("\n---\n");
  }
}

module.exports = new RagService();
