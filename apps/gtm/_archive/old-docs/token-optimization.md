To optimize API token usage and control costs when using Firebase with Genkit and Vertex AI, focus on prompt efficiency, model selection, and strategic caching/monitoring. [1, 2]  
Prompt and Output Optimization 

• Be Concise: Craft clear, concise prompts and system instructions, removing unnecessary details or redundancy. Shorter prompts reduce the input token count. 
• Limit Output Length: Explicitly set the  parameter in your model configuration to prevent overly lengthy responses. You can also instruct the model within the prompt (e.g., "Respond in exactly three sentences") to guide brevity. 
• Use Grounding Wisely: When using retrieval-augmented generation (RAG) and grounding, ensure that only the most relevant information is used to augment the prompt. Use techniques like re-ranking or context compression to condense retrieved information before sending it to the LLM. 
• Structured Data: Use structured data formats (like JSON) and specify  and  to get precise outputs, which can be more efficient than free-form text generation. [1, 3, 4, 5, 6]  

Model Selection and Advanced Techniques • Choose the Right Model: Select models based on complexity, performance, and cost. Smaller, specialized models (like ) can handle many tasks efficiently and are often cheaper than larger models (like ). 
• Model Distillation: For very specific, high-volume tasks, consider model distillation techniques within Vertex AI to train smaller, specialized models. These can achieve comparable performance to larger models at a lower cost. 
• Prompt Optimization Service: Leverage the Vertex AI Prompt Optimizer. It is designed to automatically refine prompts for better performance and efficiency, reducing manual trial-and-error. [1, 7, 8, 9, 10]  

Monitoring and Infrastructure • Monitor Usage: Use the Firebase AI monitoring dashboard for token usage, performance, and costs. This helps identify areas with high token consumption. 
• Implement Caching: For common or repetitive queries, implement a caching layer. Reusing a cached response for identical inputs can save tokens by avoiding redundant model calls. 
• Set Quotas and Limits: Configure rate limits and quotas in the Firebase console to prevent abuse and manage per-user consumption. The Firebase AI Logic API has a default rate limit that should be adjusted to fit your app's needs. 
• Use  API: Use the  API before sending a large prompt to the model. This checks the input token count and ensures it stays within limits, helping manage potential costs proactively. 
• Minimize Cold Starts: If running Genkit using Cloud Functions for Firebase, optimize for cold start times, as the function invocation itself has a cost. [2, 8, 11, 12, 13, 14, 15]  

AI responses may include mistakes.

[1] https://caylent.com/blog/reducing-gen-ai-cost-5-strategies
[2] https://www.edenai.co/post/how-to-control-token-usage-and-cut-costs-on-ai-apis
[3] https://firebase.google.com/docs/ai-logic/model-parameters
[4] https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/prompt-best-practices
[5] https://docs.cloud.google.com/vertex-ai/generative-ai/docs/multimodal/content-generation-parameters
[6] https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/prompt-best-practices
[7] https://cloud.google.com/blog/products/ai-machine-learning/your-ultimate-guide-to-the-latest-in-generative-ai-on-vertex-ai
[8] https://www.reddit.com/r/Firebase/comments/1gven5t/difference_between_vertex_ai_in_firebase_and/
[9] https://developers.googleblog.com/en/enhance-your-prompts-with-vertex-ai-prompt-optimizer/
[10] https://blog.qburst.com/2024/11/optimizing-chunk-size-and-balancing-context-with-gpt-models-in-rag-chatbots/
[11] https://firebase.google.com/docs/ai-logic/quotas
[12] https://firebase.google.com/docs/ai-logic/monitoring
[13] https://firebase.google.com/docs/ai-logic/count-tokens
[14] https://firebase.google.com/docs/ai-logic/quotas
[15] https://cloud.google.com/blog/products/ai-machine-learning/your-ultimate-guide-to-the-latest-in-generative-ai-on-vertex-ai

